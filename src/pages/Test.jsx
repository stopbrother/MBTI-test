import { useNavigate } from "react-router-dom";
import TestForm from "../components/TestForm";

const Test = () => {
  const navigate = useNavigate();

  const handleTestSubmit = async (answers) => {};

  return (
    <div>
      <h1>MBTI 테스트</h1>
      <TestForm />
    </div>
  );
};

export default Test;
