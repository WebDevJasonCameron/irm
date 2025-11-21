import {useState} from "react";
import Button from "../assets/Button.jsx";

export default function AssignInitiativeCard({ targetedPlayer, onInitiativeInput }) {
  const { id, name, type, image, activity, condition, exhaustion, level, prof, race, saves, seat, initiative, round, targeted } = targetedPlayer;

  const [ init, setInit ] = useState(0);

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
      initiative: init,
      round,
      targeted,
    }

    setInit(0);

    onInitiativeInput(updatedPlayer);
  }

  return (
    <form className="form-assign-initiative">
      <div className="initiative-card">
        {/*Avatar*/}
        <div className="initiative-avatar">
          <img src={ image }
               alt={ name } />
        </div>
        {/*Main*/}
        <div className="initiative-main">
          <h5>{ name }</h5>
          <label>Initiative Roll</label>
          <input type="number"
                 value={ init }
                 onChange={(e) => setInit(Number(e.target.value))} />
        </div>
        {/*Buttons*/}
        <div className="initiative-actions">
          <Button onClick={handleSubmit}>
            Next
          </Button>
          <Button>
            🚫Combat
          </Button>
        </div>
      </div>
    </form>
  )
}