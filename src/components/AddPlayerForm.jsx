import {useState} from "react";
import RacesSource from "../assets/RacesSource.jsx";
import ProfessionsSource from "../assets/ProfessionsSource.jsx";
import { LevelNumberSelectionGenerator as LevelSelect, GenericSelect } from "../assets/HelperUtils.jsx";
import Button from "../assets/Button.jsx";

export default function AddPlayerForm({ onAddPlayer }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const [type , setType] = useState("npc");
  const [level, setLevel] = useState(1);
  const [prof, setProf] = useState("");
  const [race, setRace] = useState("");
  const [seat, setSeat] = useState(0);
  const [initiative, setInitiative] = useState(0);

  // Placeholder Vars
  let inCombat = false;

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newPlayer = {
      id,
      name,
      image: `${image}?=${id}`,
      type: type,
      level,
      prof,
      race,
      saves: { fail: 0, success: 0 },
      seat: 0,
      initiative: 0
    }

    onAddPlayer(newPlayer);

    setName("");
    setImage("https://i.pravatar.cc/48");
    setType("pc");
    setLevel(1);
    setProf("");
    setRace("");
    setSeat(0)
    setInitiative(0);

  }

  return (
    <form className="form-add-player"
          onSubmit={handleSubmit}>
      <label>Player Name</label>
      <input type="text"
             value={ name }
             onChange={(e) => setName(e.target.value)} />

      <label>Image URL</label>
      <input type="text"
             value={ image }
             onChange={(e) => setImage(e.target.value)} />

      <label>Type</label>
      <select value={ type }
              onChange={ (e) => setType(e.target.value) }>
        <option value="npc">NPC</option>
        <option value="pc">Player</option>
      </select>

      { inCombat && (
        <>
          <label>Initiative Roll</label>
          <input type="number"
                 value={ initiative }
                 onChange={(e) => setInitiative(Number(e.target.value))}/>
        </>
      )}

      { type === "pc" && (
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

      { !inCombat && type === 'pc' && (
        <>
          <label>Player's Seat</label>
          <input type="number"
                 value={ seat }
                 onChange={(e) => setSeat(Number(e.target.value))}/>
        </>
      )}

      <Button onClick={handleSubmit}>
        Add Player
      </Button>
    </form>
  )
}