import axios from "axios";
import { useState, useEffect } from "react";

const backend_url = import.meta.env.VITE_BACKEND_URL;

function Bracket() {
  const [playerList, setPlayerList] = useState([]);

  const start = true;

  useEffect(() => {
    axios
      .get(backend_url)
      .then((response) => {
        setPlayerList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Creates a seeding map
  const createSeedIndArr = (rounds) => {
    const iteration = rounds - 1;

    let seedArr = [0, 1];
    const growSeed = (seedArr) => {
      let pairNumber = seedArr.length * 2 - 1;
      let growingArr = [];
      seedArr.forEach((seed) => {
        growingArr.push(seed);
        growingArr.push(pairNumber - seed);
      });
      return growingArr;
    };
    for (let i = 0; i < iteration; i++) {
      seedArr = growSeed(seedArr);
    }

    return seedArr;
  };

  const sortPlayerKeys = (playersObj) => {
    let players = [];
    for (let i = 0; i < playersObj.length; i++) {
      players.push(playersObj[i]["name"]);
    }

    let filteredPlayers = players.filter((player) => player != "");
    let rounds = Math.ceil(Math.log2(filteredPlayers.length));
    let seedIndArr = createSeedIndArr(rounds);
    let eightGroup = (rounds - 2) * 8;
    while (filteredPlayers.length < eightGroup) {
      filteredPlayers.push("BYE");
    }

    const sortPlayerArr = (filteredPlayers, seedIndArr) => {
      let sortedPlayerArr = [];

      for (let i = 0; i < seedIndArr.length; i++) {
        sortedPlayerArr.push(filteredPlayers[seedIndArr[i]]);
      }
      return sortedPlayerArr;
    };

    let sortedPlayerArr = sortPlayerArr(filteredPlayers, seedIndArr);

    return sortedPlayerArr;
  };

  const roundProgression = [
    "Final",
    "Semifinal",
    "Quarterfinal",
    "Best 16",
    "Best 32",
    "Best 64",
    "Best 128",
    "Best 256",
  ];

  const createMatches = (sortedPlayerKeys, j) => {
    if (j === 0) {
      return sortedPlayerKeys.map((key, i) => {
        if (i % 2 === 0) {
          return (
            <li
              key={j + 1 * i + i * j}
              className={
                sortedPlayerKeys.length - 2 === i
                  ? "relative w-48"
                  : `relative mb-[40px] w-48`
              }
            >
              <div
                className={
                  (i + 2) % 4 !== 0
                    ? "p-2 bg-slate-500 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 after:h-[50px] after:-right-4 after:top-1/2"
                    : "p-2 bg-slate-500 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 after:h-[50px] after:-right-4 after:bottom-1/2"
                }
              >
                <div className="flex flex-col text-left">
                  <span className="text-slate-50 font-bold text-xs">{key}</span>
                  <span
                    className={
                      sortedPlayerKeys[i + 1] === "BYE"
                        ? "text-slate-300 text-xs italic"
                        : "text-slate-50 font-bold text-xs"
                    }
                  >
                    {sortedPlayerKeys[i + 1]}
                  </span>
                </div>
              </div>
            </li>
          );
        }
      });
    } else {
      let slots = sortedPlayerKeys.length / 2 / Math.pow(2, j);
      let matches = [];
      for (let n = 0; n < slots; n++) {
        matches.push(
          <li
            key={n}
            className={
              n !== slots - 1
                ? `relative ${
                    j === 1 ? "mb-[128px]" : j === 2 ? "mb-[304px]" : ""
                  }  w-48 before:absolute before:border-t-2 before:w-full before:-left-4 before:top-1/2 before:-z-10`
                : "relative w-48 mb-0 before:absolute before:border-t-2 before:w-full before:-left-4 before:top-1/2 before:-z-10"
            }
          >
            <div
              className={
                slots === 1
                  ? "p-2  bg-slate-500"
                  : (n + 1) % 2 !== 0
                  ? `p-2  bg-slate-500 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 ${
                      j === 1
                        ? "after:h-[100px]"
                        : j === 2
                        ? "after:h-[200px]"
                        : ""
                    } after:-right-4 after:top-1/2`
                  : `p-2  bg-slate-500 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 ${
                      j === 1
                        ? "after:h-[100px]"
                        : j === 2
                        ? "after:h-[200px]"
                        : ""
                    } after:-right-4 after:bottom-1/2`
              }
            >
              <div className="flex flex-col text-left">
                <span className="text-black text-xs">-</span>
                <span className="text-black text-xs">-</span>
              </div>
            </div>
          </li>
        );
      }
      return matches;
    }
  };
  const createRounds = (sortedPlayerKeys) => {
    // if (sortedPlayerKeys[1]) {
    let rounds = Math.ceil(Math.log2(sortedPlayerKeys.length));
    let roundTitles = [];
    for (let j = 0; j < rounds; j++) {
      roundTitles.push(roundProgression[j]);
    }
    return roundTitles.map((title, j) => {
      return (
        <div key={j} className="text-center">
          <h3 className="text-sm mb-4">{roundTitles[j]}</h3>
          <div className="flex flex-col justify-center h-full">
            <ul className="relative">
              {createMatches(sortedPlayerKeys, j, rounds)}
            </ul>
          </div>
        </div>
      );
    });
    // } else {
    //   return <span className="text-sm">Please add players</span>;
    // }
  };

  const createBracket = (players) => {
    // const playerKeys = getPlayerKeys(players);
    const sortedPlayerKeys = sortPlayerKeys(players);
    const matches = createRounds(sortedPlayerKeys);
    return matches;
  };
  if (start) {
    return (
      <section className="w-full">
        <h1 className="mb-6 text-lg">Tournament Bracket</h1>
        <div className="flex w-full gap-8">{createBracket(playerList)}</div>
      </section>
    );
  }
}

export default Bracket;
