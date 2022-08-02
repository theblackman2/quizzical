import "./Question.css";

import React from "react";

function Question(props) {
  const allAnswers = props.question.answers;
  const answers = allAnswers.map((answer) => {
    const styles = {
      "backgroundColor": answer.selected ? "#D6DBF5" : "transparent",
    }
    return (
      <div
        key={allAnswers.indexOf(answer)}
        dangerouslySetInnerHTML={{ __html: answer.answer }}
        className="answer"
      ></div>
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
