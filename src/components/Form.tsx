import styled from "styled-components";
import { useCallback, useContext, useRef } from "react";
import Input from "./Input";
import id from "../helpers/id";
import axios from "axios";
import { ctxType } from "./App";
import { ctx } from "../store/main";
interface ref {
  current: {
    value: any;
  };
}

function Form() {
  const store = useContext(ctx) as ctxType;
  const titleRef = useRef() as ref;
  const dateRef = useRef() as ref;
  const participantsRef = useRef() as ref;
  const timeRef = useRef() as ref;
  const platformRef = useRef() as ref;
  const descriptionRef = useRef() as ref;

  const submit = useCallback(() => {
    const data = {
      title: titleRef.current.value,
      date: dateRef.current.value,
      participants: participantsRef.current.value,
      time: timeRef.current.value,
      platform: platformRef.current.value,
      description: descriptionRef.current.value,
      id: id(),
    };
    if (store.editing.id) {
      const res = axios({
        method: "put",
        url: `https://problem-fb593-default-rtdb.firebaseio.com/meetings/${store.editing.id}.json`,
        data,
      });
      res.then(() => {
        store.setEditing({});
        store.setReload(true);
      });
    } else {
      const res = axios({
        method: "post",
        url: "https://problem-fb593-default-rtdb.firebaseio.com/meetings.json",
        data,
      });

      res.then(() => {
        store.setReload(true);
      });
    }
  }, [
    titleRef,
    dateRef,
    participantsRef,
    timeRef,
    platformRef,
    descriptionRef,
    store,
  ]);

  if (store.editing.id) {
    return (
      <Wrapper>
        <h2>Editing: {store.editing.title}</h2>
        <div className="inputs">
          <Input
            value={store.editing.title}
            name="Title"
            type="text"
            ref={titleRef}
          />
          <Input
            value={store.editing.date}
            name="Date"
            type="date"
            ref={dateRef}
          />
          <Input
            value={store.editing.participants}
            name="Participants"
            type="number"
            ref={participantsRef}
          />
          <Input
            value={store.editing.time}
            name="Time"
            type="time"
            ref={timeRef}
          />
          <Input
            value={store.editing.platform}
            name="Platform"
            type="text"
            ref={platformRef}
          />
          <Input
            value={store.editing.description}
            name="Description"
            type="text"
            ref={descriptionRef}
          />
        </div>
        <button onClick={submit} className="submit">
          Submit
        </button>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h2>Create new meeting</h2>
      <div className="inputs">
        <Input name="Title" type="text" ref={titleRef} />
        <Input name="Date" type="date" ref={dateRef} />
        <Input name="Participants" type="number" ref={participantsRef} />
        <Input name="Time" type="time" ref={timeRef} />
        <Input name="Platform" type="text" ref={platformRef} />
        <Input name="Description" type="text" ref={descriptionRef} />
      </div>
      <button onClick={submit} className="submit">
        Submit
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 40%;
  padding: 0.5rem 2rem;
  border: 2px solid #309c51;
  display: block;
  margin-inline: auto;
  font-family: "Open Sans";
  .inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 400;
    color: #4b4b4b;
    padding-bottom: 8px;
    border-bottom: 2px solid #d1d1d1;
  }

  .submit {
    margin-top: 1.5rem;
    width: 100%;
    padding-block: 0.8rem;
    font-size: 1.3rem;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    background-color: #048464;
    border: none;
  }

  .submit {
    background-color: #024937;
  }
`;

export default Form;
