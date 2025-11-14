
import PlayerList from "./components/PlayerList.jsx";
import AddPlayerForm from "./components/AddPlayerForm.jsx";
import ActionCard from "./components/ActionCard.jsx";
import playersSource from "./assets/PlayersSource.jsx";

import {useState} from "react";
import Menu from "./components/Menu.jsx";

function App() {
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [players, setPlayers] = useState(playersSource);

  function handleShowAddPlayer() {
    setShowAddPlayer((show) => !show);
  }

  function handleAddPlayer(player) {
    setPlayers((players) =>[...players, player]);
  }

  return (
    <div className="app-container">
      <Menu onClickShowAddPlayer={handleShowAddPlayer}
            showAddPlayerBtn={ showAddPlayer }/>
      <div className="app">
        <div className="sidebar">
          <PlayerList players={ players } />
        </div>

        { showAddPlayer && <AddPlayerForm onAddPlayer={ handleAddPlayer } /> }

        <ActionCard />
      </div>
    </div>
  )
}

export default App
