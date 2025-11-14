
import PlayerList from "./components/PlayerList.jsx";
import AddPlayerForm from "./components/AddPlayerForm.jsx";
import ActionCard from "./components/ActionCard.jsx";
import playersSource from "./assets/PlayersSource.jsx";

function App() {

  return (
    <div className="App">
      <div className="sidebar">
        <PlayerList players={playersSource} />
        <AddPlayerForm />
      </div>
        <ActionCard />
    </div>
  )
}

export default App
