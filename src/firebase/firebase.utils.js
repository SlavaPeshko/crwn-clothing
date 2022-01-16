import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
  apiKey: 'AIzaSyCO0f_v99ssIHF7nnz9_KWrtRXSEgBpv_Q',
  authDomain: 'crwn-db-2e83c.firebaseapp.com',
  projectId: 'crwn-db-2e83c',
  storageBucket: 'crwn-db-2e83c.appspot.com',
  messagingSenderId: '311609677836',
  appId: '1:311609677836:web:d967815071ce5e68c27629',
  measurementId: 'G-5H2KQ8MSSG',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
