import { ctx } from "../store/main";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Error from "./Error";
import Cookie from "./Cookie";
import Form from "./Form";
import List from "./List";
import LoadingIndicator from "./LoadingIndicator";

export interface meetingType {
  title: string;
  platform: string;
  date: string;
  participants: number;
  description: string;
  time: string;
}

export interface ctxType {
  error: boolean;
  setError: (state: any) => {};
  meetings: {
    [key: string]: meetingType;
  };
  editing: {
    id: string;
  } & meetingType;
  setEditing: (state: any) => {};
  setReload: (state: boolean) => {};
}

function App() {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(false);
  const [editing, setEditing] = useState("");
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);

    const res = await axios.get(
      "https://problem-fb593-default-rtdb.firebaseio.com/meetings.json?print=pretty"
    );

    setLoading(false);

    if (res?.status === 200) return res.data;
    return undefined;
  }, []);

  useEffect(() => {
    if (reload === true) {
      fetchData().then((data) => {
        if (!data) setError(true);
        else setMeetings(data);
      });
      setReload(false);
    }
  }, [fetchData, reload]);

  const store = {
    meetings,
    editing,
    error,
    setError: (state: boolean) => {
      if (state === false) {
        setErrorDismissed(true);
        setError(false);
        return;
      }

      if (errorDismissed === false) {
        setError(true);
      }
    },
    setEditing,
    setReload,
  };

  return (
    <div className="App">
      <ctx.Provider value={store}>
        <Form />
        <List />
        {error && <Error />}
        {loading && <LoadingIndicator />}
        {!cookieConsent && (
          <Cookie onClick={setCookieConsent.bind(null, true)} />
        )}
      </ctx.Provider>
    </div>
  );
}

export default App;
