import "./App.css";
import RandomJoke from "./components/RandomJoke/RandomJoke";
import boom from "./assets/images/carambar.png";

function App() {
  return (
    <main>
      <img src={boom} alt="" className="carambar-img" />
      <RandomJoke css="random-joke" text="Une blague au pif !?" />
      <RandomJoke css="all-jokes" text="Toutes les blagues !" />
    </main>
  );
}

export default App;
