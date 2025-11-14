import {useState} from "react";

export default function AddPlayerForm() {
  const [playerType , setPlayerType] = useState({});

  return (
    <form className="form-add-player">
      <label>Player Name</label>
      <input type="text" value={ name } />

      <label>Image URL</label>
      <input type="text"/>

      <label>Type</label>
      <select value={ playerType }
              onChange={ (e) => setPlayerType(e.target.value) }>
        <option value="pc">Player</option>
        <option value="npc">NPC</option>
      </select>

    </form>
  )
}