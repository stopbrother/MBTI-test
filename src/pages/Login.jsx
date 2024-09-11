import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { login } from "../api/auth";
import { FormBox, Main } from "../components/Styled";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const Login = () => {
  const { contextLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    queryKey: [],
    queryFn: login,
  });

  const handleLogin = async (formData) => {
    try {
      const userData = await login(formData);
      contextLogin(userData.accessToken);
      navigate("/");
    } catch {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <Main>
      <FormBox>
        <h1>로그인</h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <div>
          <p>
            계정이 없으신가요?{" "}
            <Link to="/signup" className="underline">
              회원가입
            </Link>
          </p>
        </div>
      </FormBox>
    </Main>
  );
};

export default Login;
