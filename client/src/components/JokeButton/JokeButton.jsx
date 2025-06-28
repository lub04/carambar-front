import PropTypes from "prop-types";
import "./JokeButton.css";
import boom from "../../assets/images/boom.png";

function JokeButton({ css, text, openModal }) {
  return (
    <button type="button" className={`joke-button ${css}`} onClick={openModal}>
      <img src={boom} alt="" />
      <h2>{text}</h2>
    </button>
  );
}

JokeButton.propTypes = {
  css: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default JokeButton;
