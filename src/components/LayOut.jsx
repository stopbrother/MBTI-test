import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const LayOut = () => {
  //   const navigate = useNavigate();

  //TODO 로그인 하지 않은 사용자 -> login 페이지로
  useEffect(() => {}, []);

  //   const handleLogOut = () => {};

  return (
    <div>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <div>
            <Link to="/login">로그인</Link>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};
