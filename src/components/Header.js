import PropTypes from "prop-types";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";

const Header = ({ title, addClick, closeClick, isAddClicked }) => {
  const { pathname } = useLocation();
  let showClose = pathname.includes("/edit", 0) ? true : false;
  let history = useHistory();
  console.log("isAddClickedisAddClicked", isAddClicked);
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <h1>{title}</h1>
      </Link>
      <Link to={isAddClicked || showClose ? "/" : "/add"}>
        <Button
          color="black"
          text={showClose || isAddClicked ? "Close" : "Add"}
          onClick={() => {
            if (showClose) {
              closeClick();
              history.push("/");
            } else addClick();
          }}
        />
      </Link>
    </header>
  );
};

Header.defaultProps = {
  title: "Task tracker default",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
