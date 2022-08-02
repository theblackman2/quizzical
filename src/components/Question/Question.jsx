import "./Question.css";

import React from "react";

function Question(props) {
  const incorrect_answers = props.question.incorrect_answers;
  const correct_answer = props.question.correct_answer;

  const allAnswers = [correct_answer];
  for (let i = 0; i < incorrect_answers.length; i++) {
    allAnswers.push(incorrect_answers[i]);
  }

  const shurffledAnswers = allAnswers.sort(() => Math.random - 0.5);

  const answers = shurffledAnswers.map((answer) => {
    return (
      <div dangerouslySetInnerHTML={{__html: answer}} key={allAnswers.indexOf(answer)} className="answer">
      </div>
    );
  });

  return (
    <div className="question">
      <h2
        className="question-text"
        dangerouslySetInnerHTML={{ __html: props.question.question }}
      ></h2>
      <div className="answers">{answers}</div>
      <hr className="separator" />
    </div>
  );
}

export default Question;
