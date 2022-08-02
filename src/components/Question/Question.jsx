import "./Question.css";

import React from "react";

function Question(props) {
  const [question, setQuestion] = React.useState(props.question);

  const selectAnswer = (id) => {
    setQuestion((oldQuestion) => {
      return {
        ...oldQuestion,
        answers: oldQuestion.answers.map((answer) => {
          return answer.id === id
            ? { ...answer, selected: !answer.selected }
            : { ...answer, selected: false };
        }),
      };
    });
  };

  const answers = question.answers.map((answer) => {
    const styles = {
      backgroundColor: answer.selected ? "#D6DBF5" : "transparent",
    };
    return (
      <div
        onClick={() => selectAnswer(answer.id)}
        style={styles}
        key={question.answers.indexOf(answer)}
        dangerouslySetInnerHTML={{ __html: answer.answer }}
        className="answer"
      ></div>
    );
  });

  return (
    <div className="question">
      <h2
        className="question-text"
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></h2>
      <div className="answers">{answers}</div>
      <hr className="separator" />
    </div>
  );
}

export default Question;
