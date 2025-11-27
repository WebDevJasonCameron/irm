import Button from "../assets/Button.jsx";

export default function Menu({ startingCombat,
                               inCombat,
                               onClickShowAddPlayer,
                               onClickCombat,
                               onClickEndCombat,
                               showAddPlayerBtn}) {

  const combatBtnFlag = (startingCombat || inCombat)

  return (
    <header className="menu-bar">
      <h1 className="menu-title">
        Initiative Tracker
      </h1>
      <div className="menu-actions">
        <Button btnStyle="add-player-btn"
                onClick={ onClickShowAddPlayer } >
          {showAddPlayerBtn ? "Close" : "Add Player" }
        </Button>

        {
          !combatBtnFlag &&
          <Button onClick={ onClickCombat } >
            Combat
          </Button>
        }

        {
          !startingCombat && inCombat &&
          <Button onClick={ onClickEndCombat }>
            End Combat
          </Button>
        }

      </div>
    </header>
  )
}