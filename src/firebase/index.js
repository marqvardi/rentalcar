import { firestore } from "./firebase.utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../redux/reducers/userReducer/user.selector";

export const fetchCars = async () => {
  const response = await firestore
    .collection("cars")
    .get()
    .then((snapshot) => {
      const all = [];
      snapshot.forEach((doc) => {
        let id = doc.id;
        all.push({ id, ...doc.data() });
        // all.push(doc.id, " => ", doc.data());
      });
      // console.log("all", all);
      return all;
    });
  // console.log("response", response);
  return response;
};

export const fetchCar = async (id) => {
  //   const data = await firestore.collection("cars").doc("ZajYVWjBJmwf3aPZB3hQ");
  const data = await firestore.collection("cars").doc(id);

  //Thats for a single document
  const singleDoc = data
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        return { id, ...doc.data() };
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  return singleDoc;
};

//Get all bookings

export const FetchOrders = async (currentUser, isAdmin) => {
  // const currentUser = useSelector(getCurrentUser);
  // console.log(currentUser);
  if (currentUser !== null && isAdmin) {
    const response = await firestore
      .collection("bookings")
      .get()
      .then((querySnapshot) => {
        const all = [];
        querySnapshot.forEach((doc) => {
          let id = doc.id;
          all.push({ id, ...doc.data() });
        });
        // console.log(all);
        // need to filter here later based on current.id + isAdmin === true
        return all;
      });
    return response;
  } else if (currentUser !== null && !isAdmin) {
    const all = [];
    await firestore
      .collection("bookings/")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let id = doc.id;
          all.push({ id, ...doc.data() });
        });
        // console.log(all);
      });
    return all.filter((booking) => currentUser.id === booking.auth.id);
  }
  return null;
};

export const fetchAllBookingsForAdmin = async () => {
  const response = await firestore
    .collection("bookings")
    .get()
    .then((querySnapshot) => {
      const all = [];
      querySnapshot.forEach((doc) => {
        let id = doc.id;
        all.push({ id, ...doc.data() });
      });
      // console.log(all);
      return all;
    });
  return response;
};

export const FetchAllBookingsForUser = async (authId) => {
  const all = [];
  await firestore
    .collection("bookings/")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let id = doc.id;
        all.push({ id, ...doc.data() });
      });
      // console.log(all);
    });
  return all.filter((booking) => authId === booking.auth.id);
};

// Creating bookings
export const createBooking = async (
  auth,
  { car, days, dateReturn, datePickUp, timeForPickUp }
) => {
  // console.log("bookingDetailsfrom index util", car);

  firestore
    .collection("bookings")
    .add({
      auth,
      active: true,
      orderItem: {
        total: days * car.price,
        datePickUp,
        dateReturn,
        timeForPickUp,
        days,
        car: car,
        carReturned: false,
      },
    })
    .then(() => {
      toast.success("Thanks, payment successful");
      // console.log("DocRef created with ID", docrRef.id);
    })
    .catch((error) => {
      console.log("Error creating booking", error);
    });
};

/// Users
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  const { displayName, password } = additionalData;

  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();
    console.log("userAuth", userAuth);

    try {
      await userRef.set({
        displayName,
        password,
        email,
        createdAt,
        photoURL: "",
        isAdmin: true,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};
