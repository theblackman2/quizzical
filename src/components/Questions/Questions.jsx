import "./Questions.css";
import { nanoid } from "nanoid";
import Bouton from "../Bouton/Bouton";

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
        id: nanoid(),
        question: question.question,
        answers: shurffledAnswers.map((answer) => {
          return {
            id: nanoid(),
            answer: answer,
            selected: false,
          };
        }),
        correct_answer: question.correct_answer,
        selected_answer_id: null,
      };
    });
  };

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((response) => response.json())
      .then((data) => setQuestions(createQuestions(data.results)));
  }, []);

  const checkAnswers = () => {
    console.log(allQuestions)
  }

  const questions = allQuestions.map((question) => {
    const updateQuestion = (questionId, answerId) => {
      setQuestions((oldQuestions) => {
        return oldQuestions.map((oldQuestion) => {
          return oldQuestion.id === questionId
            ? {
                ...oldQuestion,
                answers: oldQuestion.answers.map((answer) => {
                  return answer.id === answerId
                    ? { ...answer, selected: true }
                    : { ...answer, selected: false };
                }),
                selected_answer_id: answerId,
              }
            : oldQuestion;
        });
      });
    };

    const answers = question.answers.map((answer) => {
      const styles = {
        backgroundColor: answer.selected ? "#D6DBF5" : "transparent",
      };
      return (
        <div
          onClick={() => updateQuestion(question.id, answer.id)}
          style={styles}
          key={question.answers.indexOf(answer)}
          dangerouslySetInnerHTML={{ __html: answer.answer }}
          className="answer"
        ></div>
      );
    });

    const key = nanoid();
    return (
      <div key={key} className="question">
        <h2
          className="question-text"
          dangerouslySetInnerHTML={{ __html: question.question }}
        ></h2>
        <div className="answers">{answers}</div>
      </div>
    );
  });

  return (
    <div className="questions">
      {questions}
      <div className="check">
        <Bouton text="Check answers" handleClick={() => checkAnswers()} />
      </div>
    </div>
  );
}

export default Questions;
