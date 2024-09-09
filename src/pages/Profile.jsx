import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateProfile } from "../api/auth";

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
        console.log("effectToken", token);

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
    <div>
      <div>
        <h1>프로필 수정</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>닉네임</label>
            <input
              type="text"
              name="nickname"
              value={nickname}
              onChange={handleNicknameChange}
            />
          </div>
          <button>프로필 수정</button>
        </form>
      </div>
    </div>
  );
};
