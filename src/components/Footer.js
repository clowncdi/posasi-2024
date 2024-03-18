import styled from "@emotion/styled";

const Footer = () => {
  return (
    <FooterWrap>
      <span>대표: 공영환</span>
      <span>주소: 경기도 군포시 당동 1033-2</span>
      {/* <span style={{ fontSize: 16 }}>전화: 010-3409-0409</span> */}
      Copyright &copy; {new Date().getFullYear()} Posasi
    </FooterWrap>
  );
};

export default Footer;

const FooterWrap = styled.footer`
  width: 100%;
  line-height: 60px;
  border-top: 1px solid #333;
  color: #666;
  text-align: center;
  font-size: 12px;
  & > span {
    display: block;
    height: 22px;
    color: #aaa;
    line-height: 50px;
  }
`;
