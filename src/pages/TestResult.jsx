import { useEffect, useState } from "react";
import { getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList";

const TestResult = ({ user }) => {
  const [results, setResults] = useState([]);
  console.log("user", user);

  const fetchResults = async () => {
    const data = await getTestResults();
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // 결과가 변경될 때 상태 업데이트
  const handleUpdate = () => {
    fetchResults();
  };
  const handleDelete = () => {
    fetchResults();
  };

  return (
    <div>
      <div>
        <h1>모든 테스트 결과</h1>
        <TestResultList
          results={results}
          user={user}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default TestResult;
