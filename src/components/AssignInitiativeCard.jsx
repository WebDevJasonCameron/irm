import {useState} from "react";
import Button from "../assets/Button.jsx";

export default function AssignInitiativeCard({ targetedPlayer, onInitiativeInput }) {
  const { id, name, type, image, activity, condition, exhaustion, level, prof, race, saves, seat, initiative, round, targeted } = targetedPlayer;

  const [init, setInit] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (init === 0) return;

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
      initiative: init,   // ← new roll
      round,
      targeted,
    };

    setInit(0);
    onInitiativeInput(updatedPlayer);
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
          <Button type="submit">
            Next
          </Button>
          <Button>
            🚫Combat
          </Button>
        </div>
      </div>
    </form>
  );
}
