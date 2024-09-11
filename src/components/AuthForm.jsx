import { useState } from "react";
import styled from "styled-components";

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-96 gap-2">
      <FormInput
        type="text"
        name="id"
        placeholder="아이디"
        value={formData.id}
        onChange={handleChange}
        required
      />
      <FormInput
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {mode === "signup" && (
        <FormInput
          type="text"
          name="nickname"
          id="nickname"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
      )}
      <FormButton>{mode === "login" ? "로그인" : "회원가입"}</FormButton>
    </form>
  );
};

export default AuthForm;

const FormInput = styled.input`
  padding: 10px;
  height: 40px;
  color: #000000;
`;
const FormButton = styled.button`
  width: 100%;
  padding: 6px 16px;
  background-color: rgb(99, 102, 241);
  margin-bottom: 4px;
`;
