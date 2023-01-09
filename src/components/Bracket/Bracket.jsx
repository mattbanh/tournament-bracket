function Bracket({ players, start }) {
  const getPlayerKeys = (players) => {
    let playerKeys = [];
    let allKeys = Object.keys(players);
    for (let i = 0; i < allKeys.length; i++) {
      if (players[allKeys[i]]) {
        playerKeys.push(allKeys[i]);
      }
    }
    return playerKeys;
  };

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

  const sortPlayerKeys = (playerKeys) => {
    let playerNumber = playerKeys.length;
    let rounds = Math.ceil(Math.log2(playerNumber));

    let seedIndArr = createSeedIndArr(rounds);

    let playerArr = [];
    for (let i = 0; i < playerNumber; i++) {
      playerArr.push(`P${i + 1}`);
    }
    let eightGroup = (rounds - 2) * 8;
    while (playerArr.length < eightGroup) {
      playerArr.push("BYE");
    }

    const sortPlayerArr = (playerArr, seedIndArr) => {
      let sortedPlayerArr = [];

      for (let i = 0; i < seedIndArr.length; i++) {
        sortedPlayerArr.push(playerArr[seedIndArr[i]]);
      }
      return sortedPlayerArr;
    };

    let sortedPlayerArr = sortPlayerArr(playerArr, seedIndArr);

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

  const createMatches = (sortedPlayerKeys, j, rounds) => {
    if (j === rounds - 1) {
      return sortedPlayerKeys.map((key, i) => {
        if (i % 2 === 0) {
          return (
            <li key={(key, i)} className="relative mb-[40px] w-48">
              <div
                className={
                  (i + 2) % 4 !== 0
                    ? "p-2  bg-green-200 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 after:h-[50px] after:-right-4 after:top-1/2"
                    : "p-2  bg-green-200 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 after:h-[50px] after:-right-4 after:bottom-1/2"
                }
              >
                <div className="flex flex-col text-left">
                  <span className="text-black text-xs">{players[key]}</span>
                  <span className="text-black text-xs">
                    {sortedPlayerKeys[i + 1] === "BYE"
                      ? sortedPlayerKeys[i + 1]
                      : players[sortedPlayerKeys[i + 1]]}
                  </span>
                </div>
              </div>
            </li>
          );
        }
      });
    } else {
      let slots = j + 1;
      let matches = [];
      for (let n = 0; n < slots; n++) {
        matches.push(
          <li
            className={
              (n + 2) % 3 === 0 || slots === 1
                ? "relative mb-[40px] w-48  before:absolute before:border-t-2 before:w-full before:-left-4 before:top-1/2 before:-z-10"
                : "relative mb-[128px] w-48  before:absolute before:border-t-2 before:w-full before:-left-4 before:top-1/2 before:-z-10"
            }
          >
            <div
              className={
                slots === 1
                  ? "p-2  bg-green-200"
                  : (n + 2) % 3 !== 0
                  ? "p-2  bg-green-200 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 after:h-[100px] after:-right-4 after:top-1/2"
                  : "p-2  bg-green-200 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 after:h-[100px] after:-right-4 after:bottom-1/2"
              }
            >
              <div className="flex flex-col text-left">
                <span className="text-black text-xs">test</span>
                <span className="text-black text-xs">test</span>
              </div>
            </div>
          </li>
        );
      }
      return matches;
    }
  };
  const createRounds = (sortedPlayerKeys) => {
    if (sortedPlayerKeys[0]) {
      let rounds = Math.ceil(Math.log2(sortedPlayerKeys.length));
      let roundTitles = [];
      for (let j = 0; j < rounds; j++) {
        roundTitles.push(roundProgression[j]);
      }
      return roundTitles.map((title, j) => {
        return (
          <div className="text-center">
            <h3 className="text-sm mb-4">{roundTitles[j]}</h3>
            <div className="flex flex-col justify-center h-full">
              <ul className="relative">
                {createMatches(sortedPlayerKeys, j, rounds)}
              </ul>
            </div>
          </div>
        );
      });

      // console.log(string);
    } else {
      return <span className="text-sm">Please add players</span>;
    }
  };

  const createBracket = (players) => {
    const playerKeys = getPlayerKeys(players);
    const sortedPlayerKeys = sortPlayerKeys(playerKeys);
    const matches = createRounds(sortedPlayerKeys);
    return matches;
  };
  if (start) {
    return (
      <section className="w-full">
        <h1 className="mb-2 text-lg">Tournament Bracket</h1>
        <div className="flex flex-row-reverse justify-end w-full gap-8">
          {createBracket(players)}
        </div>
      </section>
    );
  }
}

export default Bracket;
