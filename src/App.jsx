// Lessons:
// If you use uuid, during re-render it will create a new key, re-rendering any elements that contain the key

import { useState } from "react";
// import "./App.css";
import Bracket from "./components/Bracket/Bracket";

function ParticipantNames({ setShowBracket, setPlayers }) {
  const [values, setValues] = useState({
    val: ["", "", "", "", "", "", "", ""],
  });

  function createInputs() {
    let inputs = [];
    for (let j = 0; j < values.val.length / 8; j++) {
      inputs.push(
        <div className="mr-6" key={j}>
          {values.val.slice(values.val.length - 8).map((el, i) => (
            <div key={(j + 1) * (i + 1)}>
              <label className="mb-3 text-sm w-[240px] flex justify-between items-center">
                P{j * 8 + i + 1}
                <input
                  placeholder="Add a name"
                  className="mx-3 rounded-md py-1 px-3 text-sm"
                  type="text"
                  name={`P${j * 8 + i + 1}`}
                  value={values.val[j * 8 + i] || ""}
                  onChange={(event) => handleChange(event, j * 8 + i)}
                />
              </label>
            </div>
          ))}
        </div>
      );
    }
    return inputs;
  }

  const handleChange = (event, i) => {
    let vals = [...values.val];
    vals[i] = event.target.value;
    setValues({ val: vals });
  };

  const addClick = () => {
    setValues({ val: [...values.val, "", "", "", "", "", "", "", ""] });
  };

  const showBracket = (e) => {
    e.preventDefault();
    setShowBracket(true);
    setPlayers(values.val);
  };

  return (
    <section className="mb-16">
      <form onSubmit={showBracket}>
        <div className="mb-4 flex">
          <div className="flex flex-row">{createInputs()}</div>
          <div>
            <button
              className={`bg-slate-200 text-black py-1 px-1 text-xs rounded-md hover:bg-slate-300 ease-in duration-150 cursor-pointer w-28 ${
                values.val.length >= 32 ? "hidden" : ""
              }`}
              type="button"
              onClick={addClick}
            >
              More Players
            </button>
          </div>
        </div>
        <button
          className="text-sm py-2 px-3 rounded-md bg-slate-500 hover:bg-slate-600 ease-in duration-150 border-0"
          type="submit"
        >
          Build Bracket
        </button>
      </form>
    </section>
  );
}

function App() {
  const [start, setShowBracket] = useState(false);
  const [players, setPlayers] = useState([]);
  console.log(players);

  return (
    <main className="m-16">
      <section className="mx-auto max-w-7xl ">
        <section className="">
          <h1 className="text-lg mb-6">Start Your Tournament</h1>
        </section>
        <ParticipantNames
          setShowBracket={setShowBracket}
          setPlayers={setPlayers}
        />
        <Bracket players={players} start={start} />
      </section>
    </main>
  );
}

export default App;

//  <div className="text-left">
//    <form className="mb-16" onSubmit={startTournament}>
//      <h2 className="text-md font-bold mb-2">Participants</h2>
//      <div className="flex flex-col mb-2">
//        {players.map((player) => (
//          <label
//            className="mb-3 text-sm w-[240px] flex justify-between items-center"
//            key={player}
//          >
//            {player}
//            <input
//              className="mx-3 rounded-md py-1 px-3 text-sm"
//              placeholder="Add a name"
//              name={player}
//              onChange={handleInputChange}
//              value={values[player]}
//            />
//          </label>
//        ))}
//      </div>
//      <button className="text-sm">Build Bracket</button>
//    </form>
//  </div>;
