import PropTypes from "prop-types";
import "./RandomJoke.css";
import boom from "../../assets/images/boom.png";

function RandomJoke({ css, text }) {
  return (
    <button type="button" className={`joke-button ${css}`}>
      <img src={boom} alt="" />
      <h2>{text}</h2>
    </button>
  );
}

RandomJoke.propTypes = {
  css: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default RandomJoke;
