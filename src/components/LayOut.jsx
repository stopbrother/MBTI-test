import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

export const LayOut = ({ user, setUser }) => {
  const navigate = useNavigate();

  //TODO 로그인 하지 않은 사용자 -> login 페이지로
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleLogOut = () => {
    setUser(null);
  };

  return (
    <div>
      <Header>
        <nav className="flex flex-row justify-between items-center h-12">
          <Link to="/" className="font-bold hover:opacity-50">
            홈
          </Link>
          <div className="flex gap-2 items-center">
            {user ? (
              <>
                <UserLink to="/profile">프로필</UserLink>
                <UserLink to="/test">MBTI테스트</UserLink>
                <UserLink to="/results">결과보기</UserLink>
                <button
                  onClick={handleLogOut}
                  className="bg-indigo-500 p-1 text-white rounded-md text-base"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-500 p-2 text-white rounded-md"
              >
                로그인
              </Link>
            )}
          </div>
        </nav>
      </Header>
      <Outlet />
    </div>
  );
};
const Header = styled.header`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const UserLink = styled(Link)`
  font-size: 12px;
  &:hover {
    opacity: 0.5;
  }
`;
