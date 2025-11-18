import Button from "../assets/Button.jsx";
import {useState} from "react";
import {GenericSelect, LevelNumberSelectionGenerator as LevelSelect} from "../assets/HelperUtils.jsx";
import ConditionsSource from "../assets/ConditionsSource.jsx";


export default function ActionCard({ targetedPlayer }) {
  const { name, image } = targetedPlayer;

  const [condition, setCondition] = useState("");
  const [exhaustion, setExhaustion] = useState(0);

  const [actionChecked, setActionChecked] = useState(false);
  const [bonusActionChecked, setBonusActionChecked] = useState(false);
  const [reactionChecked, setReactionChecked] = useState(false);
  const [movementChecked, setMovementChecked] = useState(false);

  return (
    <form className="action-card">
      {/*Avatar*/}
      <div className="action-avatar">
        <img src={ image }
             alt={ name } />
      </div>

      {/*Main*/}
      <div className="action-main">
        <h5>{ name }</h5>

        <label>
        <input type="checkbox"
               checked={ actionChecked }
               onChange={(e) => setActionChecked(e.target.checked)} />
          Action
        </label>

        <label>
          <input type="checkbox"
                 checked={ bonusActionChecked }
                 onChange={(e) => setBonusActionChecked(e.target.checked)} />
          Bonus Action
        </label>

        <label>
          <input type="checkbox"
                 checked={ reactionChecked }
                 onChange={(e) => setReactionChecked(e.target.checked)} />
          Reaction
        </label>

        <label>
          <input type="checkbox"
                 checked={ movementChecked }
                 onChange={(e) => setMovementChecked(e.target.checked)} />
          Movement
        </label>

        <div className="action-selection-row">
          <label>Condition</label>
          <GenericSelect
            id="condition-select"
            items={ConditionsSource}
            value={condition}
            styling="uniform-select"
            onChange={setCondition}
            placeholder="Set class..."
          />
        </div>

        <div className="action-selection-row">
          <label>Exhaustion</label>
          <LevelSelect min={0}
                       max={6}
                       styling="uniform-select"
                       value={exhaustion}
                       onChange={(e) => setExhaustion(Number(e.target.value))} />
        </div>

      </div>

      {/*Right*/}
      <div className="action-actions">
        <Button >
          Done
        </Button>
        <Button>
          Hold
        </Button>
        <Button>
          Down
        </Button>
      </div>

    </form>
  )
}