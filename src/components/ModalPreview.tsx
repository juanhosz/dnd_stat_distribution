import { useState } from "react"
import settingsStyle from '../styles/settings.module.css'
import { Atributos, Personaje } from "../types/types";

export function ModalPreview(props:any){

    const [isOpen, setisOpen] = useState(false)
    let stats = ["Strenght","Dexterity","Constitution","Intelligence","Wisdom","Charisma","Honor"];
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

    function calcular_modificador(estadistica_final:number){
        let puntos = 0;
        if (estadistica_final === 35){
            return 14;
        }
        if(estadistica_final === 10){
            return 0
        }
        if (estadistica_final > 10){
            for (let i =0; i < estadistica_final; i++){
                if (i >= 10){
                    puntos++;
                }
            }
        }
        else{
            for (let i = 10; i> estadistica_final; i--){
                puntos--;
            }
        }
        return Math.floor(puntos/2);
    }

    function finalStat(stat:keyof Personaje){
        let estadistica_final = atributos[stat] + atributosFeat[stat] + atributosNivel[stat] + atributosRaza[stat];
        let modificador = calcular_modificador(estadistica_final);
        return <tr>
            <td>{stat}</td>
            <td>{estadistica_final}</td>
            {(modificador>=0)?<td>+{modificador}</td>:<td>-{Math.abs(modificador)}</td>}
        </tr>
    }

    return (
    <div>
        {isOpen && 
            <div>
            <div className={settingsStyle.close_modal} onClick = {e => setisOpen(false)}></div>
            <div className={settingsStyle.modal}>
                <div className={settingsStyle.modal_content}>
                    <div className={settingsStyle.modal_title}>Preview de las stats</div>
                    <table className={settingsStyle.modal_table}>
                        <thead>
                            <tr>
                                <th>Stat</th>
                                <th>Ability Score</th>
                                <th>Ability Modifier</th>
                            </tr>
                        </thead>
                        <tbody>
                        {stats.map(stat =>
                            finalStat(stat as keyof Personaje))}
                        </tbody>
                    </table>
                <button onClick={ e => setisOpen(false)}> Close</button>
                </div>
            </div>
            </div>}

        <button className = {settingsStyle.preview_button}onClick={e => (setisOpen(true))}>
            Preview
        </button>
    </div>    
    )
}