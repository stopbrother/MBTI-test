import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const SignUp = () => {
  return (
    <div>
      <div>
        <h1>회원가입</h1>
        <AuthForm mode="signup" />
        <div>
          <p>
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
