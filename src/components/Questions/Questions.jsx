import "./Questions.css";
import { nanoid } from "nanoid";
import Bouton from "../Bouton/Bouton";
import Confetti from "react-confetti";
import Loading from "../Loading/Loading";

import React from "react";

function Questions(props) {
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [hasFinished, setHasFinished] = React.useState(false);
  const [correctsAnswers, setCorrectsAnswers] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

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
        successful: false,
      };
    });
  };

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((response) => response.json())
      .then((data) => setAllQuestions(createQuestions(data.results)))
      .then(() => setLoading(false));
  }, []);

  const checkAnswers = () => {
    const finalQuestions = allQuestions.map((question) => {
      const correct = question.answers.filter(
        (answer) => answer.answer === question.correct_answer
      )[0].answer;
      const selected = question.answers.filter(
        (answer) => answer.id === question.selected_answer_id
      );
      const isSuccessful =
        selected.length > 0 && selected[0].answer === correct;
      return isSuccessful ? { ...question, successful: true } : question;
    });
    let corrects = 0;
    finalQuestions.forEach((question) => {
      if (question.successful) corrects += 1;
    });
    setCorrectsAnswers(corrects);
    setAllQuestions(finalQuestions);
    setHasFinished(true);
  };

  const questions = allQuestions.map((question) => {
    const updateQuestion = (questionId, answerId) => {
      setAllQuestions((oldQuestions) => {
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

    const answers = !hasFinished
      ? question.answers.map((answer) => {
          const styles = {
            backgroundColor: !hasFinished
              ? answer.selected
                ? "#D6DBF5"
                : "transparent"
              : answer.selected
              ? "#94D7A2"
              : "transparent",
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
        })
      : question.answers.map((answer) => {
          const styles = {
            backgroundColor: answer.selected
              ? answer.answer === question.correct_answer
                ? "#94D7A2"
                : "#F8BCBC"
              : answer.answer === question.correct_answer
              ? "#94D7A2"
              : "transparent",
          };
          return (
            <div
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

  return loading ? (
    <Loading />
  ) : (
    <div className="questions">
      {questions}
      <div className="check">
        {hasFinished && (
          <h3 className="corrests">
            {correctsAnswers === 5 && <Confetti />}
            You scored {correctsAnswers}/5 correct answers
          </h3>
        )}
        <Bouton
          text={hasFinished ? "Play again" : "Check answers"}
          handleClick={
            hasFinished ? () => props.playAgain() : () => checkAnswers()
          }
        />
      </div>
    </div>
  );
}

export default Questions;
