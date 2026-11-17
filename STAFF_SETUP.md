# Staff login and shared events: one-time setup

The website saves events in Firebase, so every visitor sees the same events, and only
signed-in school staff can add, edit or delete them. There are no passwords in the website code.

## This Firebase project may be shared with another app

The website only uses its own names, so it never touches another app's data:

- Firestore collections: `websiteEvents` and `websiteStaff`
- Storage folder: `website-events/`

Do not change the Authentication sign-in settings if another app uses the same project.
Website staff are protected by the `websiteStaff` list, not by the sign-in settings.

## 1. Connect the website to Firebase

Add these six values in Vercel (Project, Settings, Environment Variables), then redeploy.
You get them from Firebase: Project Settings, General, Your apps, Web app.

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## 2. Services

Make sure Authentication (Email/Password), Firestore and Storage are turned on.
If the project is only for this website, you may also turn off "Enable create (sign-up)"
under Authentication, Settings, User actions.

## 3. Add the school rules (do not replace existing rules)

If the project already has rules from another app, ADD the website rules; do not delete anything.

- Firestore: open Firestore Database, Rules. Paste the block between the two comment lines
  in `firestore.rules` (from `function isSchoolStaff()` to the end of the `websiteStaff` rule)
  just before the final two closing braces, then Publish.
- Storage: open Storage, Rules, and add the `isSchoolStaff()` function and the
  `website-events` rule from `storage.rules` in the same way, then Publish.

If the project is only for this website, you can paste the whole file instead.

## 4. Add each website staff member (two steps per person)

1. Authentication, Users, **Add user** (or use an existing user): note the **User UID**.
2. Firestore Database, collection `websiteStaff`, add a document whose **Document ID is that User UID**
   with the text fields `name` (for example "Mrs. Lakshmi") and `role`.

Only people with a `websiteStaff/{UID}` document can edit anything. An account alone is not enough.
To remove access, delete that document.

## 5. First sign-in

Open the website, click "Staff Login", and sign in. The first time any website staff member
signs in, the starter events are copied into `websiteEvents`. After that, staff edits appear for everyone.

## Notes

- Event photos uploaded by staff go to Firebase Storage (images only, under 10 MB).
- Until step 1 is done, staff sign-in says "not set up yet" and the site shows the starter events.

## Posting events: limits

| Item | Minimum | Maximum |
|---|---|---|
| Event title | 3 characters | 120 characters |
| Writeup | 20 characters | 5000 characters |
| Photo file size | 10 KB | 10 MB each |
| Photos per event | 1 (a cover photo) | 20 in the album |
| Photo type | JPG, PNG or WebP | |

Videos are not uploaded to the website. Put the video on the school's YouTube channel and
paste its link in the "YouTube video link" box; it plays on the event page.
