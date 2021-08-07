import { orderActionTypes } from "../../redux/reducers/orderReducer/orderActionTypes";
import { firestore } from "../firebase.utils";

export const ReturningCar = (orderId, carId) => async (dispatch) => {
  await returnCar(orderId, carId);

  console.log("returning");
};

export const FetchOrders = (currentUser, isAdmin) => async (dispatch) => {
  const response = await getAllOrderFromFirestore();

  if (currentUser !== null && isAdmin) {
    const activeOrder = response.filter((order) => order.active === true);
    const completedOrder = response.filter((order) => order.active === false);

    dispatch({
      type: orderActionTypes.GET_ALL_ACTIVE_ORDERS_FOR_ADMIN,
      payload: activeOrder,
    });
    dispatch({
      type: orderActionTypes.GET_ALL_COMPLETED_ORDERS_FOR_ADMIN,
      payload: completedOrder,
    });
  } else if (currentUser !== null && !isAdmin) {
    const activeOrder = response.filter(
      (booking) => currentUser.id === booking.auth.id && booking.active === true
    );

    const completedOrder = response.filter(
      (booking) =>
        currentUser.id === booking.auth.id && booking.active === false
    );

    dispatch({
      type: orderActionTypes.GET_ALL_ACTIVE_ORDERS_FOR_USER,
      payload: activeOrder,
    });

    dispatch({
      type: orderActionTypes.GET_ALL_COMPLETED_ORDERS_FOR_USER,
      payload: completedOrder,
    });
  }
};

const getAllOrderFromFirestore = async () => {
  const allOrders = [];
  await firestore
    .collection("bookings/")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let id = doc.id;
        allOrders.push({ id, ...doc.data() });
      });
      return allOrders;
    });
  return allOrders;
};

const returnCar = async (orderId, carId) => {
  await firestore.collection("bookings").doc(orderId).update({
    active: false,
  });

  await firestore.collection("cars").doc(carId).update({
    available: true,
  });
};
