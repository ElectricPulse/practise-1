import styled from "styled-components";
import { useCallback, useContext, useRef } from "react";
import Input from "./Input";
import axios from "axios";
import { ctxType } from "./App";
import { ctx } from "../store/main";
import parseRef from "../utils/parseRef";

function Form() {
  const formRef = useRef<HTMLFormElement>();
  const store = useContext(ctx) as ctxType;
  const refs = useRef<{
    [key: string]: React.RefObject<HTMLInputElement>;
  }>({});

  const submit = useCallback(() => {
    const data: { [key: string]: unknown } = {};

    Object.entries(refs.current).forEach((props) => {
      const title = props[0];
      const ref = props[1] as React.RefObject<HTMLInputElement>;
      const value = parseRef(ref);
      if (value) data[title] = value;
      else store.setError(true);
    });

    const formEl = formRef.current;

    if (formEl) {
      formEl.reset();
    }

    const url = `https://problem-fb593-default-rtdb.firebaseio.com/meetings${
      store.editing?.id ? "/" + store.editing.id : ""
    }.json`;

    const res = axios({
      method: store.editing?.id ? "put" : "post",
      url,
      data,
    });

    res.then(() => {
      store.setEditing({});
      store.setReload(true);
      const activeElement = document.activeElement as any;
      if (activeElement) activeElement.blur();
    });
  }, [refs, store]);

  return (
    <Wrapper ref={formRef as any}>
      <h2>{store.editing.id ? `Editing: ${store.editing.title}` : "Create new meeting"}</h2>
      <div className="inputs">
        <Input name="title" value={store.editing.title || undefined} type="text" refs={refs} />
        <Input name="date" value={store.editing.date || undefined} type="date" refs={refs} />
        <Input name="participants" value={store.editing.participants || undefined} type="number" refs={refs} />
        <Input name="time" type="time" value={store.editing.time || undefined} refs={refs} />
        <Input name="platform" type="text" value={store.editing.platform || undefined} refs={refs} />
        <Input name="description" type="text" value={store.editing.description || undefined} refs={refs} />
      </div>
      <button onClick={submit} className="submit">
        Submit
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.form`
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
    transition: 0.2s all;
  }

  .submit:hover {
    background-color: #024937;
  }
`;

export default Form;
