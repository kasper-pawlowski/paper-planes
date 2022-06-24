import { initializeApp } from 'firebase/app';
import 'firebase/storage';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    projectId: 'kasper-pawlowski-paper-planes',
    appId: '1:910896735187:web:33e57573686b1bfe98c526',
    storageBucket: 'kasper-pawlowski-paper-planes.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyDNoStWHTdWuoEqghgaRyayh7b3gmhmJWM',
    authDomain: 'kasper-pawlowski-paper-planes.firebaseapp.com',
    messagingSenderId: '910896735187',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
