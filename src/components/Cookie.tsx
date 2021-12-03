import ReactDom from "react-dom";
import styled from "styled-components";
import STYLES from "../utils/styles";

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
  display: flex;
  position: fixed;
  justify-items: space-between;
  align-items: center;
  bottom: 0;
  width: 100vw;
  padding: 0.1rem 20rem;
  background-color: white;
  border-top: 2px solid #f3f3f3;
  z-index: 1000;

  p {
    max-width: 70rem;
  }

  button {
    color: white;
    box-shadow: ${STYLES.shadow};
    padding: 0.8rem 1.3rem;
    font-weight: 600;
    background-color: ${STYLES.primary};
    border-radius: 5px;
    font-size: 1rem;
    transition: all 0.2s;
  }
  button:hover {
    background-color: ${STYLES.primaryDark};
    text-decoration: underline;
  }
`;

export default Cookie;
