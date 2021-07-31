import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  Button,
  Container,
  Divider,
  Label,
  List,
  Message,
} from "semantic-ui-react";
import { fetchAllBookingsForAdmin, FetchOrders } from "../../firebase";
import { getActiveOrdersForAdmin } from "../../redux/reducers/orderReducer/order.selector";
import { orderActionTypes } from "../../redux/reducers/orderReducer/orderActionTypes";
import { getCurrentUser } from "../../redux/reducers/userReducer/user.selector";

import "./OrdersPage.style.css";

const OrdersPage = (props) => {
  const orders = useSelector(getActiveOrdersForAdmin);
  const ArrayOrders = Array.from(orders);
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const isAdmin = false;

  useEffect(() => {
    // fetchAllBookingsForAdmin().then((activeOrders) => {
    //   dispatch({
    //     type: orderActionTypes.GET_ALL_ACTIVE_ORDERS_FOR_ADMIN,
    //     payload: activeOrders,
    //   });
    FetchOrders(currentUser, isAdmin).then((activeOrders) => {
      dispatch({
        type: orderActionTypes.GET_ALL_ACTIVE_ORDERS_FOR_ADMIN,
        payload: activeOrders,
      });
    });
    return () => {
      dispatch({ type: orderActionTypes.CLEAR_ORDERS });
    };
  }, [dispatch]);

  const carsToBeReturnedPanel = () => {
    console.log("array iorder", orders);
    return (
      <div>
        {ArrayOrders &&
          ArrayOrders.map((order) => (
            <div key={order.id}>
              <Divider />
              Order reference <Label color="teal">{order.id}</Label> - Return
              date{" "}
              <Label color="olive">
                {new Date(
                  order.orderItem.dateReturn.seconds * 1000
                ).toDateString()}
              </Label>
              <Button
                color="purple"
                content="Return this car"
                size="mini"
                floated="right"
              />
            </div>
          ))}
      </div>
    );
  };

  // const carsToBeReturnedPanel2 = () => {
  //   return (
  //     <div>
  //       {ArrayOrders &&
  //         ArrayOrders.map((order) => (
  //           <div key={order.id}>
  //             <Divider />
  //             Order reference <Label color="teal">{order.id}</Label> - Return
  //             date{" "}
  //             <Label color="olive">
  //               {new Date(
  //                 order.orderItem.dateReturn.seconds * 1000
  //               ).toDateString()}
  //             </Label>
  //             <Button
  //               color="purple"
  //               content="Return this car"
  //               size="mini"
  //               floated="right"
  //             />
  //           </div>
  //         ))}
  //     </div>
  //   );
  // };

  const ActiveOrderContent = (
    <div>
      Cars that still need to be returned.
      <Accordion.Accordion as={carsToBeReturnedPanel} />
    </div>
  );

  // const level2Panels = [
  //   { key: "panel-2a", title: "Level 2A", content: "Order completed" },
  //   { key: "panel-2b", title: "Level 2B", content: "Order ompleted" },
  // ];

  const panel4 = ArrayOrders.map((order) => {
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
            // content={`${order.orderItem.car.carModel} - ${order.orderItem.car.carMaker}.
            //         Rented for ${order.orderItem.days} days. Total of USD: $${order.orderItem.total}`}
          />
        ),
      },
    };
  });

  const Level2Content = (
    <div>
      Orders history
      <Accordion.Accordion panels={panel4} />
    </div>
  );

  // const Level2Content1 = () => (
  //   <div>
  //     Orders history
  //     <Accordion.Accordion panels={panel4} />
  //   </div>
  // );

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
      content: { content: ActiveOrderContent },
    },
    {
      key: "panel-2",
      title: "Orders completed (Cars returned)",
      content: { content: Level2Content },
    },
  ];

  return (
    <Container>
      <Accordion fluid defaultActiveIndex={0} panels={rootPanels} styled />
    </Container>
  );
};

export default OrdersPage;
