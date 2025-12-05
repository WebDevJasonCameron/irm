import Button from "../assets/Button.jsx";
import { useState, useEffect } from "react";
import { GenericSelect, NumberSelectionGenerator as LevelSelect } from "../assets/HelperUtils.jsx";
import ConditionsSource from "../assets/ConditionsSource.jsx";

export default function ActionCard({ targetedPlayer, onCompleteTurn }) {
  const { id, name, image, condition, exhaustion } = targetedPlayer;

  // persistent fields – start from what the player already has,
  // and keep them in sync when the targeted player changes
  const [conditionState, setConditionState] = useState(condition ?? "");
  const [exhaustionState, setExhaustionState] = useState(exhaustion ?? 0);

  useEffect(() => {
    // whenever we switch to a different targeted player (or their saved values change),
    // reset the local state to match that player
    setConditionState(condition ?? "");
    setExhaustionState(exhaustion ?? 0);
  }, [id, condition, exhaustion]);

  // per-turn-only flags
  const [actionChecked, setActionChecked] = useState(false);
  const [bonusActionChecked, setBonusActionChecked] = useState(false);
  const [reactionChecked, setReactionChecked] = useState(false);
  const [movementChecked, setMovementChecked] = useState(false);

  function handleDoneClick(e) {
    e.preventDefault();

    // Build the minimal update payload for parent
    const updated = {
      id,
      condition: conditionState,
      exhaustion: exhaustionState,
    };

    // Reset turn-specific UI flags only
    setActionChecked(false);
    setBonusActionChecked(false);
    setReactionChecked(false);
    setMovementChecked(false);

    // DO NOT reset conditionState or exhaustionState here.
    // They represent the persisted values that we just saved.

    // Tell parent: this player's turn is done
    onCompleteTurn(updated);
  }

  return (
    <form className="action-card">
      {/* Avatar */}
      <div className="action-avatar">
        <img src={image} alt={name} />
      </div>

      {/* Main */}
      <div className="action-main">
        <h5>{name}</h5>

        <label>
          <input
            type="checkbox"
            checked={actionChecked}
            onChange={(e) => setActionChecked(e.target.checked)}
          />
          Action
        </label>

        <label>
          <input
            type="checkbox"
            checked={bonusActionChecked}
            onChange={(e) => setBonusActionChecked(e.target.checked)}
          />
          Bonus Action
        </label>

        <label>
          <input
            type="checkbox"
            checked={reactionChecked}
            onChange={(e) => setReactionChecked(e.target.checked)}
          />
          Reaction
        </label>

        <label>
          <input
            type="checkbox"
            checked={movementChecked}
            onChange={(e) => setMovementChecked(e.target.checked)}
          />
          Movement
        </label>

        <div className="action-selection-row">
          <label>Condition</label>
          <GenericSelect
            id="condition-select"
            items={ConditionsSource}
            value={conditionState}
            styling="uniform-select"
            onChange={setConditionState}     // GenericSelect should call onChange(newValue)
            placeholder="Set condition..."
          />
        </div>

        <div className="action-selection-row">
          <label>Exhaustion</label>
          <LevelSelect
            min={0}
            max={6}
            styling="uniform-select"
            value={exhaustionState}
            onChange={(e) => setExhaustionState(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Right */}
      <div className="action-actions">
        <Button onClick={handleDoneClick}>Done / Next</Button>
        <Button>Hold</Button>
        <Button>Down</Button>
      </div>
    </form>
  );
}
