// Lessons:
// If you use uuid, during re-render it will create a new key, re-rendering any elements that contain the key

import { useState } from "react";
import "./App.css";
import Bracket from "./components/Bracket/Bracket";

function App() {
  const [eightGroup, setEightGroup] = useState(1);
  const [start, setStart] = useState(false);
  const [values, setValues] = useState({
    P1: "",
    P2: "",
    P3: "",
    P4: "",
    P5: "",
    P6: "",
    P7: "",
    P8: "",
  });
  const players = Object.keys(values);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const startTournament = (e) => {
    e.preventDefault();
    setStart(true);
  };

  return (
    <section>
      {!start && (
        <section>
          <h1 className="mb-8">Start Your Tournament</h1>
          <div className="text-left">
            <form className="mb-16" onSubmit={startTournament}>
              <h2 className="text-xl font-bold mb-6">Participants</h2>
              <div className="flex flex-col w-1/2 mb-2">
                {players.map((player) => (
                  <label className="mb-3 flex justify-between" key={player}>
                    {player}
                    <input
                      className="mx-3 rounded-md py-1 px-3"
                      placeholder="Add a name"
                      name={player}
                      onChange={handleInputChange}
                      value={values[player]}
                    />
                  </label>
                ))}
              </div>
              <button>Start Tournament</button>
            </form>
          </div>
        </section>
      )}
      {start && <Bracket players={values} />}
    </section>
  );
}

export default App;
