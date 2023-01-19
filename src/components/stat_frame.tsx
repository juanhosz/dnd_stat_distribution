import { useState } from "react";
import { StatBox } from "./stat_box";

export const Stat_frame = () =>{
    let stats = ["Strenght","Dexterity","Constitution","Intelligence","Wisdom","Charisma","Honor"];
    const [puntos_disponibles, setPuntosDisponibles] = useState(15)
  
    const[bonusNivel, setbonusNivel] = useState(0)

    const [nivel,setNivel] = useState(0)
  
    function actualizarBonusNivel(nivel: any){
      setNivel(nivel)
      let sumatoria = 0;
      for (let i = 1; i < nivel; i++){

        if (i >= 10){
          console.log("el numero es mayor o igual a 10")
          sumatoria = sumatoria + 2;
        }
        else{
          sumatoria++;
        }
      }
      setbonusNivel(sumatoria)
    }
  
    return (
      <div className='centered_parent'>
        
        Puntos disponibles = <input className = 'box_puntosDisponibles' value={puntos_disponibles} onChange={e => setPuntosDisponibles(Number(e.target.value))}></input>
        <div></div>
        <br></br>
        Nivel del personaje = <input placeholder='Nivel ' onChange={e => actualizarBonusNivel(Number(e.target.value))}></input>
        
        <div> Bonus de nivel = {bonusNivel}</div>
        <div>
          <table className="table_format">
            <tr>
              <th>Stat</th>
              <th>Inicial</th>
              <th>Bonus de raza</th>
              <th>Bonus de nivel</th>
              <th>Ability Score</th>
              <th>Ability Modifier</th>
            </tr>
          {stats.map(stat => 
            <StatBox stat_name = {stat} setPuntosDisponibles = {setPuntosDisponibles} puntos_disponibles = {puntos_disponibles} bonus_nivel = {bonusNivel} setBonusNivel = {setbonusNivel}></StatBox>)}
          </table>
        </div>
        
      </div>
    );
}