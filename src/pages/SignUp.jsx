import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../api/auth";
import { FormBox, Main } from "../components/Styled";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (formData) => {
    try {
      await register(formData);
      navigate("/login");
    } catch {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Main>
      <FormBox>
        <h1>회원가입</h1>
        <AuthForm mode="signup" onSubmit={handleSignUp} />
        <div>
          <p>
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="underline">
              로그인
            </Link>
          </p>
        </div>
      </FormBox>
    </Main>
  );
};

export default SignUp;
