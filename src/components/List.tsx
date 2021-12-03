import { useContext, useCallback } from "react";
import { ctx } from "../store/main";
import { useState } from "react";
import { ctxType } from "./App";
import styled from "styled-components";
import Modal from "./Modal";
import STYLES from "../utils/styles";

export default function List() {
  const store = useContext(ctx) as ctxType;
  const [modalVis, setModalVis] = useState(false);

  const mapMeetings = useCallback(
    () =>
      Object.entries(store.meetings).map((element: any[]) => {
        const id = element[0];
        const meeting = element[1];

        if (!meeting?.title || !id) {
          store.setError(true);
          return <></>;
        }

        return (
          <li key={id}>
            <p>{meeting.title}</p>
            <div className="button-group">
              <button onClick={() => setModalVis(true)}>Details</button>
              <button onClick={store.setEditing.bind(null, { ...meeting, id })}>Edit</button>
            </div>

            {modalVis && <Modal {...meeting} onClose={() => setModalVis(false)} />}
          </li>
        );
      }),
    [store, modalVis]
  );

  return (
    <Wrapper>
      <ul>{store?.meetings ? mapMeetings() : store.setError(true)}</ul>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 10px;
  background-color: #fafafa;
  margin-inline: auto;
  width: 40%;
  height: 100vh;
  font-size: 1.4rem;
  font-weight: 400;

  ul {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #e6e6e6;
    padding-block: 5px;
    align-items: center;
  }

  .button-group {
    button {
      font-weight: 600;
      font-size: 0.8rem;
      box-shadow: ${STYLES.shadow};
      border-radius: 5px;
      width: 6rem;
      height: 3rem;
      margin-right: 20px;
    }
    button:hover {
      transform: scale(1.08);
    }
  }
`;
