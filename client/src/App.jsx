import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";

import JokeButton from "./components/JokeButton/JokeButton";
import boom from "./assets/images/carambar.png";
import down from "./assets/images/icons/chevron-down.svg";
import downWhite from "./assets/images/icons/chevron-down-white.svg";

import connexion from "./services/connexion";
import "./App.css";
import successToast from "./components/Toast/successToast";
import errorToast from "./components/Toast/errorToast";

const initialJoke = {
  question: "",
  answer: "",
};

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [jokes, setJokes] = useState([]);
  const [newJoke, setNewJoke] = useState(initialJoke);
  const [answer, setAnswer] = useState(false);
  const [answerId, setAnswerId] = useState(null);
  const [modalType, setModalType] = useState(null);

  const openModal = async (type, id) => {
    setModalIsOpen(true);
    setModalType(type);
    try {
      if (type === "random") {
        const response = await connexion.get("/api/jokes/1?mode=random");
        setJokes(response.data);
      }
      if (type === "all") {
        const response = await connexion.get("/api/jokes");
        setJokes(response.data);
      }
      if (type === "one") {
        const response = await connexion.get(`/api/jokes/${id}`);
        setJokes(response.data);
      }
    } catch (error) {
      console.error("Une erreur est survenue : ", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAnswer(false);
  };

  const handleCreateJoke = (event) => {
    const { name, value } = event.target;
    setNewJoke((prevJoke) => ({
      ...prevJoke,
      [name]: value,
    }));
  };

  const handleSubmitJoke = async (event) => {
    event.preventDefault();
    try {
      const response = await connexion.post("/api/jokes", newJoke);
      const jokeId = response.data.insertId;
      successToast("Ta blague est en ligne !");
      openModal("one", jokeId);
    } catch (error) {
      errorToast("Nous rencontrons un problème de connexion à ton humour !");
      console.error(error);
    }
  };
  return (
    <main>
      <img src={boom} alt="Fond d'écran de la page" className="carambar-img" />
      <JokeButton
        css="random-joke"
        text="Une blague au pif !?"
        openModal={() => openModal("random")}
      />
      <JokeButton
        css="all-jokes"
        text="Toutes les blagues !"
        openModal={() => openModal("all")}
      />
      <JokeButton
        css="add-joke"
        text="Ajoute ta blague !"
        openModal={() => openModal("add")}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Validation Modal"
        className={`modal ${modalType === "random" || modalType === "one" ? "modal-one-joke" : "modal-list"}`}
        appElement={document.getElementById("root")}
      >
        {(modalType === "random" || modalType === "one") &&
          jokes.length > 0 && (
            <article className="one-joke-question-answer">
              <h2>{jokes[0].question}</h2>
              {answer ? (
                <p>{jokes[0].answer}</p>
              ) : (
                <button
                  type="button"
                  className="button"
                  onClick={() => setAnswer(true)}
                >
                  Voir la réponse
                  <img src={down} alt="" />
                </button>
              )}
            </article>
          )}
        {modalType === "all" && (
          <section className="all-jokes-list">
            {jokes.map((joke) => (
              <article key={joke.id}>
                <button
                  type="button"
                  className="button-list"
                  onClick={() =>
                    answerId === joke.id
                      ? setAnswerId(null)
                      : setAnswerId(joke.id)
                  }
                >
                  {joke.question}
                  {answerId === joke.id ? (
                    <p>{joke.answer}</p>
                  ) : (
                    <img src={downWhite} alt="" />
                  )}
                </button>
              </article>
            ))}
          </section>
        )}
        {modalType === "add" && (
          <form onSubmit={handleSubmitJoke}>
            <fieldset>
              <legend>Ajoute ta blague et fait nous rire !</legend>
              <label>
                Ta blague carambar :
                <input
                  name="question"
                  value={newJoke.question}
                  onChange={handleCreateJoke}
                  type="text"
                />
              </label>
              <label>
                Ta réponse :
                <input
                  name="answer"
                  value={newJoke.answer}
                  onChange={handleCreateJoke}
                  type="text"
                />
              </label>
              <button type="submit" className="button">
                Valider
              </button>
            </fieldset>
          </form>
        )}
        <button
          type="button"
          className="button-close-modal"
          onClick={closeModal}
        >
          x
        </button>
      </Modal>
      <ToastContainer />
    </main>
  );
}

export default App;
