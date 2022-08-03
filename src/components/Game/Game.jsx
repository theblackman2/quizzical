import React from "react";
import Questions from "../Questions/Questions";
import Bouton from "../Bouton/Bouton";
import "./Game.css";

function Game() {
  const [playing, setPlaying] = React.useState(false);
  const [formData, setFormData] = React.useState({
    category: "any",
    difficulty: "any",
    number: 5,
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const biginGame = () => {
    setPlaying(true);
  };

  const playAgain = () => {
    setPlaying(false);
  };

  return (
    <div className="game">
      {!playing && (
        <div className="welcome-section">
          <h1>Quizzical</h1>
          <p className="welcome-message">Challange yourself with questions based on multiple topics</p>
          <form className="form-data">
            <div className="form-control">
              <label htmlFor="number">Number of questions</label>
              <input
                type="number"
                name="number"
                id="number"
                value={formData.number}
                min="1"
                max="20"
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="category">Select category</label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="any">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">
                  Entertainment: Musicals &amp; Theatres
                </option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science &amp; Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">
                  Entertainment: Japanese Anime &amp; Manga
                </option>
                <option value="32">
                  Entertainment: Cartoon &amp; Animations
                </option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="difficulty">Select Difficulty: </label>
              <select
                name="difficulty"
                className="form-control"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </form>
          <Bouton handleClick={biginGame} text="Start quiz" />
        </div>
      )}
      {playing && <Questions options={formData} playAgain={playAgain} />}
    </div>
  );
}

export default Game;
