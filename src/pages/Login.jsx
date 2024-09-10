import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { login } from "../api/auth";
import { FormBox, Main } from "../components/Styled";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const userData = await login(formData);
      setUser(userData);
      localStorage.setItem("accessToken", userData.accessToken);
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
