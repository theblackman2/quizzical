import "./Questions.css";
import Question from "../Question/Question";
import { nanoid } from "nanoid";

import React from "react";

function Questions() {
  const [allQuestions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((response) => response.json())
      .then((data) => setQuestions(data.results));
  }, []);

  const questions = allQuestions.map((question) => {
    const key = nanoid();
    return <Question question={question} key={key} />;
  });

  return <div className="questions">{questions}</div>;
}

export default Questions;
