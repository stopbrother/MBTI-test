import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

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
      <header>
        <nav>
          <Link to="/">홈</Link>
          <div>
            {user ? (
              <>
                <Link to="/profile">프로필</Link>
                <button onClick={handleLogOut}>로그아웃</button>
              </>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};
