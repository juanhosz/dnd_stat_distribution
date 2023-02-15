import { useEffect, useState } from "react";
import { StatBox } from "./stat_box";
import tableStyle from "../styles/table.module.css"
import {Atributos, Personaje} from "../types/types"
import { CharacterSettings } from "./CharacterSettings";
import { ModalPreview } from "./ModalPreview";

export const StatFrame = () =>{
    let stats = ["Strenght","Dexterity","Constitution","Intelligence","Wisdom","Charisma","Honor"];

    let atributosInicial : Personaje ={
      "Strenght": 10,
      "Dexterity": 10,
      "Constitution": 10,
      "Intelligence": 10,
      "Wisdom": 10,
      "Charisma": 10,
      "Honor": 10,
    }

    let atributosNivelInicial: Personaje = {
      "Strenght": 0,
      "Dexterity": 0,
      "Constitution": 0,
      "Intelligence": 0,
      "Wisdom":0,
      "Charisma":0,
      "Honor":0,
    }

    let atributosFeatInicial: Personaje = {
      "Strenght":0,
      "Dexterity":0,
      "Constitution":0,
      "Intelligence":0,
      "Wisdom":0,
      "Charisma":0,
      "Honor":0,
    }

    let atributosRazaInicial: Personaje  = {
      "Strenght":0,
      "Dexterity":0,
      "Constitution":0,
      "Intelligence":0,
      "Wisdom":0,
      "Charisma":0,
      "Honor":0,
    }

    let atributosPrincipalesInicial: Atributos = {
      "AbilityScoreMaximo": 20,
      "Nivel": 0,
      "BonusNivel": 0,
      "PuntosDisponibles": 15,
    }
    let atributosCache = window.localStorage.getItem("ATRIBUTOS")
    if (atributosCache){
      var atributosParse = JSON.parse(atributosCache);
    }
    else{
      atributosParse = false;
    }

    const [atributos, setAtributos] = useState(parser(atributosParse.atributos,atributosInicial));
    const [atributosNivel, setAtributosNivel] = useState(parser(atributosParse.atributosNivel,atributosNivelInicial));
    const [atributosFeat, setAtributosFeat] = useState(parser(atributosParse.atributosFeat,atributosFeatInicial));
    const [atributosRaza, setAtributosRaza] = useState(parser(atributosParse.atributosRaza,atributosRazaInicial));
    const [settings,setSettings] = useState(parser(atributosParse.settings,atributosPrincipalesInicial));

    function parser(state:any,other:any){
      if (!state){
        return other;
      }
      return state
    }

    let constArray = [[atributos, setAtributos],
    [atributosNivel, setAtributosNivel],
    [atributosFeat, setAtributosFeat],
    [atributosRaza,setAtributosRaza],
    [settings,setSettings]];

    function actualizarAbilityScoreMaximo(){
      if (settings.Nivel <= 5 && settings.Nivel < 14){
        setSettings({...settings, "AbilityScoreMaximo":20});
      }
      else if(settings.Nivel < 14){
        setSettings({...settings, "AbilityScoreMaximo":30});
      }
      else{
        setSettings({...settings, "AbilityScoreMaximo":35})
      }
      return;
    }

    useEffect(() =>{
      actualizarAbilityScoreMaximo();
    },[settings.Nivel]); 


    useEffect(() =>{
      window.localStorage.setItem("ATRIBUTOS",JSON.stringify({"atributos":atributos,
                                  "atributosNivel":atributosNivel,
                                  "atributosFeat":atributosFeat,
                                  "atributosRaza":atributosRaza,
                                  "settings":settings}));

    },[atributos,settings,atributosNivel,atributosFeat,atributosRaza])

    return (
      <div className={tableStyle.body_container}>
        <CharacterSettings arrayStats = {constArray}></CharacterSettings>
        <div>
          <div>Puntos Disponibles = {settings.PuntosDisponibles} ; Puntos de Nivel Disponibles = {settings.BonusNivel}</div>
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
              <StatBox key = {stat}  stat_name = {stat}  arrayStats = {constArray}>
              </StatBox>)}
            </tbody>
          </table>
          
        </div>
        <div className={tableStyle.PreviewContainer}>
          <ModalPreview arrayStats = {constArray}></ModalPreview>
        </div>
      </div>
    );
}