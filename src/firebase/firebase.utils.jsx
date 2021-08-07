import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import history from "../util/history";
import { configFirestore } from "../keys";

export const createUserProfileDocument = async (userAuth, additionData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();
  // console.log("snap from create snapshot", snapshot);

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  // console.log("userRef from create", userRef);

  return userRef;
};

firebase.initializeApp(configFirestore);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signWithGoogle = () =>
  auth.signInWithPopup(provider).then(() => history.push("/"));

export default firebase;
