import { useCallback, useEffect, useState } from "react";
import calcularPuntosOverflow, { BonusNivelFuncion, calcularPuntosAGastar, verificarSiUtilizanMasPuntos } from "../utils/statCalculatorModule";
import rowStyle from "../styles/row.module.css"
import {Atributos, Personaje} from "../types/types"


export const StatBox = (props: any) =>{
    
    const nombreStat: string = props.stat_name;
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

    
    //const [statInicial,setStatInicial] = useState(10); //* Numero de los stats al distribuir
    const [estadistica_final,setEstadisticaFinal] = useState(atributos[statName] + atributosFeat[statName] + atributosNivel[statName]+ atributosRaza[statName]); //* Numero que indica el ability score final
    //const [bonus_raza, setBonusRaza] = useState(0); //* Numero que indical los puntos que otorga la raza
    //const [bonus_nivel, setBonusNivel] = useState(0); //* Numero que indica los puntos que se agregaron por el nivel
    const [modificadorAbilidad,setModificador] = useState(0);
    //const [bonusFeat,setBonusFeat] = useState(0);


    function setear_caracteristica(stat:any){

        let statFinal = Number(stat.target.value);
        let ptos_disponibles = Number(settings.PuntosDisponibles);
        if (statFinal > settings.AbilityScoreMaximo){
            statFinal = settings.AbilityScoreMaximo;
        }
        let [puntosUtilizados,puntosAdicionales] = calcularPuntosAGastar(atributos[statName],statFinal,settings.AbilityScoreMaximo,settings.PuntosDisponibles,estadistica_final)
        setSettings({...settings, "PuntosDisponibles":ptos_disponibles + puntosUtilizados});
        setAtributos({...atributos, [nombreStat]: atributos[statName]+puntosAdicionales});
        return;

    }

    const calcular_modificador = useCallback(() =>{
        let puntos = 0;
        if (estadistica_final === 35){
                setModificador(14);
            return;
        }
        if (estadistica_final > 35){
            let stat = estadistica_final -35;
            let suma = 0;
            for (let i = 0; i < stat; i++){
                suma++;
            }
            setModificador(14+ Math.floor(stat/2));
            return
        }
        if(estadistica_final === 10){
            setModificador(0);
            return;
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
        setModificador(Math.floor(puntos/2));
    },[estadistica_final])

    function setBonusNivelFuncion(stat:any){
        BonusNivelFuncion(stat,atributosNivel,settings,estadistica_final,setAtributosNivel,setSettings,statName,nombreStat,atributos);
        return;
    }


    function modificador_positivo(){
        if (modificadorAbilidad >= 0) return true;
        return false;
    }
    useEffect(() =>{
        setEstadisticaFinal(Number(atributos[statName]) + Number(atributosNivel[statName]) + Number(atributosRaza[statName]) + Number(atributosFeat[statName]));

        //calcular_modificador();
    },[atributosNivel[statName],atributos[statName],atributosFeat[statName],atributosRaza[statName],statName]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() =>{
        calcular_modificador();
    },[estadistica_final, calcular_modificador]);

    return(
            <tr id = {nombreStat}>
                <td className={rowStyle.stat_name}>{nombreStat}</td>

                <td><input className={rowStyle.inputBar} type="number"  inputMode= "numeric" placeholder="Estadisticas iniciales" min={0} 
                        value = {atributos[statName].toString()} onChange = {e => setear_caracteristica(e)} onKeyDown = {(event) => {setear_caracteristica(event)}}>
                </input>
                </td>

                <td>
                    <input className = {rowStyle.inputBar} inputMode= "numeric" type="number" placeholder="Bonus de raza" min = {0} 
                        value = {atributosRaza[statName].toString()} onChange = {e => setAtributosRaza({...atributosRaza, [nombreStat]:Number(e.target.value)})}>
                    </input>
                </td>
                <td>
                    <input  className = {rowStyle.inputBar} inputMode = "numeric" type = "number" placeholder="Bonus de Feat" min = {0} 
                        value = {atributosFeat[statName].toString()} onChange = {e => setAtributosFeat({...atributosFeat,[nombreStat]:Number(e.target.value)})}></input>
                    </td>
                <td>
                    <input className = {rowStyle.inputBar} inputMode= "numeric" type="number" placeholder="Bonus de Nivel" min = {0} 
                        max = {atributosNivel[statName]+settings.BonusNivel} title = {"bonus de nivel"} 
                        value = {atributosNivel[statName].toString()} onChange = {e => setBonusNivelFuncion(Number(e.target.value))}> 
                    </input>
                </td>

                <td>
                <div className="caracteristica_total"> = {estadistica_final}  </div>
                </td>

                {modificador_positivo()&& <td className={rowStyle.box_modificador} style={{'color':'green'}}> + {modificadorAbilidad}</td>}
                {!modificador_positivo()&& <td className={rowStyle.box_modificador} style={{'color':'red'}}>  {modificadorAbilidad}</td>}
                
            </tr>
    );
}
