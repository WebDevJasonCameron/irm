import Button from "../assets/Button.jsx";

export default function Menu({ onClickShowAddPlayer, showAddPlayerBtn }) {

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
        <Button>
          Combat
        </Button>
      </div>
    </header>
  )
}