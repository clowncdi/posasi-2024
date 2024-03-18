import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AiFillPicture, AiOutlineClose } from "react-icons/ai";
import { Width1400 } from "../components/Common";
import styled from "@emotion/styled";
import {
  updateDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  deleteDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const WriteEdit = ({ user }) => {
  const id_index = window.location.href.lastIndexOf("/");
  const itemId = window.location.href.substring(id_index + 1);

  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState({});

  const [title, setTitle] = useState("");
  const [order, setOrder] = useState();
  const [link, setLink] = useState("");
  const [type, setType] = useState("");
  const [text, setText] = useState("");

  const [attachment, setAttachment] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    getCategory();
    getItem();
  }, []);

  const getItem = async () => {
    const worksRef = doc(db, "works", itemId);
    const itemSnap = await getDoc(worksRef);
    const item = itemSnap.data();
    console.log(item);
    setTitle(item.title);
    setOrder(item.order);
    setLink(item.link);
    setType(item.category);
    setText(item.text);
    setFileName(item.fileName);
    setAttachment(item.attachmentUrl);
    setPreviewURL(item.attachmentUrl);
  };

  useEffect(() => {
    if (attachment !== "") {
      setPreview(
        <img className="img_preview" src={previewURL} alt="preview image" />
      );
    }
  }, [attachment, previewURL]);

  const getCategory = async () => {
    const categoryRef = collection(db, "category");
    const q = await query(categoryRef, orderBy("id"));
    const data = await getDocs(q);
    const newData = data.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
    setCategory(newData);
  };

  const onTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setType(value);
  };
  const onTitleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(value);
  };
  const onOrderChange = (event) => {
    const {
      target: { value },
    } = event;
    setOrder(value);
  };
  const onLinkChange = (event) => {
    const {
      target: { value },
    } = event;
    setLink(value);
  };

  const onSubmit = async (event) => {
    if (item === "") {
      return alert("수정할 내용이 없습니다.");
    }
    if (order < 0) {
      return alert("정렬 숫자는 0 초과만 가능합니다.");
    }
    event.preventDefault();
    const itemObj = {
      category: type,
      title: title,
      order: order,
      link: link,
      text: text,
      createdAt: new Date(),
      creatorId: user.uid,
      attachmentUrl: attachment,
      fileName: fileName,
    };
    try {
      const workDoc = doc(db, "works", itemId);
      await updateDoc(workDoc, itemObj);
      alert(`👍 수정 완료! 글 ID: ${itemId}`);
      navigate("/");
    } catch (e) {
      console.log(`Error adding document: ${e}`);
      alert(`😢 수정 실패: ${JSON.stringify(e)}`);
    }
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);

      saveToFirebaseStorage(file);
    };
    if (file) reader.readAsDataURL(file);
  };
  //upload
  const saveToFirebaseStorage = (file) => {
    const uniqueKey = new Date().getTime();
    const newName = file.name
      .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
      .split(" ")
      .join("");

    const metaData = {
      contentType: file.type,
    };

    const fileName = `${uniqueKey}_${newName}`;
    setFileName(fileName);
    const storageRef = ref(storage, `images/${fileName}`);
    const UploadTask = uploadBytesResumable(storageRef, file, metaData);
    UploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        alert(`error: image upload error ${JSON.stringify(error)}`);
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref).then((downloadUrl) => {
          setAttachment(downloadUrl);
          console.log(`완료 url: ${downloadUrl}`);
        });
      }
    );
  };
  const deleteFile = () => {
    const desertRef = ref(storage, `images/${fileName}`);
    deleteObject(desertRef)
      .then(() => {
        alert(`👍 파일 삭제 완료!`);
      })
      .catch((e) => {
        alert(`😢 파일 삭제 실패! ${e}`);
      });
    setAttachment("");
  };

  const deleteItem = async () => {
    const desertRef = ref(storage, `images/${fileName}`);
    deleteObject(desertRef);
    const docRef = await doc(collection(db, "works"), itemId);
    try {
      await deleteDoc(docRef);
      alert(`👍 삭제 완료!`);
    } catch (e) {
      alert(`😢 삭제 실패 ${e}`);
    }
    navigate("/");
  };

  return (
    <Width1400>
      {title && (
        <Form onSubmit={onSubmit}>
          <div>
            <EditorTitle>
              <div className={"title_wrap"}>
                {category && (
                  <CategorySelect value={type} onChange={onTypeChange}>
                    {category
                      .filter((data) => data.name !== "전체")
                      .map((data) => (
                        <option key={data.id} value={data.name}>
                          {data.name}
                        </option>
                      ))}
                  </CategorySelect>
                )}
                <label htmlFor="title" style={{ color: "white" }}>
                  제목
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={onTitleChange}
                  type="text"
                  className={"title"}
                />
              </div>
              <div className={"title_wrap"}>
                <label htmlFor="title" style={{ color: "white" }}>
                  정렬
                </label>
                <input
                  value={order}
                  onChange={onOrderChange}
                  type="number"
                  className={"order"}
                />
                <label htmlFor="link" style={{ color: "white" }}>
                  링크
                </label>
                <input
                  id="link"
                  value={link}
                  onChange={onLinkChange}
                  type="text"
                  className={"link"}
                />
              </div>
            </EditorTitle>
            <Editor>
              {text && (
                <CKEditor
                  editor={ClassicEditor}
                  data={text}
                  onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setText(data);
                  }}
                />
              )}
            </Editor>
            <Div>
              <input
                id="item-submit"
                type="submit"
                value="&rarr;"
                style={{ opacity: 0, display: "none" }}
              />
              <Label htmlFor="item-submit">수정</Label>
              <input
                id="item-delete"
                onClick={deleteItem}
                type="button"
                value="&rarr;"
                style={{ opacity: 0, display: "none" }}
              />
              <Label htmlFor="item-delete" style={{ marginLeft: 20 }}>
                삭제
              </Label>
            </Div>
          </div>
          <Div>
            <Label htmlFor="attach-file" className="factoryInput__label">
              <Ico>
                <AiFillPicture size={"32px"} title={"Thumbnail image upload"} />
              </Ico>
              <span>썸네일 이미지 첨부</span>
            </Label>
            <input
              ref={fileRef}
              id="attach-file"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              hidden={true}
            />
            {attachment && (
              <Div>
                {preview}
                <DeleteImage onClick={deleteFile}>
                  <Ico>
                    <AiOutlineClose
                      size={"24px"}
                      title={"Thumbnail image delete"}
                    />
                  </Ico>
                  <span>삭제</span>
                </DeleteImage>
              </Div>
            )}
          </Div>
        </Form>
      )}
    </Width1400>
  );
};
export default WriteEdit;

const Form = styled.form`
  width: 800px;
  margin: 30px auto;
`;

const Div = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
`;

const DeleteImage = styled.div`
  position: absolute;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  top: 0;
  right: 50px;
  background: linear-gradient(
    0deg,
    rgba(100, 100, 100, 1) 0%,
    rgba(255, 255, 255, 1) 70%
  );
  border-radius: 99px;
  & > span {
    margin-top: -3px;
  }
`;

const CategorySelect = styled.select`
  margin: 20px 10px 0 0;
  padding: 8px 24px;
  border-radius: 5px;
  font-size: 16px;
`;

const Label = styled.label`
  display: inline-block;
  margin: 20px auto;
  padding: 16px 30px;
  border-radius: 99px;
  background: linear-gradient(
    0deg,
    rgba(100, 100, 100, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const Ico = styled.span`
  margin-right: 10px;
  vertical-align: middle;
`;

const EditorTitle = styled.div`
  width: 100%;
  margin-bottom: 30px;

  & > .title_wrap {
    width: 100%;
    margin: 10px auto;
  }
  & > .title_wrap > .title {
    width: 74%;
    height: 32px;
    border-radius: 5px;
    margin: 0 0 10px 10px;
    text-indent: 10px;
  }
  & > .title_wrap > .order {
    width: 12%;
    height: 32px;
    border-radius: 5px;
    margin: 0 10px;
    text-indent: 10px;
  }
  & > .title_wrap > .link {
    width: 74%;
    height: 32px;
    border-radius: 5px;
    margin-left: 10px;
    text-indent: 10px;
  }
`;

const Editor = styled.div`
  & > .ck-editor__editable[role="textbox"] {
    /* editing area */
    min-height: 200px;
  }
  & > .ck-content .image {
    /* block images */
    max-width: 80%;
    margin: 20px auto;
  }
`;
