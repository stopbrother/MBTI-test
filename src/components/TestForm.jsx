import { useState } from "react";
import { questions } from "../data/questions";

const TestForm = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleChange = (index, answer) => {};

  const handleSubmit = (e) => {};

  return (
    <form>
      {questions.map((q, index) => (
        <div key={q.id}>
          <p>{q.question}</p>
          {q.options.map((option, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={() => handleChange(index, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button>제출하기</button>
    </form>
  );
};

export default TestForm;
