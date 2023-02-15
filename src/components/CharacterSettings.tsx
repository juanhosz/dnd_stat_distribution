import settingsModule from '../styles/settings.module.css'
import { Atributos, Personaje } from '../types/types';

export function CharacterSettings(props:any){
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

    let statName = props.stat_name as keyof Personaje;
    let [atributosIni,setAtributos] = props.arrayStats[0];
    let [atributosNivelIni,setAtributosNivel] = props.arrayStats[1];
    let [atributosFeatIni,setAtributosFeat] = props.arrayStats[2];
    let [atributosRazaIni,setAtributosRaza] = props.arrayStats[3];
    let [settingsIni,setSettings] = props.arrayStats[4];

    let settings:Atributos = settingsIni;
    let atributos:Personaje = atributosIni;
    let atributosNivel:Personaje = atributosNivelIni;
    let atributosFeat:Personaje = atributosFeatIni;
    let atributosRaza:Personaje = atributosRazaIni;

    function actualizarBonusNivel(nivel: number){
        let puntos_utilizados = 0;
        for (let i = 1; i < nivel; i++){
  
          if (i >= 9){
  
            puntos_utilizados = puntos_utilizados + 2;
          }
          else{
            puntos_utilizados++;
          }
        }
        setSettings({...settings, "BonusNivel":puntos_utilizados,"Nivel": nivel})
      }

      function resetElements(){
        setAtributos(atributosInicial);
        setAtributosFeat(atributosFeatInicial); 
        setAtributosNivel(atributosNivelInicial);
        setAtributosRaza(atributosRazaInicial);
        setSettings(atributosPrincipalesInicial);
      }


    return (
    <div className={settingsModule.settingsStyle}>
    <div className={settingsModule.settingsTitle}>Settings del Personaje</div>
    <div className={settingsModule.settingsBody}>
      <div>
        Puntos disponibles =  
        <input value={settings.PuntosDisponibles} onChange={e => setSettings({...settings, "PuntosDisponibles":Number(e.target.value)})}></input>
      </div>
      <div>
        Nivel del personaje = 
        <input value = {settings.Nivel} placeholder='Nivel' onChange={e => actualizarBonusNivel(Number(e.target.value))}></input>
      </div>
      <div> Puntos de nivel disponibles = {settings.BonusNivel}</div>
      <div style={{'color':'red'}}> ¡¡Maximum Ability Score = {settings.AbilityScoreMaximo}!!</div>
    </div>
    <button className={settingsModule.button_container} onClick= { e => resetElements()}> Resetear Datos</button>
  </div>
  )
}