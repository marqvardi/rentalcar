import { Menu, Container } from "semantic-ui-react";

const FooterComponent = () => {
  return (
    <div>
      <Menu fixed="bottom" inverted color="brown">
        <Container>
          <Menu.Item as="a" header>
            Contact
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default FooterComponent;
