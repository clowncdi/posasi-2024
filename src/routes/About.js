import { Width1400, pointColor, ScreenSmall } from "../components/Common";
import styled from "@emotion/styled";
import { BsSearch } from "react-icons/bs";

const About = () => (
  <>
    <AboutContainer>
      <Container>
        <Width1400>
          <Main>
            <TitleWrap>
              <h1>영상으로 연결된 세상</h1>
              <h1 className={"name"}>포사시</h1>
              <SubWrap>
                <p>“유튜브를 시작하고 싶은데 어떻게 해야 할지 모르겠어요”</p>
                <p>“기업 홍보영상을 제작하고 싶어요”</p>
                <p>“인터뷰 촬영, 교육영상 촬영을 하려고 해요”</p>
                <p>“개인 영상 촬영 편집 부탁드려요”</p>
                <p className={"point"}>
                  이런분들을 위해 저희 포사시는 “영상으로 연결된 세상”이라는
                  이념을 바탕으로 유튜브, 기업영상, 인터뷰 스케치 교육 등 다양한
                  영상을 제작하고 있습니다
                </p>
              </SubWrap>
            </TitleWrap>
          </Main>
        </Width1400>
      </Container>
    </AboutContainer>
    <Width1400>
      <Sub>
        <div className={"product"}>
          <div className={"product-image"}>
            <img
              src={process.env.PUBLIC_URL + "/posasi_5.jpg"}
              width={"100%"}
              style={{ borderRadius: 10 }}
              alt={"제작분유 이미지"}
            />
          </div>
          <div>
            <h2>제작분야</h2>
            <p className={"product-title"}>유튜브</p>
            <p>
              예능, 교육, 홍보 등 다양한 기업과 개인의 니즈에 맞추어 기획 촬영
              편집 최종 납품까지 진행하고 있습니다.
            </p>
            <p className={"product-title"}>기업영상</p>
            <p>
              기업에서 진행되는 행사 및 홍보에 관련된 모든 영상을 제작합니다.
              홍보영상, 기업행사 오프닝, 인터뷰 등의 영상을 제작하고 있습니다.
            </p>
            <p className={"product-title"}>인터뷰</p>
            <p>
              유튜브 혹은 사내홍보 영상 등에서 사용되는 영상을 촬영 편집하여
              제공합니다.
            </p>
            <p className={"product-title"}>기타</p>
            <p>
              행사 스케치 영상, 교육영상, 홍보영상 등 다양한 분야의 영상을
              기획부터 촬영 편집까지 진행하고 있습니다.
            </p>
          </div>
        </div>
        <BgTitle>POSASI</BgTitle>
        <div className={"process"}>
          <div>
            <h2>제작 프로세스</h2>
            <p className={"product-title"}>기획</p>
            <p>
              - 제작관련 미팅
              <br />
              - 클라이언트가 원하는 영상의 방향성을 확인
              <br />- 레퍼런스 및 기획서를 바탕으로 영상제작 방향 성립
            </p>
            <p className={"product-title"}>촬영</p>
            <p>
              - 촬영 장소 및 일정, 세부 일정 협의
              <br />
              - 2카메라 이상 동시녹화
              <br />- 짐벌, 드론 등 촬영 가능
            </p>
            <p className={"product-title"}>편집</p>
            <p>
              - TV예능 편집 기법 사용 (예능자막, 효과음, 배경음악)
              <br />- 납기 기한 확인 후 진행
            </p>
            <p className={"pr"}>
              네이버에서
              <strong>
                포사시 <BsSearch size={18} color={"#19ce60"} />
              </strong>
              를 검색하세요
            </p>
          </div>
          <div className={"process-image"}>
            <img
              src={process.env.PUBLIC_URL + "/posasi_3.jpg"}
              width={"100%"}
              style={{ borderRadius: 10 }}
              alt={"제작 프로세스 이미지"}
            />
            <img
              src={process.env.PUBLIC_URL + "/posasi_2.jpg"}
              width={"100%"}
              style={{ borderRadius: 10 }}
              alt={"제작 프로세스 이미지"}
            />
          </div>
        </div>
      </Sub>
    </Width1400>
  </>
);
export default About;

const BgTitle = styled.div`
  color: rgba(255, 255, 255, 0.1);
  font-size: 180px;
  font-weight: bold;
  position: absolute;
  top: 370px;
  left: -80px;

  @media screen and (max-width: ${ScreenSmall}) {
    font-size: 50px;
    top: 950px;
    left: auto;
    right: 16px;
  }
`;

const Sub = styled.div`
  position: relative;
  margin: 100px;
  color: #fff;

  @media screen and (max-width: ${ScreenSmall}) {
    margin: 16px;
  }

  & > div.product {
    display: flex;
    gap: 80px;

    & > div {
      flex: 1;

      & > h2 {
        color: ${pointColor};
        font-size: 24px;
      }
      & > p {
        line-height: 26px;
      }
      & > .product-title {
        display: inline-block;
        font-size: 18px;
        background-color: #333;
        padding: 5px 20px;
        border-radius: 10px;
        margin: 32px 0 16px;
      }
    }

    & > div.product-image {
      flex: 2;
      max-width: 640px;
    }

    @media screen and (max-width: ${ScreenSmall}) {
      flex-direction: column;
      gap: 30px;
    }
  }

  & > div.process {
    display: flex;
    justify-content: space-between;
    gap: 80px;
    margin-top: 160px;

    & > div {
      flex: 2;

      & > h2 {
        color: ${pointColor};
        font-size: 24px;
      }
      & > p {
        line-height: 26px;
      }
      & > .product-title {
        display: inline-block;
        font-size: 18px;
        background-color: #333;
        padding: 5px 20px;
        border-radius: 10px;
        margin: 32px 0 16px;
      }
      & > .pr {
        display: inline-block;
        width: 100%;
        font-size: 24px;
        margin-top: 60px;
        padding-top: 60px;
        border-top: 1px solid #222;

        & > strong {
          border: 6px solid #19ce60;
          padding: 5px 20px;
          margin: 0 16px;
        }

        @media screen and (max-width: ${ScreenSmall}) {
          font-size: 16px;
          padding-top: 30px;
          margin-top: 30px;
        }
      }
    }

    & > div.process-image {
      flex: 1.5;
      & > img {
        margin-bottom: 2px;
      }
    }

    @media screen and (max-width: ${ScreenSmall}) {
      flex-direction: column;
      gap: 30px;
    }
  }
`;

const SubWrap = styled.div`
  margin-top: 250px;
  line-height: 34px;

  & > p {
    text-shadow: 1px 1px 10px black;
    font-size: 18px;

    &.point {
      color: ${pointColor};
      margin-top: 20px;
      width: 49%;
    }
  }

  @media screen and (max-width: ${ScreenSmall}) {
    margin-top: 130px;

    & > p {
      text-shadow: 1px 1px 10px black;
      font-size: 16px;

      &.point {
        color: ${pointColor};
        margin-top: 180px;
        width: 100%;
      }
    }
  }
`;

const TitleWrap = styled.div`
  padding: 130px 100px;

  & > h1 {
    font-size: 64px;
    line-height: 100px;

    &.name {
      color: ${pointColor};
      font-size: 88px;
      font-weight: bold;
    }
  }

  @media screen and (max-width: ${ScreenSmall}) {
    padding: 50px 30px 0;

    & > h1 {
      font-size: 32px;
      line-height: 46px;

      &.name {
        color: ${pointColor};
        font-size: 42px;
        font-weight: bold;
      }
    }
  }
`;

const AboutContainer = styled.div`
  width: 100%;
  background-image: url(${process.env.PUBLIC_URL + '/posasi_1.jpg'});
  background-position: 72% 50%;
  background-size: cover;
  color: #fff;
`;

const Container = styled.article`
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5)
  );
`;

const Main = styled.div`
  width: 100%;
  height: 1000px;

  @media screen and (max-width: ${ScreenSmall}) {
    height: 800px;
  }
`;
