# Staff login and shared events: one-time setup

The website now saves events in Firebase, so every visitor sees the same events,
and only signed-in school staff can add, edit or delete them. There are no
passwords stored in the website code.

You do this once, in the Firebase console (https://console.firebase.google.com).

## 1. Connect the website to Firebase

Add these six values in Vercel (Project, Settings, Environment Variables) and then
redeploy. You get the values from Firebase: Project Settings, General, Your apps, Web app.

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## 2. Turn on the three Firebase services

1. **Authentication**: Build, Authentication, Get started, enable **Email/Password**.
   Then Settings, User actions, and turn **off** "Enable create (sign-up)" so nobody
   can register themselves.
2. **Firestore Database**: Build, Firestore Database, Create database (production mode).
3. **Storage**: Build, Storage, Get started.

## 3. Publish the security rules

These rules are what actually protect the data. They are in this repository.

- Firestore: open Firestore Database, Rules tab, paste the contents of `firestore.rules`, Publish.
- Storage: open Storage, Rules tab, paste the contents of `storage.rules`, Publish.

## 4. Add each staff member (two steps per person)

1. Authentication, Users, **Add user**: enter their email and a password.
   Copy the **User UID** shown for that user.
2. Firestore Database, **Start collection** (first time) or open `staff`:
   add a document whose **Document ID is that User UID**, with the text fields
   `name` (for example "Mrs. Lakshmi") and `role` (for example "Science Teacher").

Only people with a `staff/{UID}` document can edit anything. Having an account alone is not enough.

To remove someone's access, delete their `staff/{UID}` document (and their user).

## 5. First sign-in

Open the website, click "Staff Login / Edit Events" and sign in. The first time any staff
member signs in, the starter events are copied into Firestore so everyone sees them.
After that, edits made by staff appear for every visitor.

## Notes

- Event photos uploaded by staff go to Firebase Storage (images only, under 10 MB).
- Until step 1 is done, staff sign-in shows "not set up yet" and the site shows the starter events.
- The "Staff: Edit Photo" feature on the home page campus simulator still saves in the
  browser only; it is not shared yet.
