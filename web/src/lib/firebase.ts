import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, "base64").toString(),
    );
    initializeApp({ credential: cert(serviceAccount) });
  } else {
    initializeApp();
  }
}

export const db = getFirestore();
