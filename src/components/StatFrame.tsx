import { useEffect, useState } from "react";
import { StatBox } from "./stat_box";
import tableStyle from "../styles/table.module.css"
import {Personaje} from "./types"

export const StatFrame = () =>{
    let stats = ["Strenght","Dexterity","Constitution","Intelligence","Wisdom","Charisma","Honor"];

    let personajeInicial : Personaje ={
      "Strenght": 0,
      "Dexterity": 0,
      "Constitution": 0,
      "Intelligence": 0,
      "Wisdom": 0,
      "Charisma": 0,
      "Honor": 0,
    }
    
    const [personaje, setPersonaje] = useState(personajeInicial);
    const [puntos_disponibles, setPuntosDisponibles] = useState(15)
  
    const[bonusNivel, setbonusNivel] = useState(0)

    const [nivel,setNivel] = useState(0)

    const[abilityScoreMaximo, setAbilityScoreMaximo] = useState(30);
  
    function actualizarBonusNivel(nivel: any){
      setNivel(nivel)
      let puntos_utilizados = 0;
      for (let i = 1; i < nivel; i++){

        if (i >= 9){

          puntos_utilizados = puntos_utilizados + 2;
        }
        else{
          puntos_utilizados++;
        }
      }
      setbonusNivel(puntos_utilizados)
    }


    useEffect(() =>{
      actualizarAbilityScoreMaximo();
    }, [nivel]);


    
    function actualizarAbilityScoreMaximo(){
      if (nivel === 5){
        setAbilityScoreMaximo(20);
      }
      else if(nivel <= 14){
        setAbilityScoreMaximo(30);
      }
      else{
        setAbilityScoreMaximo(35)
      }
      return;
    }

    return (
      <div className={tableStyle.centered_parent}>
        <div>Puntos disponibles = </div>
        <input value={puntos_disponibles} onChange={e => setPuntosDisponibles(Number(e.target.value))}></input>
        <div></div>
        <br></br>
        <div>
        Nivel del personaje = <input placeholder='Nivel' onChange={e => actualizarBonusNivel(Number(e.target.value))}></input>
        </div>
        <div> Bonus de nivel = {bonusNivel}</div>
        <div style={{'color':'red'}}> ¡¡Maximum Ability Score = {abilityScoreMaximo}!!</div>
        <div>
          <table id = {"table-id"} className={tableStyle.table_format}>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Inicial</th>
                <th>Bonus de Raza</th>
                <th>Bonus de Feats</th>
                <th>Bonus de Nivel</th>
                <th>Ability Score</th>
                <th>Ability Modifier</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => 
              <StatBox key = {stat} maximumAbilityScore = {abilityScoreMaximo} stat_name = {stat} setPuntosDisponibles = {setPuntosDisponibles} puntos_disponibles = {puntos_disponibles} bonus_nivel = {bonusNivel} setBonusNivel = {setbonusNivel} nivel_pj = {nivel}></StatBox>)}
            </tbody>
          </table>
        </div>
        
      </div>
    );
}