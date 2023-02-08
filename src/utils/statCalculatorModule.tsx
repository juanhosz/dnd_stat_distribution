

export default function calcularPuntosOverflow(statInicial:number,statFinal:number,maximo:number,puntosDisponibles:number,setPuntosDisponibles:any,setStatInicial:any,estadistica_final:number){
    let [numero_maximo,puntos_utilizados] = calcularStatFinalMaximo(statInicial,statFinal,puntosDisponibles,maximo);
    let [ptos_utilizados,puntos_adicionales] = calcularPuntosUtilizados(statFinal,numero_maximo,maximo,estadistica_final);
    setPuntosDisponibles(puntosDisponibles + puntos_utilizados);
    setStatInicial(numero_maximo);
    return
}

export function calcularStatFinalMaximo(inicial:any, final:any,puntosDisponibles:number,maximo:number){
    let puntos_utilizados = 0;
    let numero_actual = 0;
    let ptos_disponibles = puntosDisponibles;
    for (let i = inicial; i< final;i++){
        numero_actual = i;
        if (numero_actual === maximo){
            return [Number(numero_actual),-puntos_utilizados]
        }
        if (puntos_utilizados == ptos_disponibles){
            return [i,-puntos_utilizados];
        }
        if (i >= 13){
            puntos_utilizados = puntos_utilizados + 2;
        }
        else{
            puntos_utilizados++;
        }
    }
    return [Number(numero_actual),-puntos_utilizados];
}

export function verificarSiMaximoFinal(final:number,maximo:number){
    if (final > maximo){
        return maximo;
    }
    return final;
}


export function calcularPuntosUtilizados(inicial:any,final:any,maximo:number, estadistica_final:any){
    let puntos_utilizados = 0;
    let puntos_adicionales = 0;
    if (inicial < final){
        for (let i = inicial; i< final;i++){
            if (estadistica_final + puntos_adicionales == maximo){
                return [Number(puntos_utilizados),puntos_adicionales];
            }
            if (estadistica_final + puntos_adicionales >= 13 && i >= 13){
                puntos_utilizados = puntos_utilizados - 2;
            }
            else{
                puntos_utilizados--;
            }
            puntos_adicionales++;
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
            puntos_adicionales--;
        }
    }
    
    return [Number(puntos_utilizados),puntos_adicionales];
}


export function verificarSiUtilizanMasPuntos(inicial: number, final: number){
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

export  function BonusNivelFuncion(stat:any,bonus_nivel:number,ptosnivel:number,setBonusNivel:any,setPtosNivel:any,maximo:number,estadistica_final:number){
    let bonus_final = Number(stat);
    let bonus_inicial = Number(bonus_nivel);
    let ptos_disponibles = Number(ptosnivel);
    let puntos_utilizados = 0;
    let puntos_adicionales = 0;
    if (bonus_final > bonus_inicial){
        if (ptos_disponibles == 0){
            setBonusNivel(bonus_inicial);
        }
        
        for (let i = bonus_inicial; i < bonus_final;i++){
            if (puntos_adicionales + estadistica_final == maximo){
                setBonusNivel(bonus_inicial+puntos_adicionales);
                setPtosNivel(ptos_disponibles-puntos_utilizados);
                return;
            }
            if (puntos_utilizados == ptos_disponibles){
                setBonusNivel(bonus_inicial+puntos_utilizados);
                setPtosNivel(ptos_disponibles-puntos_utilizados);
                return;
            }
            if (maximo == 35 && estadistica_final + puntos_adicionales >= 30){
                if (puntos_utilizados + 2 > ptos_disponibles){
                    setBonusNivel(bonus_inicial+puntos_utilizados);
                    setPtosNivel(ptos_disponibles-puntos_utilizados);
                    return
                }
                puntos_utilizados = puntos_utilizados +2;
            }
            else{
                puntos_utilizados++;
            }
            puntos_adicionales++;
            
        }
        setBonusNivel(bonus_final);
        setPtosNivel(ptos_disponibles-puntos_utilizados);
        return
    }
    else{
        for (let i = bonus_inicial; i > bonus_final;i--){
            if (estadistica_final - puntos_adicionales > 30){
                puntos_utilizados = puntos_utilizados + 2;
            }
            else{
                puntos_utilizados++;
            }
            puntos_adicionales++
            
        }
        setBonusNivel(bonus_final);
        setPtosNivel(ptosnivel+puntos_utilizados);
        return
    }

}

function verificarSiMaximoFinalNivel(bonus_final:number,maximo:number,estadistica_final:number){
    if (bonus_final + estadistica_final > maximo){
        return maximo - estadistica_final;
    }
    else{
        return bonus_final;
    }
}