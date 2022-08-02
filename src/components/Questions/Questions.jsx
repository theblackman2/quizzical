import "./Questions.css";
import Question from "../Question/Question";
import { nanoid } from "nanoid";

import React from "react";

function Questions() {
  const [allQuestions, setQuestions] = React.useState([]);

  const createQuestions = (questions) => {
    return questions.map((question) => {
      const correct_answer = question.correct_answer;
      const incorrect_answers = question.incorrect_answers;

      const allAnswers = [correct_answer];
      for (let i = 0; i < incorrect_answers.length; i++) {
        allAnswers.push(incorrect_answers[i]);
      }

      const shurffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

      return {
        question: question.question,
        answers: shurffledAnswers.map((answer) => {
          return {
            answer: answer,
            selected: false,
          };
        }),
        correct_answer: question.correct_answer,
      };
    });
  };

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((response) => response.json())
      .then((data) => setQuestions(createQuestions(data.results)));
  }, []);

  const questions = allQuestions.map((question) => {
    const key = nanoid();
    return <Question question={question} key={key} />;
  });

  return <div className="questions">
    { questions }
  </div>;
}

export default Questions;
