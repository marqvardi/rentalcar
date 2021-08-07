import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Accordion,
  Button,
  Confirm,
  Container,
  Icon,
  Label,
  List,
  Message,
} from "semantic-ui-react";
import {
  FetchOrders,
  ReturningCar,
} from "../../firebase/bookingsDataAccess/bookingsDataAccess";
import {
  getActiveOrdersForAdmin,
  getCompletedOrdersForAdmin,
} from "../../redux/reducers/orderReducer/order.selector";
import { orderActionTypes } from "../../redux/reducers/orderReducer/orderActionTypes";
import { getCurrentUser } from "../../redux/reducers/userReducer/user.selector";
import OrdersDetails from "./orderDetails/orderDetails";
import PanelCompletedOrders from "./orderDetails/panelCompletedOrder";
import "./OrdersPage.style.css";

const OrdersPage = (props) => {
  const activeOrders = useSelector(getActiveOrdersForAdmin);
  const ArrayActiveOrders = Array.from(activeOrders);
  const completedOrders = useSelector(getCompletedOrdersForAdmin);
  const ArrayCompletedOrders = Array.from(completedOrders);
  const currentUser = useSelector(getCurrentUser);
  const isAdmin = false;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchOrders(currentUser, isAdmin));
    return () => {
      dispatch({ type: orderActionTypes.CLEAR_ORDERS });
    };
  }, [dispatch, currentUser, isAdmin]);

  const handleConfirm = (orderId, carId) => {
    console.log("wdadawd");
    console.log("Car ID", carId);
    console.log("Order ID", orderId);
    dispatch(ReturningCar(orderId, carId));

    toast.success("Car successfully returned");
  };

  const panel4ActiveOrders = ArrayActiveOrders.map((order) => {
    return {
      key: order.id,
      title: {
        content: (
          <Label
            color="green"
            content={`${
              order.orderItem.car.carModel
            } needs to be returned on ${new Date(
              order.orderItem.dateReturn.seconds * 1000
            ).toDateString()}`}
          />
        ),
      },
      content: {
        content: (
          <Message
            info
            header={`Order reference - ${order.id}`}
            content={() => (
              <OrdersDetails
                {...order.orderItem}
                orderId={order.id}
                onClick={handleConfirm}
                active={order.active}
                key={order.id}
              />
            )}
          />
        ),
      },
    };
  });

  const panel4CompletedOrders = ArrayCompletedOrders.map((order) => {
    console.log("checking order active for orderdetais", order);
    return {
      key: order.id,
      title: {
        content: (
          <Label
            color="blue"
            content={`${order.orderItem.car.carModel} returned on ${new Date(
              order.orderItem.dateReturn.seconds * 1000
            ).toDateString()}`}
          />
        ),
      },
      content: {
        content: (
          <Message
            info
            header={`Order reference - ${order.id}`}
            content={() => (
              <OrdersDetails
                key={order.id}
                {...order.orderItem}
                active={order.active}
              />
            )}
          />
        ),
      },
    };
  });

  const ContentForActiveOrders = (
    <div>
      Active orders
      <Accordion.Accordion panels={panel4ActiveOrders} />
    </div>
  );

  const ContentForCompletedOrders = (
    <div>
      {ArrayCompletedOrders.length <= 0 ? (
        <Message
          warning
          header="No orders"
          content="Orders history will be shown here."
        />
      ) : (
        <div>
          "Orders history"
          <Accordion.Accordion panels={panel4CompletedOrders} />
        </div>
      )}
    </div>
  );

  // const OrdersDetails = ({ days, dateReturn, datePickUp, total }) => (
  //   <div>
  //     <List>
  //       <List.Item>
  //         <List.Icon name="car" />
  //         <List.Content>
  //           Car picked up on{" "}
  //           {new Date(datePickUp.seconds * 1000).toDateString()}
  //         </List.Content>
  //       </List.Item>
  //       <List.Item>
  //         <List.Icon name="car" />
  //         <List.Content>
  //           Car returned on {new Date(dateReturn.seconds * 1000).toDateString()}
  //         </List.Content>
  //       </List.Item>
  //       <List.Item>
  //         <List.Icon name="calendar alternate outline" />
  //         <List.Content>Number of days: {days}</List.Content>
  //       </List.Item>
  //       <List.Item>
  //         <List.Icon name="dollar sign" />
  //         <List.Content>{total}</List.Content>
  //         <Button color="orange" floated="right">
  //           Return car
  //         </Button>
  //       </List.Item>
  //     </List>
  //   </div>
  // );

  const rootPanels = [
    {
      key: "panel-1",
      title: "Active orders (Cars to return)",
      content: { content: ContentForActiveOrders },
    },
    {
      key: "panel-2",
      title: "Orders completed (Cars returned)",
      content: { content: ContentForCompletedOrders },
    },
  ];

  return (
    <Container>
      <Accordion fluid defaultActiveIndex={0} panels={rootPanels} styled />
    </Container>
  );
};

export default OrdersPage;
