
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
  const [targetedPlayer, setTargetedPlayer] = useState();
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
    handleInitiativeRollCollection();
  }

  function handleInitiativeInput(player) {
    console.log(player);
  }


  function handleInitiativeRollCollection() {
    setPlayers((prevPlayers) => {
      // Find all “active” players with initiative 0
      const nonInitPlayers = prevPlayers.filter(
        (player) => player.activity === "active" && player.initiative === 0
      );

      if (nonInitPlayers.length === 0) {
        // nobody to target
        setTargetedPlayer(null);
        return prevPlayers;
      }

      // Pick the first one (you can change this logic later)
      const targetPlayer = nonInitPlayers[0];

      // Store the actual player object in state for your InitCard
      setTargetedPlayer(targetPlayer);

      // Return a new players array with that player marked as targeted
      return prevPlayers.map((p) =>
        p.id === targetPlayer.id ? { ...p, targeted: true } : p
      );
    });

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
