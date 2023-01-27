import { useState } from "react";
import { StatBox } from "./stat_box";

export const Stat_frame = () =>{
    let stats = ["Strenght","Dexterity","Constitution","Intelligence","Wisdom","Charisma","Honor"];
    const [puntos_disponibles, setPuntosDisponibles] = useState(15)
  
    const[bonusNivel, setbonusNivel] = useState(0)

    const [nivel,setNivel] = useState(0)
  
    function actualizarBonusNivel(nivel: any){
      setNivel(nivel)
      let puntos_utilizados = 0;
      for (let i = 1; i < nivel; i++){

        if (i >= 10){

          puntos_utilizados = puntos_utilizados + 2;
        }
        else{
          puntos_utilizados++;
        }
      }
      setbonusNivel(puntos_utilizados)
    }
  
    return (
      <div className='centered_parent'>
        
        <div className="box_puntos_disponibles">Puntos disponibles = </div><input className = 'box_puntosDisponibles' value={puntos_disponibles} onChange={e => setPuntosDisponibles(Number(e.target.value))}></input>
        <div></div>
        <br></br>
        <div className="box_nivel_personaje">
        Nivel del personaje = <input placeholder='Nivel' className="box_nivel_personaje" onChange={e => actualizarBonusNivel(Number(e.target.value))}></input>
        </div>
        <div className="box_nivel_personaje"> Bonus de nivel = {bonusNivel}</div>
        <div className = 'parent_table'>
          <table className="table_format">
            <thead>
              <tr>
                <th>Stat</th>
                <th>Inicial</th>
                <th>Bonus de raza</th>
                <th>Bonus de nivel</th>
                <th>Ability Score</th>
                <th>Ability Modifier</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(stat => 
              <StatBox stat_name = {stat} setPuntosDisponibles = {setPuntosDisponibles} puntos_disponibles = {puntos_disponibles} bonus_nivel = {bonusNivel} setBonusNivel = {setbonusNivel} nivel_pj = {nivel}></StatBox>)}
            </tbody>
          </table>
        </div>
        
      </div>
    );
}