import List from "./List";
import { ctx } from "../store/main";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Error from "./Error";

export interface meetingType {
  title: string;
  id: string;
  platform: string;
  date: string;
  participants: number;
  description: string;
  time: string;
}

export interface ctxType {
  meetings: meetingType[];
  error: boolean;
  setError: (state: any) => {};
}

function App() {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await axios.get(
      "https://problem-fb593-default-rtdb.firebaseio.com/meetings.json?print=pretty"
    );

    if (res?.data || res?.status === 200) {
      return res.data;
    }

    return undefined;
  }, []);

  useEffect(() => {
    fetchData().then((data) => {
      if (!data) {
        setError(true);
      }
      setMeetings(data);
    });
  }, [fetchData]);

  return (
    <div className="App">
      <ctx.Provider
        value={{
          meetings,
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
        }}
      >
        <List />
        {error && <Error />}

      </ctx.Provider>
    </div>
  );
}

export default App;
