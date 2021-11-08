import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBhnQqvM2maHTb3wrdmlpSTh0dDs6hBjjo",
    authDomain: "instagram-native-8af9a.firebaseapp.com",
    projectId: "instagram-native-8af9a",
    storageBucket: "instagram-native-8af9a.appspot.com",
    messagingSenderId: "248816134399",
    appId: "1:248816134399:web:036a8f141e80b218e644ca"
};
 app.initializeApp(firebaseConfig)
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();