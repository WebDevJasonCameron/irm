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
  const [nonCombatants, setNonCombatants] = useState([])
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
    setPlayers((prevPlayers) => {
      const initializedPlayers = prevPlayers.map((p) => ({
        ...p,
        activity: "active",
        initiative: 0,
        targeted: false,
      }));

      // Pick the first player who needs an initiative roll
      const nonInitPlayers = initializedPlayers.filter(
        p => p.activity === "active" && p.initiative === 0
      );

      if (nonInitPlayers.length === 0) {
        // Edge case: no one to roll
        setTargetedPlayer(null);
        setStartingCombat(false);
        setInCombat(true);
        return initializedPlayers;
      }

      const firstTarget = nonInitPlayers[0];
      setTargetedPlayer(firstTarget);

      return initializedPlayers.map(p =>
        p.id === firstTarget.id ? { ...p, targeted: true } : p
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
    advanceToNextPlayer(updatedPlayer.id, {
      activity: "inactive",
      initiative: updatedPlayer.initiative ?? 0,  // keep the rolled initiative
    });
  }

  function advanceToNextPlayer(currentPlayerId, updatesForCurrent = {}) {
    setPlayers(prevPlayers => {
      // 1) Update the current player
      const updatedList = prevPlayers.map(p =>
        p.id === currentPlayerId
          ? { ...p, ...updatesForCurrent, targeted: false }
          : p
      );

      // Keep non-combatants up-to-date as we go
      const currentNonCombatants = updatedList.filter(
        p => p.activity === "inactive"
      );
      setNonCombatants(currentNonCombatants);

      // 2) Find remaining active players with init 0
      const nonInitPlayers = updatedList.filter(
        p => p.activity === "active" && p.initiative === 0
      );

      if (nonInitPlayers.length === 0) {
        // Final split at the end of the initiative phase
        const sortedCombatants = finalizeInitiativeOrder(updatedList);
        const sortedNonCombatants = finalizeNonCombatantList(updatedList);

        setNonCombatants(sortedNonCombatants);   // final sorted NCs
        setTargetedPlayer(sortedCombatants[0]);
        setStartingCombat(false);
        setInCombat(true);

        return sortedCombatants;  // players now only combatants
      }

      // 3) Target the next player who needs an initiative
      const nextTarget = nonInitPlayers[0];
      setTargetedPlayer(nextTarget);

      return updatedList.map(p =>
        p.id === nextTarget.id
          ? { ...p, targeted: true }
          : { ...p, targeted: false }
      );
    });
  }


  function finalizeInitiativeOrder(playersList) {
    const activeOnly = playersList.filter(p => p.activity === "active");
    return [...activeOnly].sort((a, b) => b.initiative - a.initiative);
  }

  function finalizeNonCombatantList(playersList) {
    const nonActiveOnly = playersList.filter(p => p.activity === "inactive");
    return [...nonActiveOnly].sort((a, b) => b.initiative - a.initiative);
  }

  function handleEndCombat() {
    const clearCombatants = players.map((p) => ({
      ...p,
      activity: "inactive",
      initiative: 0,
      targeted: false,
    }));

    const clearNonCombatants = nonCombatants.map((p) => ({
      ...p,
      activity: "inactive",
      initiative: 0,
    }))

    const continuingPlayers = [...clearCombatants, ...clearNonCombatants];
    continuingPlayers.sort((a, b) => a.name.localeCompare(b.name));

    setPlayers(continuingPlayers);
    setNonCombatants([]);
    setTargetedPlayer(null);
    setStartingCombat(false);
    setInCombat(false);
  }

  return (
    <div className="app-container">
      <Menu
        startingCombat={startingCombat}
        inCombat={inCombat}
        onClickShowAddPlayer={handleShowAddPlayer}
        onClickCombat={handleEnterBattle}
        onClickEndCombat={handleEndCombat}
        showAddPlayerBtn={showAddPlayer}
        players={players}
        nonCombatants={nonCombatants}
      />
      <div className="app">
        <div className="sidebar">
          <PlayerList players={players} />
        </div>

        {
          showAddPlayer && <AddPlayerCard onAddPlayer={ handleAddPlayer } />
        }

        {
          targetedPlayer && startingCombat && (
          <AssignInitiativeCard
            targetedPlayer={ targetedPlayer }
            onInitiativeInput={ handleInitiativeInput }
            onSetNonCombat={ handleSetNonCombat } />
          )
        }

        {
          targetedPlayer && !startingCombat && inCombat && (
          <ActionCard targetedPlayer={ targetedPlayer } />
          )
        }

      </div>
    </div>
  );
}

export default App;
