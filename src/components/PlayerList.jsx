import Player from "./Player.jsx";

export default function PlayerList({ players }) {

  return (
    <ul>
      { players.map((player) => (
        <Player player={ player }
                key={ player.id } />
        ))
      }
    </ul>
  )
}