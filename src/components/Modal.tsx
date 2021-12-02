import ReactDom from "react-dom";
import styled from "styled-components";
import { meetingType } from "./App";
import icon from '../icons/close.svg'

interface props {
  onClose: () => void;
}

function Modal(props: Omit<meetingType, "id"> & props) {

  return ReactDom.createPortal(
    <Wrapper>
      <div className="backdrop" />
      <div className="modal">
        <button onClick={props.onClose}>
          <img src={icon} />
        </button>
        <div>
          <div>
            <p>Title:</p>
            <h3>{props.title}</h3>
          </div>
          <div>
            <p>Platform:</p>
            <h3>{props.platform}</h3>
          </div>
          <div>
            <p>Date:</p>
            <h3>{props.date}</h3>
          </div>
          <div>
            <p>Participants</p>
            <h3>{props.participants}</h3>
          </div>
          <div>
            <p>Time</p>
            <h3>{props.time}</h3>
          </div>
        </div>
        <div>
          <div>
            <p>Description: </p>
            <h3 className="description">{props.description}</h3>
          </div>
        </div>
      </div>
    </Wrapper>,
    document.getElementById("portal") as HTMLDivElement
  );
}

const Wrapper = styled.div`
  .backdrop {
    display: fixed;
    position: absolute;
    inset: 0;
    z-index: 1;
    backdrop-filter: blur(5px);
    background-color: #0000003e;
  }

  .modal {
    display: flex;
    position: fixed;
    justify-content: space-between;
    z-index: 2;
    width: 900px;
    height: 500px;
    background-color: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 80px;
    border-radius: 10px;
    box-shadow: 2rem 2rem 2rem #0000001f;

    button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      border: 0;
      background-color: transparent;
      img {
        width: 45px;
        height: 45px;
      }
    }

    button:hover{
      cursor: pointer;

    }


     > div {
      display: flex;
      flex-direction: column;

      gap: 2.5rem;

      .description {
        font-weight: 500;
        font-size: 1.2rem;
        max-width: 600px;
      }
    }

    p {
      margin: 0;
      font-family: "Open Sans";
      font-weight: 400;
      color: #5e5e5e;
      font-size: 1.2rem;
    }

    h3 {
      margin: 0;
      font-family: "Open Sans";
      font-weight: 400;
      font-size: 1.8rem;
    }
  }
`;

export default Modal;
