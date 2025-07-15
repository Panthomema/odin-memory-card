import CardGrid from "./components/CardGrid";
import Scoreboard from "./components/Scoreboard";

function App() {
  return (
    <>
      <main className="flex-grow grid place-items-center">
        <CardGrid />
      </main>
      <footer className="p-2 sm:p-4 md:p-6">
        <Scoreboard />
      </footer>
    </>
  );
}

export default App;
