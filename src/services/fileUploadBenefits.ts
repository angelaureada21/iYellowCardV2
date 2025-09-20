import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface BenefitInput {
  title: string;
  content: string;
  attachment?: string | null;
}

export const createBenefitPost = async (data: BenefitInput) => {
  await addDoc(collection(db, 'benefits'), {
    title: data.title,
    content: data.content,
    category: 'Benefits',
    attachment: data.attachment || null,
    createdAt: serverTimestamp(),
  });
};
