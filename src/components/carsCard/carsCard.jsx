import React from "react";
import "./carsCard.styles.css";
import { Card, Icon, Image } from "semantic-ui-react";

const CarsCard = ({ car }) => {
  const { carMaker, carModel, year, price } = car;

  return (
    // <Link to={`/rentCar/${id}`}>
    <Card>
      <Image src={"https://www.carimagery.com/img/v2/12780.jpg"} />
      <Card.Content>
        <Card.Header>{carModel}</Card.Header>
        <Card.Meta>{carMaker}</Card.Meta>
        <Card.Description>
          luctus et ultrices posuere cubilia curae donec pharetra magna
          vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet
          lobortis sapien sapien non mi integer ac neque duis bibendum morbi non
          quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis
          ac nibh fusce lacus purus aliquet at feugiat
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <div className="dollarPrice">
          <span>
            <Icon name="calendar times" bordered color="blue" />
            {year}
          </span>

          <span>
            <Icon name="dollar sign" bordered color="green" />
            {price} per day
          </span>
        </div>
      </Card.Content>
    </Card>
    // </Link>
  );
};

export default CarsCard;
