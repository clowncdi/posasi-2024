import styled from "@emotion/styled";
import {
  pointColor,
  Width1400,
  ScreenSmall,
  ScreenMedium,
} from "../components/Common";
import { useEffect, useState } from "react";
import {
  BsFillBriefcaseFill,
  BsFillCameraReelsFill,
  BsFillChatLeftQuoteFill,
  BsFillCollectionPlayFill,
  BsFilm,
} from "react-icons/bs";
import { db } from "../firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

const Works = () => {
  const [category, setCategory] = useState([]);
  const [type, setType] = useState("전체");
  const [items, setItems] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getItems(type);
  }, [type]);

  const getCategory = async () => {
    const categoryRef = collection(db, "category");
    const q = await query(categoryRef, orderBy("id"));
    const data = await getDocs(q);
    const newData = data.docs.map((doc) => ({
      ...doc.data(),
    }));
    setCategory(newData);
  };

  const getItems = async (type) => {
    const worksRef = collection(db, "works");
    let q;
    if (type === "전체") {
      q = await query(worksRef, orderBy("order"));
    } else {
      q = await query(
        worksRef,
        where("category", "==", type),
        orderBy("order")
      );
    }
    const data = await getDocs(q);
    const newData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(newData);
  };

  const onClickType = (event) => {
    const {
      target: { value },
    } = event;
    setType(value);

    window.scrollTo(0, 0);
  };

  return (
    <WorksContainer>
      <Category>
        <Wrap>
          {category && (
            <>
              {category.map((data) => (
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
            {items.map((item) => (
              <Item key={item.createdAt}>
                <a href={item.link} target="_blank" rel="noreferrer">
                  <Title className={"title"}>{item.title}</Title>
                  <span>
                    <img
                      src={
                        item.attachmentUrl === ""
                          ? process.env.PUBLIC_URL + "/default_img.jpg"
                          : item.attachmentUrl
                      }
                      width={"100%"}
                      height={"100%"}
                      alt={item.title}
                      style={{ borderRadius: 10 }}
                    />
                  </span>
                </a>
              </Item>
            ))}
          </>
        )}
      </Container>
    </WorksContainer>
  );
};
export default Works;

const WorksContainer = styled(Width1400)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media screen and (max-width: ${ScreenMedium}) {
    flex-direction: column;
  }
`;

const Container = styled.article`
  flex: 6;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 40px 0;
  gap: 1%;
  @media screen and (max-width: ${ScreenMedium}) {
    padding: 0 4%;
  }
`;

const TypeTitle = styled.h2`
  width: 100%;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: bold;
  color: white;
`;

const Item = styled.div`
  position: relative;
  max-width: 386px;
  flex-grow: 1;
  flex-shrink: 0;
  margin-bottom: 1%;

  &:hover > a > .title {
    display: block;
  }
  @media screen and (max-width: ${ScreenSmall}) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

const Title = styled.span`
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  color: white;
  padding: 32px 0;
  text-indent: 32px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.85);
  width: 100%;
  font-size: 16px;
  @media screen and (max-width: ${ScreenSmall}) {
    display: block;
    position: relative;
    padding: 0;
    text-indent: 0;
    background: none;
    margin-bottom: 10px;
  }
`;

const Category = styled.div`
  flex: 1;
  width: 100%;
`;

const Wrap = styled.div`
  padding: 45px 0;
  height: calc(100% - 90px);
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: #fff;
  border-left: 1px solid #222;
  border-right: 1px solid #222;
  font-size: 14px;
  @media screen and (max-width: ${ScreenMedium}) {
    flex-direction: row;
    gap: 5px;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 20px 0;
  }
  @media screen and (max-width: ${ScreenSmall}) {
    & > div > label:first-child {
      font-size: 0;
    }
  }
`;

const CategoryItem = styled.div`
  text-indent: 30px;

  @media screen and (max-width: ${ScreenSmall}) {
    text-indent: 0;
    width: 24px;

    & > label > span > svg {
      width: 20px;
      height: 20px;
    }
  }
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
