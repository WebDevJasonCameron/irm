import Button from "../assets/Button.jsx";

export default function Menu({ onClickShowAddPlayer, onClickCombat, showAddPlayerBtn }) {

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
        <Button onClick={ onClickCombat } >
          Combat
        </Button>
      </div>
    </header>
  )
}