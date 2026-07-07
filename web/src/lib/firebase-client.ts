import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_G39HkHUoM86WSGZGLQ63KNvswIr57Ak",
  authDomain: "viora-web.firebaseapp.com",
  projectId: "viora-web",
  storageBucket: "viora-web.firebasestorage.app",
  messagingSenderId: "430816477253",
  appId: "1:430816477253:web:be80640082321e9343a32c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function submitLead(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}) {
  await addDoc(collection(db, "leads"), {
    name: data.name,
    company: data.company ?? "",
    email: data.email,
    phone: data.phone ?? "",
    projectType: data.projectType,
    message: data.message,
    status: "pending",
    submittedAt: Timestamp.now(),
  });
}
