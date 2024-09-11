# MBTI 테스트
MBTI 성격 유형 테스트 서비스 구현

# 회원가입 / 로그인
### 회원가입
![chrome_lLjnJyjEcx](https://github.com/user-attachments/assets/bc4a8217-d90a-47f3-8f36-71cd0b9f0616)

### 로그인
![chrome_OlNj8h83My](https://github.com/user-attachments/assets/7b6a7e57-1882-46fb-90a0-8bdb8d2f5448)

# 메인 화면
![chrome_YKFpVOHgnR](https://github.com/user-attachments/assets/e98ef603-bacc-47d5-a4ee-c250954422fb)
로그인이 완료되면 메인화면으로 오게 된다.
헤더에는 "**프로필**"을 클릭하면 닉네임을 수정할 수 있는 페이지로 이동된다.
"**MBTI테스트**"를 클릭하면 MBTI를 테스트 할 수 있는 페이로 이동.
"**결과보기**"를 클릭하면 다른 사용자들과 사용자가 테스트한 결과를 볼 수 있는 페이지로 이동 된다.

# 프로필 수정(닉네임)
![chrome_51f4budCwb](https://github.com/user-attachments/assets/6ff47ae9-d477-497d-8f08-dfa3fae43fb2)

# MBTI 테스트
![chrome_7jXhJVbVIL](https://github.com/user-attachments/assets/2e9da8de-aa72-48b9-9d34-a223d6db8ae4)
(아직 css를 입히지 않았다.)
20개의 문항을 선택하여 제출하기 버튼을 클릭하면 결과보기 페이지로 이동되면서 결과를 볼 수 있다.

# MBTI 테스트 결과
![chrome_QxjASoGLq4](https://github.com/user-attachments/assets/2d3ac41f-9092-4067-a5bb-c5a344ded672)
로그인한 사용자가 테스트한 mbti일 경우 공개/비공개 or 삭제 처리 할 수 있다.

# Troble Shooting
1. 회원가입 구현 도중 input창에 텍스트를 입력이 안되는 현상이 발생하여서 콘솔창을 열어 확인을 해보니
```
Warning: A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component
```
input 컴포넌트가 controlled 상태에서 uncontrolled상태로 변할때 발생하는 경고라고 한다.
```
  const handleChange = (e) => {
    setFormData(e.target.value);
  };
```
fromData는 객체형태로 id,password,nickname이 들어 있는데 위처럼 단일 값을 업데이트 하려고 했기 때문에 발생한 오류 였다.
```
setFormData({ ...formData, [e.target.name]: e.target.value });
```
객체의 모든 필드를 유지하면서 변경된 필드가 업데이트 되도록 수정하여 해결하였다.

2. 프로필 수정이 되지 않아서 콘솔을 찍어보던 도중 token이 null인걸 확인하였다.
개발자도구의 Application에서 localStorage에 토큰이 있는걸 확인 하였는데도 자꾸 null이 나오길래 확인해봤더니 이전프로젝트에서 사용했던 이메일이 있는걸 확인하였다.
그래서 그걸 삭제 해보고 닉네임 수정을 했더니 이번에는 undefined가 나왔다.
토큰은 자동으로 저장되는줄 알았는데 로그인할때 토큰을 저장해주어야 했던것이였다.

```
localStorage.setItem("accessToken", userData.accessToken);
```
로그인 함수(handleLogin)에 토큰을 저장하는 로직을 추가 하였다.
저 한줄 때문에 시간을 얼만큼 날린건지 모르겠다. ㅋㅋ

```
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
```

3. mbti 질문에 응답하고 submit하여 post요청을 보냈는데
net::ERR_CONNECTION_REFUSED에러와 Uncaught (in promise) 에러가 발생하였다.
위 에러는 주로 서버가 실행 중이 아니거나 잘못된 url이나 포트를 사용해서 서버에 연결을 시도할 때 발생한다고 한다.
그래서 5000포트로 웹을 열어보니 연결할 수 없는 페이지라고 뜨는걸 확인하고 json-server가 실행되지 않는걸 알 수 있었다.
vscode 터미널에서 yarn dev 실행하고 git bash 터미널을 열어서 yarn json-server를 입력하여 두 서버를 동시에 실행하였다.

4. mbti 결과를 공개를 전환하려고 하는데 PATCH 404에러가 발생하였다. 
```
export const updateTestResultVisibility = async (id, visibility) => {
  const response = await axios.patch(`${API_URL}/${id}`, visibility );
  return response.data;
};
```
visibility 값만 전달해주어서 그런것이였다. 객체로 감싸서 문제 해결 {visibility}

5. json-server 배포