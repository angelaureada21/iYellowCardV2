// src/services/fileUploadService.ts

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

export const uploadAttachment = async (file: File): Promise<string> => {
  const uniqueFileName = `attachments/${uuidv4()}_${file.name}`;
  const fileRef = ref(storage, uniqueFileName);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
