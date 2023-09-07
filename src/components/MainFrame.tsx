import { useEffect, useState } from "react";
import { StatBox } from "./stat_box";
import tableStyle from "../styles/table.module.css"
import {Atributos, Personaje} from "../types/types"
import { CharacterSettings } from "./CharacterSettings";
import { ModalPreview } from "./ModalPreview";

export const MainFrame = () =>{
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
      "PuntosDisponiblesLegend": 0,
      "PuntosMaximosLegendario": 0
    }

    let atributosLegendarioInicial: Personaje = {
      "Strenght":0,
      "Dexterity":0,
      "Constitution":0,
      "Intelligence":0,
      "Wisdom":0,
      "Charisma":0,
      "Honor":0,
    }

    let atributosFeatLegendarioInicial: Personaje = {
      "Strenght":0,
      "Dexterity":0,
      "Constitution":0,
      "Intelligence":0,
      "Wisdom":0,
      "Charisma":0,
      "Honor":0,
    }


    let atributosCache = window.localStorage.getItem("ATRIBUTOS")
    if (atributosCache){
      var atributosParse = JSON.parse(atributosCache);
    }
    else{
      atributosParse = false;
    }
    const [esLegendario, setEsLegendario] = useState(false)

    const [atributos, setAtributos] = useState(parser(atributosParse.atributos,atributosInicial));
    const [atributosNivel, setAtributosNivel] = useState(parser(atributosParse.atributosNivel,atributosNivelInicial));
    const [atributosLegendario, setAtributosLegendario] = useState(parser(atributosParse.atributosLegendario,atributosLegendarioInicial));
    const [atributosFeat, setAtributosFeat] = useState(parser(atributosParse.atributosFeat,atributosFeatInicial));
    const [atributosFeatLegendario,setAtributosFeatLegendario] = useState(parser(atributosParse.atributosFeatLegendario,atributosFeatLegendarioInicial));
    const [atributosRaza, setAtributosRaza] = useState(parser(atributosParse.atributosRaza,atributosRazaInicial));
    const [settings,setSettings] = useState(parser(atributosParse.settings,atributosPrincipalesInicial));
    const [disablePoints, setDisablePoints] = useState(atributosParse.isDisabled);
    


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
    [settings,setSettings],
    [atributosLegendario,setAtributosLegendario],
    [atributosFeatLegendario, setAtributosFeatLegendario]];

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
      setDisablePoints(settings.BonusNivel == 0);
    },[settings.BonusNivel])

    useEffect(() =>{
      window.localStorage.setItem("ATRIBUTOS",JSON.stringify({"atributos":atributos,
                                  "atributosNivel":atributosNivel,
                                  "atributosFeat":atributosFeat,
                                  "atributosRaza":atributosRaza,
                                  "settings":settings,
                                "atributosLegendario":atributosLegendario,
                              "atributsoFeatLegendario":atributosFeatLegendario,
                            "isDisabled":disablePoints}));

    },[atributos,settings,atributosNivel,atributosFeat,atributosRaza,disablePoints])

    return (
      <div className={tableStyle.body_container}>
        <CharacterSettings arrayStats = {constArray} esLegendario = {setEsLegendario}></CharacterSettings>
        <div>
          <div className={tableStyle.stats_info}>
            <div>Puntos Disponibles = {settings.PuntosDisponibles} </div>
            <div>Puntos de Nivel Disponibles = {settings.BonusNivel}</div> 
            <div>Puntos De Nivel {">= 14"} Disponibles = {settings.PuntosDisponiblesLegend}</div>
          </div>
          <table id = {"table-id"} className={tableStyle.table_format}>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Inicial</th>
                <th>Bonus de Raza</th>
                <th>Bonus de Feats</th>
                <th>Puntos de Nivel</th>
                <th>Nivel 
                  {"(>= 14)"}</th>
                <th>Feat {">=14"}</th>
                <th>Ability Score</th>
                <th>Ability Modifier</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => 
              <StatBox key = {stat}  stat_name = {stat}  arrayStats = {constArray} isDisabled = {disablePoints}>
              </StatBox>)}
            </tbody>
          </table>
        <div>
        {"(RECUERDEN QUE A PARTIR DE 30 (es decir de 30 a 31) CUESTA DOS PUNTOS E.G: COMBAT MASTER DA +2 DEX, SE SUBEN SOLO UN PUNTO EN LA COLUMNA DE FEATS SI TIENEN 30 O MAS) si hay algun feat que da un punto y estan en 30 o mas, mala suerte, tienen 30.5 redondeado para abajo"}</div>
        <div style={{'color':'red'}}>{"ORDEN: INICIAL > RAZA > PUNTOS DE NIVEL > FEATS PENES > NIVEL (>14) > FEATS HEROICOS"}</div>
        <div style = {{'color': 'red'}}>{"TO DO: Agregar lista de feats y permitir mas de 35 de ability score"}</div>
        </div>
        <div className={tableStyle.PreviewContainer}>
          <ModalPreview arrayStats = {constArray}></ModalPreview>
        </div>
      </div>
    );
}