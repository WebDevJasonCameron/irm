
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
  const [startingCombat, setStartingCombat] = useState(false);
  const [inCombat, setInCombat] = useState(false);


  function handleShowAddPlayer() {
    setShowAddPlayer((show) => !show);
  }

  function handleAddPlayer(player) {
    setPlayers((players) =>[...players, player]);
    setShowAddPlayer(false);
  }

  function handleEnterBattle() {
    setStartingCombat(true);
  }

  function handleInitiativeInput(player) {
    console.log(player);
  }

  return (
    <div className="app-container">
      <Menu startingCombat={startingCombat}
            inCombat={inCombat}
            onClickShowAddPlayer={ handleShowAddPlayer }
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
        { targetedPlayer && !startingCombat && inCombat && <ActionCard targetedPlayer={ targetedPlayer } />}

      </div>
    </div>
  )
}

export default App
