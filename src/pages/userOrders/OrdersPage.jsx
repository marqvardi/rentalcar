import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Container, Label, List, Message } from "semantic-ui-react";
import { FetchOrders } from "../../firebase/bookings/bookingsDataAccess";
import {
  getActiveOrdersForAdmin,
  getCompletedOrdersForAdmin,
} from "../../redux/reducers/orderReducer/order.selector";
import { orderActionTypes } from "../../redux/reducers/orderReducer/orderActionTypes";
import { getCurrentUser } from "../../redux/reducers/userReducer/user.selector";
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

  const panel4ActiveOrders = ArrayActiveOrders.map((order) => {
    // if (_.isEmpty(order)) {
    //   return {
    //     key: order.id,
    //     title: {
    //       content: "No Active orders",
    //     },
    //     content: {
    //       content: () => <Label color="purple" content="No content" />,
    //     },
    //   };
    // }
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
            content={() => <OrdersDetails {...order.orderItem} />}
          />
        ),
      },
    };
  });

  const panel4CompletedOrders = ArrayCompletedOrders.map((order) => {
    // if (_.isEmpty(order)) {
    //   return {
    //     key: order.id,
    //     title: {
    //       content: "No orders history",
    //     },
    //     content: {
    //       content: () => <Label color="purple" content="No content" />,
    //     },
    //   };
    // }
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
            content={() => <OrdersDetails {...order.orderItem} />}
          />
        ),
      },
    };
  });

  //  const ActiveOrderContent = (
  //    <div>
  //      Cars that still need to be returned.
  //      <Accordion.Accordion as={panel4ActiveOrders} />
  //    </div>
  //  );

  const ContentForActiveOrders = (
    <div>
      Active orders
      <Accordion.Accordion panels={panel4ActiveOrders} />
    </div>
  );

  const ContentForCompletedOrders = (
    <div>
      Completed orders history
      <Accordion.Accordion panels={panel4CompletedOrders} />
    </div>
  );

  const OrdersDetails = ({ days, dateReturn, datePickUp, total }) => (
    <div>
      <List>
        <List.Item>
          <List.Icon name="car" />
          <List.Content>
            Car picked up on{" "}
            {new Date(datePickUp.seconds * 1000).toDateString()}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="car" />
          <List.Content>
            Car returned on {new Date(dateReturn.seconds * 1000).toDateString()}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="calendar alternate outline" />
          <List.Content>Number of days: {days}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="dollar sign" />
          <List.Content>{total}</List.Content>
        </List.Item>
      </List>
    </div>
  );

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
