import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateProfile } from "../api/auth";
import { Main } from "../components/Styled";

export const Profile = ({ user, setUser }) => {
  const [nickname, setNickname] = useState(user?.nickname || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else {
      const fetchUserInfo = async () => {
        const token = localStorage.getItem("accessToken");

        if (token) {
          const userData = await getUserProfile(token);
          setNickname(userData.nickname);
        } else {
          navigate("/login");
        }
      };
      fetchUserInfo();
    }
  }, [user]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    console.log("token", token);
    const formData = new FormData();
    formData.append("nickname", nickname);

    try {
      const userData = await updateProfile(formData, token);
      setUser((prevState) => ({
        ...prevState,
        nickname: userData.nickname,
      }));
      alert("닉네임이 변경되었습니다.");
    } catch {
      alert("닉네임 변경 실패");
    }
  };

  return (
    <Main>
      <div className="flex flex-col items-center gap-2 border-solid border border-indigo-600 w-96">
        <h1>프로필 수정</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <div>
            <label>닉네임:</label>
            <input
              type="text"
              name="nickname"
              value={nickname}
              onChange={handleNicknameChange}
              className="h-8 border p-2"
            />
          </div>
          <button className="bg-indigo-500 h-6 w-28 text-white rounded hover:opacity-75">
            프로필 수정
          </button>
        </form>
      </div>
    </Main>
  );
};
