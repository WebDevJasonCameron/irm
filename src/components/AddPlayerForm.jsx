import {useState} from "react";
import RacesSource from "../assets/RacesSource.jsx";
import ProfessionsSource from "../assets/ProfessionsSource.jsx";
import { LevelNumberSelectionGenerator as LevelSelect, GenericSelect } from "../assets/HelperUtils.jsx";
import Button from "../assets/Button.jsx";

export default function AddPlayerForm({ onAddPlayer }) {
  const [playerName, setPlayerName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");
  const [playerType , setPlayerType] = useState("pc");
  const [level, setLevel] = useState(1);
  const [prof, setProf] = useState("");
  const [race, setRace] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!playerName || !imageUrl) return;

    const id = crypto.randomUUID();
    const newPlayer = {
      id,
      playerName,
      imageUrl: `${imageUrl}?=${id}`,
      playerType,
      level,
      prof,
      race,
    }

    onAddPlayer(newPlayer);

    setPlayerName("");
    setImageUrl("https://i.pravatar.cc/48");
    setPlayerType("pc");
    setLevel(1);
    setProf("");
    setRace("");

  }

  return (
    <form className="form-add-player"
          onSubmit={handleSubmit}>
      <label>Player Name</label>
      <input type="text"
             value={ playerName }
             onChange={(e) => setPlayerName(e.target.value)} />

      <label>Image URL</label>
      <input type="text"
             value={ imageUrl }
             onChange={(e) => setImageUrl(e.target.value)} />

      <label>Type</label>
      <select value={ playerType }
              onChange={ (e) => setPlayerType(e.target.value) }>
        <option value="pc">Player</option>
        <option value="npc">NPC</option>
      </select>

      { playerType === "pc" && (
        <>
          <label>Level</label>
          <LevelSelect min={1}
                       max={20}
                       value={level}
                       onChange={(e) => setLevel(Number(e.target.value))} />

          <label>Class</label>
          <GenericSelect items={ProfessionsSource}
                         value={prof}
                         onChange={setProf}
                         placeholder="Set class..." />

          <label>Race</label>
          <GenericSelect items={RacesSource}
                         value={race}
                         onChange={setRace}
                         placeholder="Set race..." />
        </>
      )}

      <Button onClick={handleSubmit}>
        Add Player
      </Button>
    </form>
  )
}