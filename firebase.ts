// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDZVGtngYWcZtAtLFBUsnL0z80WbgeDI_k',
  authDomain: 'react-sns-6cf8d.firebaseapp.com',
  projectId: 'react-sns-6cf8d',
  storageBucket: 'react-sns-6cf8d.appspot.com',
  messagingSenderId: '435069296956',
  appId: '1:435069296956:web:222c9782a345610e747e39',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
