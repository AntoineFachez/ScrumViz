import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { getVertexAI, getGenerativeModel } from 'firebase/vertexai-preview';
import { firebaseConfig } from '../app/api/apiConfig';

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const auth = getAuth(app);
const storage = getStorage(app);

const vertexAI = getVertexAI(app);
const model = getGenerativeModel(vertexAI, {
  model: 'gemini-1.5-flash-preview-0514',
});

export { app, db, functions, httpsCallable, auth, storage, vertexAI, model };
