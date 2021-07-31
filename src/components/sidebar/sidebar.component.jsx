import React from "react";
import { Link } from "react-router-dom";
import { Icon, Menu, Sidebar } from "semantic-ui-react";

import "./sidebar.style.css";

const SidebarComponent = () => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible
      width="thin"
      className="main"
    >
      <Menu.Item as={Link} name="home" to="/">
        <Icon name="home" />
        Home
      </Menu.Item>

      <Menu.Item as={Link} name="Orders" to="/Orders">
        <Icon name="clipboard list" />
        My orders
      </Menu.Item>
      <Menu.Item>
        <Icon name="camera" />
        Channels
      </Menu.Item>
    </Sidebar>
  );
};

export default SidebarComponent;
