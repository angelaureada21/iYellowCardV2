import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface PostInput {
  title: string;
  content: string;
  category: string;
  attachment?: string | null;
}

export const createPost = async (data: PostInput) => {
  await addDoc(collection(db, 'posts'), {
    title: data.title,
    content: data.content,
    category: data.category,
    attachment: data.attachment || null,
    timestamp: serverTimestamp()
  });
};
