import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/auth";

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
