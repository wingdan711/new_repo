import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAsdQRa6OmybFyHOa_oPPaBxIUeZTPfwKk",
    authDomain: "crwn-db-twc.firebaseapp.com",
    projectId: "crwn-db-twc",
    storageBucket: "crwn-db-twc.appspot.com",
    messagingSenderId: "730342314065",
    appId: "1:730342314065:web:a6f4807ee192e87215a870",
    measurementId: "G-MP8SN96JPT"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth)
    {
        return;
    }
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;