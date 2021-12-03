import styled from "styled-components";

function LoadingIndicator() {
  return (
    <Wrapper>
      <div className="ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .ring {
    display: inline-block;
    position: fixed;
    z-index: 5000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
  }
  .ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 184px;
    height: 184px;
    margin: 8px;
    border: 15px solid #535353;
    border-radius: 50%;
    animation: lds-ring 0.8s infinite;
    border-color: #363636 transparent transparent transparent;
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.5s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingIndicator;
