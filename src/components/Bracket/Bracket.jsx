// 6:30 1.5 hours

function Bracket({ players }) {
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
  const createBracket = (players) => {
    const playerKeys = getPlayerKeys(players);
    // console.log(playerKeys);
    return playerKeys.map((key, i) => {
      if (i % 2 === 0) {
        return (
          <li key={key} className="relative mb-[100px]">
            <div
              className={
                (i + 2) % 4 !== 0
                  ? "p-2  bg-green-200 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 after:h-[100px] after:-right-4 after:top-1/2"
                  : "p-2  bg-green-200 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 after:h-[100px] after:-right-4 after:bottom-1/2"
              }
            >
              <div className="flex flex-col text-left">
                <span className="text-black">{players[key]}</span>
                <span className="text-black">{players[playerKeys[i + 1]]}</span>
              </div>
            </div>
          </li>
        );
      }
    });
  };

  return (
    <section>
      <h1 className="mb-8">Tournament Bracket</h1>
      <div className="w-full">
        <ul className="relative">
          {players && createBracket(players)}
          {/* {Object.keys(players).map((player, i) => (
            <div key={player}>
              <li className="relative mb-[100px]">
                <div className="p-2 border-amber-200 border-2 bg-amber-200 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 after:h-[100px] after:-right-4 after:top-1/2">
                  <div className="flex flex-col text-left">
                    <span className="text-black">{players[player]}</span>
                    <span className="text-black">{player}</span>
                  </div>
                </div>
              </li>
              <li className="relative mb-[100px]">
                <div className="p-2 border-amber-200 border-2 bg-amber-200 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 after:h-[100px] after:-right-4 after:bottom-1/2">
                  <span className="text-black">{i}</span>
                  <span className="text-black">{i}</span>
                </div>
              </li>
            </div>
          ))} */}
        </ul>
      </div>
    </section>
  );
}

export default Bracket;
