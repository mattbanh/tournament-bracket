function Bracket() {
  return (
    <section>
      <h1 className="mb-8">Tournament Bracket</h1>
      <div className="w-[480px]">
        <ul className="relative">
          <li className="relative mb-[100px]">
            <div className="p-2 border-amber-200 border-2 bg-amber-200 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 after:h-[100px] after:-right-4 after:top-1/2">
              <div className="flex flex-col text-left">
                <span className="text-black">Name 1</span>
                <span className="text-black">Name 2</span>
              </div>
            </div>
          </li>
          <li className="relative">
            <div className="p-2 border-amber-200 border-2 bg-amber-200 before:absolute before:border-t-2 before:w-full before:left-4 before:top-1/2 before:-z-10 after:absolute after:border-r-2 after:h-[100px] after:-right-4 after:bottom-1/2">
              <span className="text-black">content</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Bracket;
