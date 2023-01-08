function Bracket({ players, start }) {
  console.log(players);
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
    const nextLayer = (seedArr) => {
      let pairNumber = seedArr.length * 2 - 1;
      let growingArr = [];
      seedArr.forEach((seed) => {
        growingArr.push(seed);
        growingArr.push(pairNumber - seed);
      });
      return growingArr;
    };
    for (let i = 0; i < iteration; i++) {
      seedArr = nextLayer(seedArr);
    }

    return seedArr;
  };

  const sortPlayerKeys = (playerKeys) => {
    let playerNumber = playerKeys.length;
    let rounds = Math.ceil(Math.log(playerNumber) / Math.log(2));
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

  const createMatches = (sortedPlayerKeys) => {
    if (sortedPlayerKeys[0]) {
      return sortedPlayerKeys.map((key, i) => {
        if (i % 2 === 0) {
          return (
            <li key={(key, i)} className="relative mb-[40px]">
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
      return <span className="text-sm">Please add players</span>;
    }
  };

  const createBracket = (players) => {
    const playerKeys = getPlayerKeys(players);
    const sortedPlayerKeys = sortPlayerKeys(playerKeys);
    const matches = createMatches(sortedPlayerKeys);
    return matches;
  };
  if (start) {
    return (
      <section className="w-1/2">
        <h1 className="mb-2 text-lg">Tournament Bracket</h1>
        <div className="w-full">
          <ul className="relative">{createBracket(players)}</ul>
        </div>
      </section>
    );
  }
}

export default Bracket;
