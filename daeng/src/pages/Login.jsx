import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import kakaoLoginBtn from "../assets/icons/kakaoLoginBtn.svg";
import loginGoogle from "../assets/icons/login_google.svg";
import loginPuppy from "../assets/icons/login_puppy.svg";

const Login = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    const handleKakaoLogin = () => {
        window.location.href = "https://www.daengdaeng-where.link/oauth2/authorization/kakao";
    };

    const handleGoogleLogin = () => {
        location.href = "https://www.daengdaeng-where.link/oauth2/authorization/google";
    };
    

    return (
        <Container>
            <TitleContainer>
                <MainTitle>댕댕어디가</MainTitle>
                <SubTitle>와 함께</SubTitle>
            </TitleContainer>
            <Subtitle>반려동물 동반 가능 시설을 찾아봐요!</Subtitle>
            <Image src={loginPuppy} alt="강아지 이미지" />
            <DividerContainer>
                <Line />
                <DividerText>소셜 로그인으로 간편 가입</DividerText>
                <Line />
            </DividerContainer>
            <Button onClick={handleKakaoLogin}>
                <img src={kakaoLoginBtn} alt="카카오 로그인" />
            </Button>
            <Button onClick={handleGoogleLogin}>
                <img src={loginGoogle} alt="구글 로그인" />
            </Button>
            <FooterText onClick={handleGoHome}>나중에 가입할게요</FooterText>
        </Container>
    );
};

const Container = styled.div`
    width: 90%;
    max-width: 554px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #ffffff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100vh;
    padding: 50px 20px 20px 20px;
    box-sizing: border-box;
    overflow-y: auto;

    @media (max-width: 554px) {
        width: 90%;
        height: 75vh;
        padding: 10px;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: baseline;
    margin-bottom: 10px;
    margin-top: 70px;

    @media (max-width: 554px) {
        margin-top: 50px;
        margin-bottom: 8px;
    }
`;

const MainTitle = styled.span`
    font-family: "RixInooAriDuri", sans-serif;
    font-size: 60px;
    color: #ff4b98;
    font-weight: normal;
    margin-right: 1px;

    @media (max-width: 554px) {
        font-size: 11vw;
    }
`;

const SubTitle = styled.span`
    font-family: "Pretendard", sans-serif;
    font-size: 28px;
    font-weight: bold;
    color: #000000;

    @media (max-width: 554px) {
        font-size: 5.9vw;
    }
`;

const Subtitle = styled.p`
    font-size: 28px;
    font-weight: bold;
    margin: 0px;
    margin-bottom: 30px;

    @media (max-width: 554px) {
        font-size: 5.9vw;
        margin-bottom: 20px;
    }
`;

const Image = styled.img`
    width: 380px;
    height: 264px;
    margin-top: 19px;

    @media (max-width: 554px) {
        width: 80%;
        height: auto;
    }
`;

const DividerContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 13px;
    margin-bottom: 50px;
    width: 100%;

    @media (max-width: 554px) {
        margin-top: 10px;
        margin-bottom: 30px;
    }
`;

const Line = styled.div`
    flex: 1;
    height: 1px;
    background-color: #b3b3b3;
    margin-left: 25px;
    margin-right: 25px;

    @media (max-width: 554px) {
        margin-left: 10px;
        margin-right: 10px;
    }
`;

const DividerText = styled.p`
    font-size: 17px;
    font-weight: 600;
    color: #b3b3b3;

    @media (max-width: 554px) {
        font-size: 3.5vw;
    }
`;

const Button = styled.button`
    background-color: ${({ bgColor }) => bgColor || "transparent"};
    border: none;
    cursor: pointer;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    max-width: 320px;
    height: 50px;

    img {
        width: 100%;
        height: auto;
    }

    @media (max-width: 554px) {
        width: 90%;
        max-width: 300px;
        height: 45px;
    }
`;

const FooterText = styled.p`
    font-size: 16px;
    font-weight: 600;
    color: #b3b3b3;
    margin-top: 30px;
    cursor: pointer;

    @media (max-width: 554px) {
        font-size: 3vw;
    }
`;

export default Login;
