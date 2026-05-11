import styled from "@emotion/styled";
import { pointColor, Width1400 } from "../components/Common";
import { useState } from "react";
import {
  BsFillBriefcaseFill,
  BsFillCameraReelsFill,
  BsFillChatLeftQuoteFill,
  BsFillCollectionPlayFill,
  BsFilm,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { categories, works } from "../workData";

const Edit = () => {
  const [type, setType] = useState("전체");
  const items =
    type === "전체" ? works : works.filter((item) => item.category === type);

  const onClickType = (event) => {
    const {
      target: { value },
    } = event;
    setType(value);

    window.scrollTo(0, 0);
  };

  return (
    <Width1400
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 20,
      }}
    >
      <Category>
        <Wrap>
          {categories && (
            <>
              {categories.map((data) => (
                <CategoryItem key={data.id}>
                  <Label
                    htmlFor={data.id}
                    primary={type === data.name && "primary"}
                  >
                    <Ico>
                      {data.name === "전체" && (
                        <BsFillCameraReelsFill size={16} title={data.name} />
                      )}
                      {data.name === "유튜브영상" && (
                        <BsFillCollectionPlayFill size={16} title={data.name} />
                      )}
                      {data.name === "기업영상" && (
                        <BsFillBriefcaseFill size={16} title={data.name} />
                      )}
                      {data.name === "인터뷰영상" && (
                        <BsFillChatLeftQuoteFill size={16} title={data.name} />
                      )}
                      {data.name === "그 외" && (
                        <BsFilm size={16} title={data.name} />
                      )}
                    </Ico>
                    {data.name}
                  </Label>
                  <Input
                    id={data.id}
                    type="button"
                    value={data.name}
                    onClick={onClickType}
                  />
                </CategoryItem>
              ))}
            </>
          )}
        </Wrap>
      </Category>
      <Container>
        {items && (
          <>
            <TypeTitle>{type}</TypeTitle>
            {items.map((item, index) => (
              <Item key={item.id} itemObj={item}>
                <Link
                  to={{
                    pathname: `/write-edit/${item.id}`,
                    state: { itemObj: item },
                  }}
                >
                  <Image>
                    {item.imageSrc && (
                      <img
                        src={item.imageSrc}
                        width={"100%"}
                        alt={item.title || ""}
                        style={{ borderRadius: 10 }}
                      />
                    )}
                  </Image>
                  <Title className={"order"}>
                    <span className={"title"}>정렬순서</span> {index + 1}
                  </Title>
                  <Title className={"title"}>{item.title}</Title>
                </Link>
              </Item>
            ))}
          </>
        )}
      </Container>
    </Width1400>
  );
};
export default Edit;

const Container = styled.article`
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 40px 0;
  gap: 1%;
`;

const TypeTitle = styled.h2`
  width: 100%;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: bold;
  color: white;
`;

const Item = styled.div`
  width: 100%;
  margin-bottom: 1%;

  & > a {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    & > .order {
      color: #f1fc56;
      text-align: center;
      border: 1px solid #aaa;
      padding: 20px;
      margin-right: 20px;

      & > .title {
        display: block;
        margin-bottom: 16px;
        font-size: 12px;
        color: #aaa;
      }
    }
  }
`;

const Image = styled.span`
  width: 15%;
  margin-right: 20px;
`;

const Title = styled.span`
  color: white;
  border-radius: 10px;
  font-size: 16px;
`;

const Category = styled.div`
  flex: 1;
  width: 100%;
`;

const Wrap = styled.div`
  padding: 45px 0;
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: #fff;
  border-left: 1px solid #222;
  border-right: 1px solid #222;
  font-size: 14px;
`;

const CategoryItem = styled.div`
  text-indent: 30px;
`;

const Label = styled.label`
  color: ${(props) => (props.primary ? pointColor : "white")};
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const Ico = styled.span`
  margin-right: 14px;
  vertical-align: middle;
`;
