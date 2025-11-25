import {useState} from "react";
import Button from "../assets/Button.jsx";

export default function AssignInitiativeCard({
                                               targetedPlayer,
                                               onInitiativeInput,
                                               onSetNonCombat,
                                             }) {
  const {
    id,
    name,
    type,
    image,
    activity,
    condition,
    exhaustion,
    level,
    prof,
    race,
    saves,
    seat,
    initiative,
    round,
    targeted,
  } = targetedPlayer;

  const [init, setInit] = useState(0);
  const [activityStatus, setActivityStautus] = useState(activity);

  function handleSubmit(e) {
    e.preventDefault();

    if (activity === "active" && init === 0) return;

    const updatedPlayer = {
      id,
      name,
      type,
      image,
      activity,
      condition,
      exhaustion,
      level,
      prof,
      race,
      saves,
      seat,
      initiative: init,
      round,
      targeted,
    };

    setInit(0);
    onInitiativeInput(updatedPlayer);
  }

  function handleNonCombatClick(e) {
    e.preventDefault();

    // You can choose whether to carry over the typed init or not
    const updatedPlayer = {
      id,
      name,
      type,
      image,
      activity,
      condition,
      exhaustion,
      level,
      prof,
      race,
      saves,
      seat,
      initiative: init || initiative, // keep 0 if nothing typed
      round,
      targeted,
    };

    setInit(0);
    setActivityStautus("active");

    onSetNonCombat(updatedPlayer);
  }

  return (
    <form className="form-assign-initiative" onSubmit={handleSubmit}>
      <div className="initiative-card">
        <div className="initiative-avatar">
          <img src={image} alt={name} />
        </div>

        <div className="initiative-main">
          <h5>{name}</h5>
          <label>Initiative Roll</label>
          <input
            type="number"
            value={init}
            onChange={(e) => setInit(Number(e.target.value))}
          />
        </div>

        <div className="initiative-actions">
          <Button btnType="submit">
            Next
          </Button>

          <Button btnType="button" onClick={handleNonCombatClick}>
            🚫Combat
          </Button>
        </div>
      </div>
    </form>
  );
}
