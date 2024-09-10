import { Link } from "react-router-dom";
import { Main } from "../components/Styled";
import styled from "styled-components";

const Home = ({ user }) => {
  return (
    <Main className="gap-4">
      <h1 className="text-4xl">무료 성격 테스트</h1>
      <p>자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.</p>
      {user ? (
        <BgRedLink to="/test">MBTI 테스트</BgRedLink>
      ) : (
        <BgRedLink to="/login">로그인하기</BgRedLink>
      )}
    </Main>
  );
};

export default Home;

const BgRedLink = styled(Link)`
  background-color: rgb(239, 68, 68);
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
  }
`;
