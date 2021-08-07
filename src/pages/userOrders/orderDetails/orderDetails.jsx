import React from "react";
import { Button, List } from "semantic-ui-react";

const OrdersDetails = ({
  car,
  days,
  dateReturn,
  datePickUp,
  total,
  onClick,
  orderId,
  active,
}) => {
  return (
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
          {active ? (
            <Button
              color="orange"
              floated="right"
              onClick={() => onClick(orderId, car.id)}
            >
              Return car
            </Button>
          ) : (
            ""
          )}
        </List.Item>
      </List>
    </div>
  );
};

export default OrdersDetails;
