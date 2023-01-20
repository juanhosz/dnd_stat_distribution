import { useEffect, useState } from "react";
import { isCallSignatureDeclaration } from "typescript";

export const StatBox = (props: any) =>{
    let stat = props.stat_name;
    let setPuntosDisponibles = props.setPuntosDisponibles;
    let puntos_disponibles = props.puntos_disponibles;
    let ptosnivel = props.bonus_nivel
    let setPtosNivel = props.setBonusNivel
    let nivel_pj = props.nivel_pj;

    const [numero,setNumero] = useState(10)
    const [estadistica_final,setEstadisticaFinal] = useState(10)
    const [bonus_raza, setBonusRaza] = useState(0)
    const [bonus_nivel, setBonusNivel] = useState(0)
    const [modificador,setModificador] = useState(0)


    function setear_caracteristica(stat:any){
        let numero_final = Number(stat.target.value);
        let ptos_disponibles = Number(puntos_disponibles);

        if ( numero_final> numero && Math.abs(calcularPuntosUtilizados(numero,numero_final)) > ptos_disponibles){
            let numero_maximo = calcularNumeroMaximo(numero,numero_final)
            let ptos_utilizados = calcularPuntosUtilizados(numero,numero_maximo)
            console.log("El score que se pondra es de:", numero_maximo)
            setPuntosDisponibles(ptos_disponibles + ptos_utilizados);
            setNumero(numero_maximo);
            return
        }

        if (numero_final > 13 || (numero == 14)){
            if (ptos_disponibles < 2 && numero_final> numero){
                console.log("No hay puntos suficientes")
                return;
            }
                    //setEstadisticaFinal(Number(estadistica_final)-1)
                    setPuntosDisponibles(ptos_disponibles+calcularPuntosUtilizados(numero,numero_final))
                    setNumero(numero_final);

            return;
        }
        if(ptos_disponibles <= 0 && numero_final> numero){
            console.log("No hay puntos disponbiles")
            return
        }
        //setEstadisticaFinal(Number(estadistica_final)-1)
        setPuntosDisponibles(ptos_disponibles+calcularPuntosUtilizados(numero,numero_final))
        setNumero(numero_final);
        return;

    }


    function calcularNumeroMaximo(inicial:any, final:any){
        let sumatoria = 0;
        let numero_actual = 0;
        let ptos_disponibles = Number(puntos_disponibles)
            for (let i = inicial; i< final;i++){
                numero_actual = i;
                if (sumatoria == ptos_disponibles){
                    return i;
                }
                if (i >= 13){
                    sumatoria = sumatoria + 2;
                }
                else{
                    sumatoria++;
                }
            }
        return Number(numero_actual);
    }

    function calcularPuntosUtilizados(inicial:any,final:any){
        let sumatoria = 0;
        if (inicial < final){
            for (let i = inicial; i< final;i++){
                if (i >= 13){
                    sumatoria = sumatoria - 2;
                }
                else{
                    sumatoria--;
                }
            }
        }
        else{
            for (let i = final; i< inicial;i++){
                if (i >= 13){
                    sumatoria = sumatoria + 2;
                }
                else{
                    sumatoria++;
                }
            }
        }
        return Number(sumatoria);
    }




    function calcular_modificador(){
        let sumatoria = 0;
        if(estadistica_final === 10){

            setModificador(0);
            return;
        }
        if (estadistica_final > 10){
            for (let i =0; i < estadistica_final; i++){
                if (i >= 10){
                    sumatoria++;
                }
            }
        }
        else{
            for (let i = 10; i> estadistica_final; i--){
                sumatoria--;
            }
        }
        setModificador(Math.floor(sumatoria/2));
    }

    useEffect(() =>{
        setEstadisticaFinal(Number(numero) + Number(bonus_nivel) + Number(bonus_raza));

        //calcular_modificador();
    },[bonus_nivel,bonus_raza,numero])

    useEffect(() =>{
        calcular_modificador();
    },[estadistica_final])


    useEffect(() =>{
        setBonusNivel(0);
    },[nivel_pj])



    function setBonusNivelFuncion(stat:any){
        let bonus_final = Number(stat);
        let bonus_inicial = Number(bonus_nivel);
        let ptos_disponibles = Number(ptosnivel);
        let sumatoria = 0
        console.log("Los puntos disponibles son:", ptos_disponibles)
        if (bonus_final > bonus_inicial){
            if (ptos_disponibles == 0){
                setBonusNivel(bonus_inicial);
            }
            for (let i = bonus_inicial; i < bonus_final;i++){
                if (sumatoria == ptos_disponibles){
                    setBonusNivel(bonus_inicial+sumatoria);
                    setPtosNivel(ptos_disponibles-sumatoria)
                    return;
                }
                sumatoria++
            }
            setBonusNivel(bonus_final);
            setPtosNivel(ptos_disponibles-sumatoria)
            return
        }
        else{
            for (let i = bonus_inicial; i > bonus_final;i--){
                sumatoria++
            }
            setBonusNivel(bonus_final);
            setPtosNivel(ptosnivel+sumatoria)
            return
        }

    }

    function modificador_positivo(){
        if (modificador >= 0) return true;
        return false;
    }

    return(
            <tr>
                <td className="stat_name">{stat}</td>

                <td><input className="caracteristica_input" type="number" placeholder="Estadisticas iniciales" min={0} value = {numero.toString()} onChange = {e => setear_caracteristica(e)}
                onKeyDown = {(event) => {setear_caracteristica(event)}}>
                </input>
                </td>

                <td>
                <input type="number" placeholder="Bonus de raza" min = {0} onChange = {e => setBonusRaza(Number(e.target.value))}>
                </input>
                </td>

                <td>
                <input type="number" placeholder="Bonus de nivel" min = {0} max = {bonus_nivel+ptosnivel} title = {"bonus de nivel"} value = {bonus_nivel.toString()} onChange = {e => setBonusNivelFuncion(Number(e.target.value))}> 
                </input>
                </td>

                <td>
                <div className="caracteristica_total"> = {estadistica_final}  </div>
                </td>

                {modificador_positivo()&& <td className="box_modificador" style={{'color':'green'}}> + {modificador}</td>}
                {!modificador_positivo()&& <td className="box_modificador" style={{'color':'red'}}>  {modificador}</td>}
                
            </tr>
    );
}