import { useEffect, useState } from "react";

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
    
    const [statInical,setStatInicial] = useState(10); //* Numero de los stats al distribuir
    const [estadistica_final,setEstadisticaFinal] = useState(10); //* Numero que indica el ability score final
    const [bonus_raza, setBonusRaza] = useState(0); //* Numero que indical los puntos que otorga la raza
    const [bonus_nivel, setBonusNivel] = useState(0); //* Numero que indica los puntos que se agregaron por el nivel
    const [modificadorAbilidad,setModificador] = useState(0);
    const [bonusFeat,setBonusFeat] = useState(0);


    function setear_caracteristica(stat:any){
        let statFinal = Number(stat.target.value);
        let ptos_disponibles = Number(puntos_disponibles);



        if ( statFinal> statInical && Math.abs(calcularPuntosUtilizados(statInical,statFinal)) > ptos_disponibles){
            
            let numero_maximo = calcularStatFinalMaximo(statInical,statFinal);
            let ptos_utilizados = calcularPuntosUtilizados(statInical,numero_maximo);
            setPuntosDisponibles(ptos_disponibles + ptos_utilizados);
            setStatInicial(numero_maximo);
            return
        }

        if (statFinal > 13 || (statInical === 14)){
            if (ptos_disponibles < 2 && statFinal> statInical){
                console.log("No hay puntos suficientes");
                return;
            }
        };

        if(ptos_disponibles <= 0 && statFinal> statInical){
            console.log("No hay puntos disponbiles");
            return;
        };
        
        setPuntosDisponibles(ptos_disponibles+calcularPuntosUtilizados(statInical,statFinal));
        setStatInicial(statFinal);
        return;

    }


    function calcularStatFinalMaximo(inicial:any, final:any){
        let puntos_utilizados = 0;
        let numero_actual = 0;
        let ptos_disponibles = Number(puntos_disponibles)
            for (let i = inicial; i< final;i++){
                numero_actual = i;
                if (puntos_utilizados == ptos_disponibles){
                    return i;
                }
                if (i >= 13){
                    puntos_utilizados = puntos_utilizados + 2;
                }
                else{
                    puntos_utilizados++;
                }
            }
        return Number(numero_actual);
    }

    function calcularPuntosUtilizados(inicial:any,final:any){
        let puntos_utilizados = 0;
        if (inicial < final){
            for (let i = inicial; i< final;i++){
                if (i >= 13){
                    puntos_utilizados = puntos_utilizados - 2;
                }
                else{
                    puntos_utilizados--;
                }
            }
        }
        else{
            for (let i = final; i< inicial;i++){
                if (i >= 13){
                    puntos_utilizados = puntos_utilizados + 2;
                }
                else{
                    puntos_utilizados++;
                }
            }
        }
        return Number(puntos_utilizados);
    }




    function calcular_modificador(){
        let puntos = 0;
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
        setEstadisticaFinal(Number(statInical) + Number(bonus_nivel) + Number(bonus_raza) + Number(bonusFeat));

        //calcular_modificador();
    },[bonus_nivel,bonus_raza,statInical,bonusFeat]);

    useEffect(() =>{
        calcular_modificador();
    },[estadistica_final]);


    useEffect(() =>{
        setBonusNivel(0);
    },[nivel_pj]);



    function setBonusNivelFuncion(stat:any){
        let bonus_final = Number(stat);
        let bonus_inicial = Number(bonus_nivel);
        let ptos_disponibles = Number(ptosnivel);
        let puntos_utilizados = 0;
        if (bonus_final > bonus_inicial){
            if (ptos_disponibles == 0){
                setBonusNivel(bonus_inicial);
            }
            for (let i = bonus_inicial; i < bonus_final;i++){
                if (puntos_utilizados == ptos_disponibles){
                    setBonusNivel(bonus_inicial+puntos_utilizados);
                    setPtosNivel(ptos_disponibles-puntos_utilizados);
                    return;
                }
                puntos_utilizados++;
            }
            setBonusNivel(bonus_final);
            setPtosNivel(ptos_disponibles-puntos_utilizados);
            return
        }
        else{
            for (let i = bonus_inicial; i > bonus_final;i--){
                puntos_utilizados++
            }
            setBonusNivel(bonus_final);
            setPtosNivel(ptosnivel+puntos_utilizados);
            return
        }

    }

    function modificador_positivo(){
        if (modificadorAbilidad >= 0) return true;
        return false;
    }

    return(
            <tr>
                <td className="stat_name">{nombreStat}</td>

                <td><input className="caracteristica_input" type="number" placeholder="Estadisticas iniciales" min={0} value = {statInical.toString()} onChange = {e => setear_caracteristica(e)}
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

                {modificador_positivo()&& <td className="box_modificador" style={{'color':'green'}}> + {modificadorAbilidad}</td>}
                {!modificador_positivo()&& <td className="box_modificador" style={{'color':'red'}}>  {modificadorAbilidad}</td>}
                
            </tr>
    );
}