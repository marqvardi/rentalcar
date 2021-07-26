import { Menu, Container, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { useSelector } from "react-redux";
import "./header.styles.css";
import history from "../../util/history";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../redux/reducers/userReducer/user.selector";

const HeaderComponent = () => {
  const currentUser = useSelector(getCurrentUser);

  const handleSignOut = () => {
    auth.signOut();
    history.push("/");
    toast.info("Logging out, being redirected", {
      position: "bottom-right",
    });
  };

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Link to="/">
            <Menu.Item header position="left">
              Home
            </Menu.Item>
          </Link>
          {currentUser ? (
            <Menu.Item header position="right" onClick={() => handleSignOut()}>
              Logged as
              {currentUser.photoURL ? (
                <Image
                  size="mini"
                  className="photo"
                  circular
                  src={currentUser.photoURL}
                  alt={currentUser.displayName}
                />
              ) : (
                <Icon size="large" circular inverted name="user" />
              )}
              {currentUser.displayName} / SIGN OUT
            </Menu.Item>
          ) : (
            <Menu.Item header position="right">
              <Link to="/signInOrRegister">Sign In or Register</Link>
            </Menu.Item>
          )}
        </Container>
      </Menu>
    </div>
  );
};

export default HeaderComponent;
