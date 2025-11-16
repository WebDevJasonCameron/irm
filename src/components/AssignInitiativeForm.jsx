import {useState} from "react";
import Button from "../assets/Button.jsx";

export default function AssignInitiativeForm({ targetedPlayer }) {
  const { id, name, image, type, level, prof, race, saves, seat, initiative } = targetedPlayer;

  const [ init, setInit ] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    const updatedPlayer = {
      id,
      name,
      image,
      type,
      level,
      prof,
      race,
      saves,
      seat,
      initiative: init,
    }

    setInit(0);
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
          <Button >
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