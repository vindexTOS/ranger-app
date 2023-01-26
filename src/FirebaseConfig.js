// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCLdxuhJBKWO4cnt5QdTHEKvK82PyqoMI0',
  authDomain: 'ranger-user.firebaseapp.com',
  projectId: 'ranger-user',
  storageBucket: 'ranger-user.appspot.com',
  messagingSenderId: '395085212656',
  appId: '1:395085212656:web:fdacd5116d029eedf8cb35',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
