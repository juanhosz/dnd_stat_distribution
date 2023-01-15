import { useEffect, useState } from "react";

export const StatBox = (props: any) =>{
    let stat = props.stat_name;
    let setPuntosDisponibles = props.setPuntosDisponibles;
    let puntos_disponibles = props.puntos_disponibles;
    let nivel = props.bonus_nivel
    let setNivel = props.setBonusNivel

    const [numero,setNumero] = useState(0)
    const [estadistica_final,setEstadisticaFinal] = useState(0)
    const [bonus_raza, setBonusRaza] = useState(0)
    const [bonus_nivel, setBonusNivel] = useState(0)


    function setear_caracteristica(stat:any){
        let numero_final = stat.target.value;
        if (numero_final > 13 || (numero == 14)){
            if (puntos_disponibles < 2){
                console.log("No hay puntos suficientes")
            }
            else{
                setNumero(numero_final);
                if (numero_final > numero){
                    setEstadisticaFinal(Number(estadistica_final)+1)
                    setPuntosDisponibles(puntos_disponibles-2)
                }
                else{
                    setEstadisticaFinal(Number(estadistica_final)-1)
                    setPuntosDisponibles(puntos_disponibles+2)
                }
            }
            return;
        }
        setNumero(numero_final);
        if (numero_final > numero){
            setEstadisticaFinal(Number(estadistica_final)+1)
            setPuntosDisponibles(puntos_disponibles-1)
        }
        else{
            setEstadisticaFinal(Number(estadistica_final)-1)
            setPuntosDisponibles(puntos_disponibles+1)
        }
        return;

    }

    useEffect(() =>{
        setEstadisticaFinal(Number(numero) + Number(bonus_nivel) + Number(bonus_raza));
    },[bonus_nivel,bonus_raza,numero])


    function setBonusNivelFuncion(stat:any){

        if (stat < bonus_nivel){
            setNivel(nivel+1)
            console.log("se entra aca")
        }
        else{
            if (nivel ==0){
                return
            }
            setNivel(nivel-1)
        }
        setBonusNivel(stat)
        return;
    }

    console.log(stat);
    return(
        <div className="caracteristica">
            <div className="stat_name">{stat}</div>
            <input className="caracteristica_input" type="number" placeholder="Estadisticas iniciales" min={0} value = {numero} onChange = {e => setear_caracteristica(e)} onKeyDown={(event) => {
      event.preventDefault();
    }}></input>
            +
            <input type="number" placeholder="Bonus de raza" min = {0} onChange = {e => setBonusRaza(Number(e.target.value))} onKeyDown={(event) => {
      event.preventDefault();
    }}></input>
            +
            <input type="number" placeholder="Bonus de nivel" min = {0} max = {bonus_nivel+nivel} onChange = {e => setBonusNivelFuncion(Number(e.target.value))} onKeyDown={(event) => {
      event.preventDefault();
    }}></input>
            <div className="caracteristica_total"> = {estadistica_final}  </div>
            <div></div>
        </div>
    );
}