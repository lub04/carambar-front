import "./Header.css";
import carambar from "../../assets/images/carambar.png";

function Header() {
  return (
    <header>
      <img src={carambar} alt="" className="carambar-img" />
    </header>
  );
}

export default Header;
