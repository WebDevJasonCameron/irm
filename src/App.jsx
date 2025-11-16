
import PlayerList from "./components/PlayerList.jsx";
import AddPlayerForm from "./components/AddPlayerForm.jsx";
import ActionCard from "./components/ActionCard.jsx";
import playersSource from "./assets/PlayersSource.jsx";

import {useState} from "react";
import Menu from "./components/Menu.jsx";
import AssignInitiativeForm from "./components/AssignInitiativeForm.jsx";

function App() {
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [players, setPlayers] = useState(playersSource);
  const [targetedPlayer, setTargetedPlayer] = useState(players[0]);

  let startingCombat = false;
  let inCombat = true;

  function handleShowAddPlayer() {
    setShowAddPlayer((show) => !show);
  }

  function handleAddPlayer(player) {
    setPlayers((players) =>[...players, player]);
    setShowAddPlayer(false);
  }

  function handleEnterBattle() {
    console.log("Enter Battle");
  }

  function handleInitiativeInput(player) {
    console.log(player);
  }

  return (
    <div className="app-container">
      <Menu onClickShowAddPlayer={ handleShowAddPlayer }
            onClickCombat={ handleEnterBattle }
            showAddPlayerBtn={ showAddPlayer }/>
      <div className="app">
        <div className="sidebar">
          <PlayerList players={ players } />
        </div>

        { showAddPlayer && <AddPlayerForm onAddPlayer={ handleAddPlayer } /> }
        { targetedPlayer &&
          startingCombat && <AssignInitiativeForm targetedPlayer={ targetedPlayer }
                                                   onInitiativeInput />}

        <ActionCard targetedPlayer={ targetedPlayer } />
      </div>
    </div>
  )
}

export default App
