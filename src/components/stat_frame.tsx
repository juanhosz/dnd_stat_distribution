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
        <div className="box_caracteristicas">
          <div className="nombre_tabla">
            <div>Stat inicial</div>
            <div className="box_raza">Bonus de raza</div>
            <div className="box_nivel">Bonus de nivel</div>
            <div className="box_ability_score">Ability score</div>
            <div className="box_ability_modifier">Ability modifier</div>
          </div>
          {stats.map(stat => 
            <StatBox stat_name = {stat} setPuntosDisponibles = {setPuntosDisponibles} puntos_disponibles = {puntos_disponibles} bonus_nivel = {bonusNivel} setBonusNivel = {setbonusNivel}></StatBox>)}
        </div>
        
        </div>
    );
}