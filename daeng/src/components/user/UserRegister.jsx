import styled from 'styled-components';
import SelectLabel from '../../components/commons/SelectLabel';
import SelectBtn from '../../components/commons/SelectBtn';
import kakaoBtn from '../../assets/icons/kakaoBtn.svg';
import googleBtn from '../../assets/icons/GoogleBtn.svg';
import ConfirmBtn from '../../components/commons/ConfirmBtn';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AreaField from '../../data/AreaField';
import axios from 'axios';
import AlertDialog from "../commons/SweetAlert";
import { pushAgree } from '../../data/CommonCode';
import { requestNotificationPermission } from '../../firebase/firebaseMessaging';

function UserRegister() {
  const navigate = useNavigate();
  const [selectedPushType] = useState(pushAgree[0].code);

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search);
    let email = queryString.get('email');
    let provider = queryString.get('provider');
    if (email) {
      email = email.trim();
      setUserData((prev) => ({
        ...prev,
        email: decodeURIComponent(email),
        oauthProvider: decodeURIComponent(provider),
      }));
    }
  }, []);

  const [userData, setUserData] = useState({
    email: '',
    nickname: '',
    gender: '', 
    city: '',
    cityDetail: '',
    alarmAgreement: '받을래요', 
    oauthProvider: '',
  });

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: prev[field] === value ? '' : value,
    }));
  };

  const handleGenderChange = (genderCode) => {
    setUserData((prev) => ({
      ...prev,
      gender: prev.gender === genderCode ? '' : genderCode,
    }));
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setUserData((prev) => ({
      ...prev,
      city: selectedCity,
      cityDetail: '',
    }));
  };

  const validateFields = () => {
    if (!userData.nickname.trim()) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 필요",
        text: "닉네임은 최소 1자 이상 작성해 주세요.",
        confirmText: "확인",
        onConfirm: () => console.log("닉네임 부족 경고 확인됨"),
      });
      return false;
    }
  
    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    if (!userData.nickname || !nicknameRegex.test(userData.nickname)) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 오류",
        text: "특수문자는 사용하실 수 없습니다.",
        confirmText: "확인",
        onConfirm: () => console.log("닉네임 오류 경고 확인됨"),
      });
      return false;
    }
  
    if (!userData.nickname || !userData.gender || !userData.city || !userData.cityDetail || !userData.alarmAgreement) {
      AlertDialog({
        mode: "alert",
        title: "입력 필요",
        text: "모든 필드를 작성해주세요.",
        confirmText: "확인",
        onConfirm: () => console.log("모든 필드 작성 경고 확인됨"),
      });
      return false;
    }
  
    return true;
  };

  const handleNotificationRequest = async () => {
    try {
      const token = await requestNotificationPermission();
      if (token) {
        console.log('FCM 토큰 발급 성공:', token);

        // 서버로 FCM 토큰 전송
        const response = await axios.post('https://www.daengdaeng-where.link/api/v1/notifications/pushToken', {
          token,
          pushType: selectedPushType, 
        });

        if (response.status === 200) {
          console.log('서버에 FCM 토큰 전송 성공:', response.data);
          alert('알림 권한이 설정되었습니다.');
        } else {
          console.error('서버에 FCM 토큰 전송 실패:', response);
          alert('서버로 토큰 전송에 실패했습니다.');
        }
      } else {
        console.error('알림 권한 요청 실패');
        alert('알림 권한 요청이 거부되었습니다.');
      }
    } catch (error) {
      console.error('알림 권한 요청 중 오류 발생:', error);
      alert('알림 권한 요청 중 문제가 발생했습니다.');
    }
  };

  const handleConfirm = async () => {
    if (!validateFields()) {
      return;
    }
    const payload = {
      nickname: userData.nickname,
      PushAgreement: userData.alarmAgreement === "받을래요",
      email: userData.email,
      gender: userData.gender,
      city: userData.city,
      cityDetail: userData.cityDetail,
      oauthProvider: userData.oauthProvider,
    };
  
    console.log("회원가입 데이터:", payload);
  
    try {
      const { data, status } = await axios.post(
        "https://www.daengdaeng-where.link/api/v1/signup",
        payload,
        {
          withCredentials: true,
        }
      );
  
      if (status === 200 || status === 201) {
        console.log("응답 데이터:", data);

        if (userData.alarmAgreement === '받을래요') {
          await handleNotificationRequest();
        }

        AlertDialog({
          mode: "alert",
          title: "회원가입 성공",
          text: "회원가입이 성공적으로 완료되었습니다. 선호도 등록페이지로 이동합니다.",
          confirmText: "확인",
          onConfirm: () => navigate("/preference-register"),
        });
      } else {
        console.error(`Unexpected status code: ${status}`);
        AlertDialog({
          mode: "alert",
          title: "회원가입 실패",
          text: "회원가입 중 문제가 발생했습니다. 다시 시도해주세요.",
          confirmText: "확인",
          onConfirm: () => console.log("회원가입 실패 확인됨"),
        });
      }
    } catch (error) {
      if (error.response) {
        console.error("회원가입 실패 - 서버 응답:", error.response.data);
        AlertDialog({
          mode: "alert",
          title: "회원가입 실패",
          text: error.response.data.message || "알 수 없는 오류가 발생했습니다.",
          confirmText: "확인",
          onConfirm: () => console.log("서버 오류 확인됨"),
        });
      }
    }
  };
  
  const handleNicknameCheck = async () => {
    if (!userData.nickname.trim()) {
        AlertDialog({
            mode: "alert",
            title: "닉네임 필요",
            text: "닉네임을 입력해 주세요.",
            confirmText: "확인",
            onConfirm: () => console.log("닉네임 부족 경고 확인됨"),
        });
        return;
    }

    try {
        const { data } = await axios.get(
            `https://www.daengdaeng-where.link/api/v1/user/duplicateNickname`,
            {
                params: { nickname: userData.nickname },
                withCredentials: true,
            }
        );

        if (data.data.isDuplicate === false) {
            AlertDialog({
                mode: "alert",
                title: "닉네임 사용 가능",
                text: "사용 가능한 닉네임입니다.",
                confirmText: "확인",
                onConfirm: () => console.log("사용 가능한 닉네임 확인됨"),
            });
        } else if (data.data.isDuplicate === true) {
            AlertDialog({
                mode: "alert",
                title: "닉네임 중복",
                text: "사용 불가능한 닉네임입니다. 다른 닉네임을 입력해주세요.",
                confirmText: "확인",
                onConfirm: () => console.log("닉네임 중복 확인됨"),
            });
        }
    } catch (error) {
        if (error.response) {
            AlertDialog({
                mode: "alert",
                title: "닉네임 확인 실패",
                text: error.response.data.message || "알 수 없는 오류가 발생했습니다.",
                confirmText: "확인",
                onConfirm: () => console.log("서버 응답 오류 확인됨"),
            });
        }
    }
};

  return (
    <UserContainer>
      <SelectLabel label="이메일" />
      <InputEmailContainer>
        <Input type="email" value={userData.email} disabled />
        {userData.oauthProvider === 'google' ? (
          <Icon src={googleBtn} alt="구글 로그인" />
        ) : userData.oauthProvider === 'kakao' ? (
          <Icon src={kakaoBtn} alt="카카오 로그인" />
        ) : null}
      </InputEmailContainer>

      <SelectLabel label="닉네임" />
      <InputBox>
        <Input
          type="text"
          placeholder="사용하실 닉네임을 입력해 주세요."
          value={userData.nickname}
          onChange={(e) => handleInputChange('nickname', e.target.value)}
        />
        <DuplicateBtn onClick={handleNicknameCheck}>중복확인</DuplicateBtn>
      </InputBox>
      <InputAlert>*닉네임은 최소 1자 이상 작성해 주세요. 특수문자는 사용할 수 없습니다.</InputAlert>

      <SelectLabel label="성별" />
      <SelectionContainer>
        <SelectBtn
          label="남자"
          selected={userData.gender === 'GND_01'}
          onClick={() => handleGenderChange('GND_01')}
        />
        <SelectBtn
          label="여자"
          selected={userData.gender === 'GND_02'}
          onClick={() => handleGenderChange('GND_02')}
        />
      </SelectionContainer>

      <SelectLabel label="주소" />
      <SelectionContainer>
        <SelectBox onChange={handleCityChange} value={userData.city}>
          <option value="" disabled>
            도 선택
          </option>
          {Object.keys(AreaField).map((cityName, index) => (
            <option key={index} value={cityName}>
              {cityName}
            </option>
          ))}
        </SelectBox>
        <SelectBox
          onChange={(e) => handleInputChange('cityDetail', e.target.value)}
          value={userData.cityDetail}
          disabled={!AreaField[userData.city]?.length}
        >
          <option value="" disabled>
          시/군/구 선택
          </option>
          {(AreaField[userData.city] || [])
          .slice(1)
          .map((districtName, index) => (
            <option key={index} value={districtName}>
              {districtName}
            </option>
          ))}
        </SelectBox>
      </SelectionContainer>
      <InputAlert>*보호자님과 우리 댕댕이 맞춤 장소 추천을 위해 필요한 정보입니다.</InputAlert>

      <SelectLabel label="알림 동의" />
      <SelectionContainer>
        <SelectBtn
          label="받을래요"
          selected={userData.alarmAgreement === '받을래요'}
          onClick={() => handleInputChange('alarmAgreement', '받을래요')}
        />
        <SelectBtn
          label="괜찮아요"
          selected={userData.alarmAgreement === '괜찮아요'}
          onClick={() => handleInputChange('alarmAgreement', '괜찮아요')}
        />
      </SelectionContainer>
      <InputAlert>*장소에 함께하는 댕댕이를 알려드려요</InputAlert>
      <ConfirmContainer>
        <ConfirmBtn label="다음" onClick={handleConfirm} />
      </ConfirmContainer>
    </UserContainer>
  );
}

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin-left: 4%;
`;

const InputEmailContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(228, 228, 228, 0.2);
  width: 95%;
  height: 44px;
  border-radius: 5px;
  border: 0.5px solid #E4E4E4;
  color: black;
  padding: 0 10px;
  margin-bottom: 20px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  height: 44px;
  border-radius: 5px;
  border: 0.5px solid #E4E4E4;
  color: black;
  padding: 0 10px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 12px;
  color: black;

  ::placeholder {
    color: #b3b3b3;
  }

  &:disabled {
    color: #b3b3b3;
  }
`;

const Icon = styled.img`
  width: 20px;
  cursor: pointer;
  margin-right: 10px;
`;

const DuplicateBtn = styled.button`
  width: 15%;
  height: 23px;
  border-radius: 10px;
  border: none;
  font-size: 10px;
  cursor: pointer;
  background-color: #ff69a9;
  color: white;

  &:hover {
    background-color: #f9a9d4;
  }
`;

const InputAlert = styled.p`
  color: #ff69a9;
  font-size: 10px;
  display: flex;
  margin-top: -1px;
  flex-direction: flex-start;
  margin-bottom: 4%;
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SelectBox = styled.select`
  flex: 1;
  height: 44px;
  border-radius: 5px;
  padding: 10px;
  margin-right: 18px;
  margin-bottom: 10px;
  border: 0.5px solid #e4e4e4;
  font-size: 12px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-align: center;

  &:focus {
    border-color: #ff69a9;
    outline: none;
  }
`;

const ConfirmContainer = styled.div`
  display: flex;
  margin-top: 40px;
`;

export default UserRegister;
