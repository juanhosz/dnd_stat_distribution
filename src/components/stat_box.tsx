import { useCallback, useEffect, useState } from "react";
import calcularPuntosOverflow, { BonusNivelFuncion, calcularPuntosUtilizados, verificarSiUtilizanMasPuntos } from "../utils/statCalculatorModule";
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


    //TODO: Se debe implementar el maximo ability score para el proximo update;
    //TODO:30 a 35 te cuesta 2 y 35 es el cap . en 35 tenes un +14, 31 te cuesta 2
    //TODO:nivel 5 incluido no podes pasarte de 20  y en 14 podes poner puntos mas alla de 30
    
    //const [statInicial,setStatInicial] = useState(10); //* Numero de los stats al distribuir
    const [estadistica_final,setEstadisticaFinal] = useState(atributos[statName] + atributosFeat[statName] + atributosNivel[statName]+ atributosRaza[statName]); //* Numero que indica el ability score final
    //const [bonus_raza, setBonusRaza] = useState(0); //* Numero que indical los puntos que otorga la raza
    //const [bonus_nivel, setBonusNivel] = useState(0); //* Numero que indica los puntos que se agregaron por el nivel
    const [modificadorAbilidad,setModificador] = useState(0);
    //const [bonusFeat,setBonusFeat] = useState(0);


    function setear_caracteristica(stat:any){

        let statFinal = Number(stat.target.value);
        let ptos_disponibles = Number(settings.PuntosDisponibles);

        if ( statFinal> atributos[statName] && Math.abs(verificarSiUtilizanMasPuntos(atributos[statName],statFinal)) > ptos_disponibles){
            calcularPuntosOverflow(atributos,setAtributos,statFinal,settings,setSettings,estadistica_final,nombreStat);
            return;
            
        }

        if (statFinal > 13 || (atributos[statName] === 14)){
            if (ptos_disponibles < 2 && statFinal> atributos[statName]){
                console.log("No hay puntos suficientes");
                return;
            }
        };

        if(ptos_disponibles <= 0 && statFinal> atributos[statName]){
            console.log("No hay puntos disponbiles");
            return;
        };

        let [puntos_utilizados,puntos_adicionales] = calcularPuntosUtilizados(atributos[statName],statFinal,settings.AbilityScoreMaximo,estadistica_final);
        setSettings({...settings, "PuntosDisponibles":ptos_disponibles + puntos_utilizados});
        setAtributos({...atributos, [nombreStat]: atributos[statName]+puntos_adicionales});
        return;

    }

    const calcular_modificador = useCallback(() =>{
        let puntos = 0;
        if (estadistica_final === 35){
            setModificador(14);
            return;
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

                <td><input className={rowStyle.caracteristica_input} type="number" placeholder="Estadisticas iniciales" min={0} value = {atributos[statName].toString()} onChange = {e => setear_caracteristica(e)}
                onKeyDown = {(event) => {setear_caracteristica(event)}}>
                </input>
                </td>

                <td>
                <input type="number" placeholder="Bonus de raza" min = {0} value = {atributosRaza[statName]} onChange = {e => setAtributosRaza({...atributosRaza, [nombreStat]:Number(e.target.value)})}>
                </input>
                </td>
                <td>
                <input type = "number" placeholder="Bonus de Feat" min = {0} value = {atributosFeat[statName]} onChange = {e => setAtributosFeat({...atributosFeat,[nombreStat]:Number(e.target.value)})}></input>
                </td>
                <td>
                <input type="number" placeholder="Bonus de Nivel" min = {0} max = {atributosNivel[statName]+settings.BonusNivel} title = {"bonus de nivel"} value = {atributosNivel[statName].toString()} onChange = {e => setBonusNivelFuncion(Number(e.target.value))}> 
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
