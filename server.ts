import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily or safely
  const getAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Nagarjuna School AI Admissions & Info Assistant Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = getAI();
      if (!ai) {
        // Fallback response if API Key is not set yet
        return res.json({
          reply: "Welcome to Nagarjuna School! Admissions for the upcoming academic year are currently open for Pre-Primary to Class XII. Our school offers CBSE & International curricula with state-of-the-art Robotics & AI Labs, Digital Smart Classrooms, and Sports complexes. How else can I assist you today?",
        });
      }

      const systemInstruction = `You are Nagarjuna AI, the official AI Admissions Counselor & School Assistant for Nagarjuna School - a world-class CBSE & International institution known for "Empowering Young Minds for a Brighter Tomorrow."

Key Info about Nagarjuna School:
- Location: Nagarjuna School Campus, Educational Enclave, Cyber Valley, India
- Curricula: CBSE & International Baccalaureate (IB) aligned for Nursery to XII Grade.
- Unique Highlights: State-of-the-Art Robotics & AI Labs (Arduino, LEGO Mindstorms, Raspberry Pi, Python/AI tools), High-Tech Computer Labs, 100% Smart Classrooms with 4K Interactive Displays, World-Class Science Laboratories (Physics, Chemistry, Biology), Olympic-grade Sports Complex (Football, Basketball, Cricket, Athletics, Yoga), Luxury Digital Library with 25,000+ volumes, Creative & Performing Arts Center (Music, Dance, Fine Arts).
- Admissions Process: 1. Online Enquiry / Registration -> 2. Campus Interaction Visit -> 3. Student Profile Assessment -> 4. Document Submission & Counseling -> 5. Final Seat Confirmation.
- Transport: GPS-tracked AC buses with live parent app tracking, speed governors, female attendants, and CCTV safety cameras.
- Safety & Care: 24/7 CCTV surveillance, biometric security gate access, full-time infirmary with resident doctor/nurse, anti-bullying cell.
- Annual Fee Range: Pre-Primary (₹75,000 - ₹90,000/yr), Primary (Class 1-5: ₹1,10,000/yr), Secondary (Class 6-10: ₹1,35,000/yr), Senior Secondary (Class 11-12 STEM/Humanities/Commerce: ₹1,60,000/yr). Flexible installment options available.
- Contact: Phone: +91 98765 43210 / 080-2800-9000, Email: admissions@nagarjunaschool.edu.in, Working Hours: Mon-Sat 8:00 AM - 4:30 PM.

Instructions:
Be polite, highly encouraging, warm, professional, concise, and structured. Highlight Nagarjuna School's focus on academic excellence, robotics/AI technology, safety, and child-centric growth. Use clear markdown formatting with bullet points when helpful.`;

      // Build context from history if available
      const chat = ai.chats.create({
        model: "gemini-3.6-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      // If user passed past history, send messages sequentially or send prompt
      let response = await chat.sendMessage({ message });

      return res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      return res.status(500).json({
        reply: "Thank you for reaching out to Nagarjuna School. Admissions for the current and upcoming academic sessions are open! You can also fill out the online enquiry form on our page or call our admissions hotline at +91 98765 43210.",
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", school: "Nagarjuna School" });
  });

  // Vite development middleware vs Static Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nagarjuna School server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
