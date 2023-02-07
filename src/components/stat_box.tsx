import { useEffect, useState } from "react";
import calcularPuntosOverflow, { BonusNivelFuncion, calcularPuntosUtilizados, calcularStatFinalMaximo, verificarSiMaximoFinal, verificarSiUtilizanMasPuntos } from "../utils/statCalculatorModule";
import CalculatorService from "../utils/statCalculatorModule";
import rowStyle from "../styles/row.module.css"


export const StatBox = (props: any) =>{
    
    let nombreStat = props.stat_name;
    let setPuntosDisponibles = props.setPuntosDisponibles;
    let puntos_disponibles = props.puntos_disponibles;
    let ptosnivel = props.bonus_nivel;
    let setPtosNivel = props.setBonusNivel;
    let nivel_pj = props.nivel_pj;
    let maximumAbilityScore = props.maximumAbilityScore;


    //TODO: Se debe implementar el maximo ability score para el proximo update;
    //TODO:30 a 35 te cuesta 2 y 35 es el cap . en 35 tenes un +14, 31 te cuesta 2
    //TODO:nivel 5 incluido no podes pasarte de 20  y en 14 podes poner puntos mas alla de 30
    
    const [statInicial,setStatInicial] = useState(10); //* Numero de los stats al distribuir
    const [estadistica_final,setEstadisticaFinal] = useState(10); //* Numero que indica el ability score final
    const [bonus_raza, setBonusRaza] = useState(0); //* Numero que indical los puntos que otorga la raza
    const [bonus_nivel, setBonusNivel] = useState(0); //* Numero que indica los puntos que se agregaron por el nivel
    const [modificadorAbilidad,setModificador] = useState(0);
    const [bonusFeat,setBonusFeat] = useState(0);


    function setear_caracteristica(stat:any){
        let statFinal = Number(stat.target.value);
        let ptos_disponibles = Number(puntos_disponibles);

        if ( statFinal> statInicial && Math.abs(verificarSiUtilizanMasPuntos(statInicial,statFinal)) > ptos_disponibles){
            calcularPuntosOverflow(statInicial,statFinal,maximumAbilityScore,ptos_disponibles,setPuntosDisponibles,setStatInicial,estadistica_final);
            return;
            
        }

        if (statFinal > 13 || (statInicial === 14)){
            if (ptos_disponibles < 2 && statFinal> statInicial){
                console.log("No hay puntos suficientes");
                return;
            }
        };

        if(ptos_disponibles <= 0 && statFinal> statInicial){
            console.log("No hay puntos disponbiles");
            return;
        };

        let [puntos_utilizados,puntos_adicionales] = calcularPuntosUtilizados(statInicial,statFinal,maximumAbilityScore,estadistica_final);
        setPuntosDisponibles(ptos_disponibles + puntos_utilizados);
        setStatInicial(statInicial+puntos_adicionales);
        return;

    }

    function calcular_modificador(){
        let puntos = 0;
        if (estadistica_final == 35){
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
    }

    useEffect(() =>{
        setEstadisticaFinal(Number(statInicial) + Number(bonus_nivel) + Number(bonus_raza) + Number(bonusFeat));

        //calcular_modificador();
    },[bonus_nivel,bonus_raza,statInicial,bonusFeat]);

    useEffect(() =>{
        calcular_modificador();
    },[estadistica_final]);


    useEffect(() =>{
        setBonusNivel(0);
    },[nivel_pj]);



    function setBonusNivelFuncion(stat:any){
        BonusNivelFuncion(stat,bonus_nivel,ptosnivel,setBonusNivel,setPtosNivel, maximumAbilityScore,estadistica_final);
        return;
    }

    function modificador_positivo(){
        if (modificadorAbilidad >= 0) return true;
        return false;
    }

    return(
            <tr id = {nombreStat}>
                <td className={rowStyle.stat_name}>{nombreStat}</td>

                <td><input className={rowStyle.caracteristica_input} type="number" placeholder="Estadisticas iniciales" min={0} value = {statInicial.toString()} onChange = {e => setear_caracteristica(e)}
                onKeyDown = {(event) => {setear_caracteristica(event)}}>
                </input>
                </td>

                <td>
                <input type="number" placeholder="Bonus de raza" min = {0} onChange = {e => setBonusRaza(Number(e.target.value))}>
                </input>
                </td>
                <td>
                <input type = "number" placeholder="Bonus de Feat" min = {0} onChange = {e => setBonusFeat(Number(e.target.value))}></input>
                </td>
                <td>
                <input type="number" placeholder="Bonus de Nivel" min = {0} max = {bonus_nivel+ptosnivel} title = {"bonus de nivel"} value = {bonus_nivel.toString()} onChange = {e => setBonusNivelFuncion(Number(e.target.value))}> 
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
