
import PlayerList from "./components/PlayerList.jsx";
import AddPlayerCard from "./components/AddPlayerCard.jsx";
import ActionCard from "./components/ActionCard.jsx";
import playersSource from "./assets/PlayersSource.jsx";

import {useState} from "react";
import Menu from "./components/Menu.jsx";
import AssignInitiativeCard from "./components/AssignInitiativeCard.jsx";

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

    // Initialize everyone as active, init 0, not targeted
    setPlayers(prevPlayers => {
      const initialized = prevPlayers.map(p => ({
        ...p,
        activity: "active",
        initiative: 0,
        targeted: false,
      }));

      // Pick the first player who needs an initiative roll
      const nonInitPlayers = initialized.filter(
        p => p.activity === "active" && p.initiative === 0
      );

      if (nonInitPlayers.length === 0) {
        // Edge case: no one to roll
        setTargetedPlayer(null);
        setStartingCombat(false);
        setInCombat(true);
        return initialized;
      }

      const firstTarget = nonInitPlayers[0];
      setTargetedPlayer(firstTarget);

      return initialized.map(p =>
        p.id === firstTarget.id ? { ...p, targeted: true } : p
      );
    });
  }

  // called when the user submits an initiative roll in AssignInitiativeCard
  function advanceToNextPlayer(updatedPlayer) {
    setPlayers(prevPlayers => {
      // 1) Apply the initiative from updatedPlayer
      const withUpdatedInit = prevPlayers.map(p =>
        p.id === updatedPlayer.id
          ? { ...p, initiative: updatedPlayer.initiative, targeted: false }
          : p
      );

      // 2) Find remaining active players with initiative 0
      const nonInitPlayers = withUpdatedInit.filter(
        p => p.activity === "active" && p.initiative === 0
      );

      if (nonInitPlayers.length === 0) {
        // No more players need initiative
        setTargetedPlayer(null);
        setStartingCombat(false);
        setInCombat(true);

        // Make sure no one stays "targeted"
        return withUpdatedInit.map(p => ({ ...p, targeted: false }));
      }

      // 3) Target the next player
      const nextTarget = nonInitPlayers[0];
      setTargetedPlayer(nextTarget);

      return withUpdatedInit.map(p =>
        p.id === nextTarget.id
          ? { ...p, targeted: true }
          : { ...p, targeted: false }
      );
    });
  }

  function handleInitiativeInput(updatedPlayer) {
    // normal "Next" flow: update initiative but keep them active
    advanceToNextPlayer(updatedPlayer.id, {
      initiative: updatedPlayer.initiative,
    });
  }

  function handleSetNonCombat(updatedPlayer) {
    advanceToNextPlayer(updatedPlayer.id, { activity: "inactive",
    });
  }

  return (
    <div className="app-container">
      <Menu
        startingCombat={startingCombat}
        inCombat={inCombat}
        onClickShowAddPlayer={handleShowAddPlayer}
        onClickCombat={handleEnterBattle}
        showAddPlayerBtn={showAddPlayer}
      />
      <div className="app">
        <div className="sidebar">
          <PlayerList players={players} />
        </div>

        {showAddPlayer && <AddPlayerCard onAddPlayer={handleAddPlayer} />}

        {targetedPlayer && startingCombat && (
          <AssignInitiativeCard
            targetedPlayer={ targetedPlayer }
            onInitiativeInput={ handleInitiativeInput }
            onSetNonCombat={ handleSetNonCombat }
          />
        )}

        {targetedPlayer && !startingCombat && inCombat && (
          <ActionCard targetedPlayer={targetedPlayer} />
        )}
      </div>
    </div>
  );
}

export default App;
