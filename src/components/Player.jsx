export default function Player({ player }) {
  const { name, type, image, level, prof, race } = player;

  return (
    <li className="player-list">
      <img src={image} alt={name} />
      <h5>{ name }</h5>
      { type === "pc" && <p>Lvl {level} {prof}, {race}</p> }

    </li>
  )
}