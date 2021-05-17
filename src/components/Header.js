import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, addClick, isAddClicked }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={isAddClicked ? "blue" : "black"}
        text={isAddClicked ? "Close" : "Add"}
        onClick={addClick}
      />
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
