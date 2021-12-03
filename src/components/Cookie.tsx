import ReactDom from "react-dom";
import styled from "styled-components";

interface props {
  onClick: () => void;
}

function Cookie(props: props) {
  return ReactDom.createPortal(
    <Wrapper>
      <p>
        This site uses cookies to provide necessary website functionality,
        improve your experience and analyze our traffic. By using our website,
        you agree to our Privacy Policy and our cookies usage.
      </p>
      <button onClick={props.onClick}>Ok</button>
    </Wrapper>,
    document.getElementById("portal") as HTMLDivElement
  );
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  width: 100vw;
  padding: 0.1rem 20rem;
  z-index: 1000;
  background-color: white;
  border-top: 2px solid #f3f3f3;
  display: flex;
  justify-items: space-between;
  align-items: center;
  p {
    width: 1000px;
  }
  button {
    border: 0;
    color: white;
    box-shadow: 1rem 1rem 1rem #1a1a1a53;
    padding: 0.8rem 1.3rem;
    font-family: "open sans";
    font-weight: 600;
    background-color: #048464;
    border-radius: 5px;
    font-size: 1rem;
    transition: all 0.2s;
  }
  button:hover {
    background-color: #024e3b;
    text-decoration: underline;
  }
`;

export default Cookie;
