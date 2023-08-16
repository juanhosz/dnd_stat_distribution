import { Atributos, Personaje } from "../types/types";


export default function calcularPuntosOverflow(atributos:Personaje,setAtributos:any,statFinal:number,settings:Atributos,setSettings:any,estadistica_final:number,nombre:string,atributosNivel:Personaje){
    let statName = nombre as keyof Personaje;
    let statInicial = atributos[statName]
    let [puntosUtilizados,puntosAdicionales] = calcularPuntosAGastar(statInicial,statFinal,settings.AbilityScoreMaximo,settings.PuntosDisponibles,estadistica_final)
    //*let [ptos_utilizados,puntos_adicionales] = calcularPuntosUtilizados(statFinal,numero_maximo,settings.AbilityScoreMaximo,estadistica_final);
    setSettings({...settings, "PuntosDisponibles":settings.PuntosDisponibles + puntosUtilizados});
    setAtributos({...atributos, [nombre]:statFinal+puntosUtilizados});
    return
}

export function calcularStatFinalMaximo(inicial:any, final:any,puntosDisponibles:number,maximo:number,atributoNivel:number, estadistica_final:number){
    let puntos_utilizados = 0;
    let numero_actual = 0;
    let puntos_adicionales = 0;
    let ptos_disponibles = puntosDisponibles;
    for (let i = inicial; i< final;i++){
        numero_actual = i;
        if (estadistica_final + puntos_adicionales === maximo || puntos_utilizados === ptos_disponibles){
            return [i,-puntos_utilizados]
        }
        if (i >= 13 || estadistica_final + puntos_adicionales > 30){
            if (puntos_utilizados + 2 > ptos_disponibles || (puntos_utilizados +2 > ptos_disponibles && estadistica_final + puntos_adicionales == maximo)){
                return [i,-puntos_utilizados];
            }
            puntos_utilizados = puntos_utilizados + 2;
        }
        else{
            puntos_utilizados++;
        }
        puntos_adicionales++;
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
            if (estadistica_final + puntos_adicionales === maximo){
                
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


export  function BonusNivelFuncion(stat:any,
                atributosNivel:Personaje,
                settings:Atributos,
                estadistica_final:number,
                setAtributosNivel:any,setSettings:any,statName:keyof Personaje, nombreStat:string, atributos:Personaje,
                estado:boolean){
    let bonus_final = Number(stat);
    let bonus_inicial = Number(atributosNivel[statName]);
    let ptos_disponibles = Number(settings.BonusNivel);
    if (estado){

        ptos_disponibles = Number(settings.PuntosDisponiblesLegend)
    }
    let puntos_utilizados = 0;
    let puntos_adicionales = 0;
    if (bonus_final > bonus_inicial){
        if (ptos_disponibles === 0){

            setAtributosNivel({...atributosNivel, [nombreStat]:bonus_inicial});
            return
        }
        
        for (let i = bonus_inicial; i < bonus_final ;i++){

            if (estadistica_final == 30){
                break;
            }
            
            if (estadistica_final + puntos_adicionales == 30){
                break
            }
            if( puntos_utilizados +1 > ptos_disponibles){
                break
            }

            puntos_adicionales++;
            puntos_utilizados++;
            
        }
        

        setAtributosNivel({...atributosNivel, [nombreStat]:bonus_inicial + puntos_adicionales})
        setSettings({...settings, "BonusNivel":ptos_disponibles-puntos_utilizados});
        return
    }
    else{

        for (let i = bonus_inicial; i > bonus_final;i--){
            if (estadistica_final - puntos_adicionales> 30){
                puntos_utilizados = puntos_utilizados + 2;
            }
            else{
                puntos_utilizados++;
            }
            puntos_adicionales++
            
        }
        if (estado){
            setAtributosNivel({...atributosNivel, [nombreStat]:bonus_final});
            setSettings({...settings, "PuntosDisponiblesLegend":ptos_disponibles+puntos_utilizados});
            return
        }
        setAtributosNivel({...atributosNivel, [nombreStat]:bonus_final});
        setSettings({...settings, "BonusNivel":ptos_disponibles+puntos_utilizados});
        return
    }

}

export  function BonusNivelFuncionLegendario(stat:any,
    atributosNivel:Personaje,
    settings:Atributos,
    estadistica_final:number,
    setAtributosNivel:any,setSettings:any,statName:keyof Personaje, nombreStat:string, atributos:Personaje,
    estado:boolean){
    let bonus_final = Number(stat);
    let bonus_inicial = Number(atributosNivel[statName]);
    let ptos_disponibles = Number(settings.BonusNivel);
    if (estado){
        ptos_disponibles = Number(settings.PuntosDisponiblesLegend)
    }
    let puntos_utilizados = 0;
    let puntos_adicionales = 0;
    if (bonus_final > bonus_inicial && estado){
        if (ptos_disponibles === 0){
            setAtributosNivel({...atributosNivel, [nombreStat]:bonus_inicial});
            return
        }

        for (let i = bonus_inicial; i < bonus_final ;i++){
            if (estadistica_final == 35){
                break;
            }
            if (estadistica_final + puntos_adicionales < 30){
                console.log("asd")
                puntos_utilizados ++;
            }
            if (estadistica_final + puntos_adicionales + 1 > 35){
                break
            }
            if (puntos_utilizados > ptos_disponibles){
                break
            }
            if (estadistica_final + puntos_adicionales ==35){
                break
            }
            if (estadistica_final + puntos_adicionales >= 30){
                if (estadistica_final + puntos_adicionales + 1 > 35){
                    break
                }
                if (puntos_utilizados + 2 > ptos_disponibles){
                    
                    break
                }
                puntos_utilizados = puntos_utilizados + 2
            }

            puntos_adicionales++;
        }

        if (estado){
            setAtributosNivel({...atributosNivel, [nombreStat]:bonus_inicial + puntos_adicionales})
            setSettings({...settings, "PuntosDisponiblesLegend":ptos_disponibles-puntos_utilizados});
            return
        }
        setAtributosNivel({...atributosNivel, [nombreStat]:bonus_final})
        setSettings({...settings, "BonusNivel":ptos_disponibles-puntos_utilizados});
        return
    }

    else{

        for (let i = bonus_inicial; i > bonus_final;i--){
            if (estadistica_final - puntos_adicionales> 30){
                puntos_utilizados = puntos_utilizados + 2;
            }
            else{
                puntos_utilizados++;
            }
            puntos_adicionales++

        }
    if (estado){
            setAtributosNivel({...atributosNivel, [nombreStat]:bonus_final});
            setSettings({...settings, "PuntosDisponiblesLegend":ptos_disponibles+puntos_utilizados});
            return
    }
    setAtributosNivel({...atributosNivel, [nombreStat]:bonus_final});
    setSettings({...settings, "BonusNivel":ptos_disponibles+puntos_utilizados});
    return
}

}

// function verificarSiMaximoFinalNivel(bonus_final:number,maximo:number,estadistica_final:number){
//     if (bonus_final + estadistica_final > maximo){
//         return maximo - estadistica_final;
//     }
//     else{
//         return bonus_final;
//     }
// }





export function calcularPuntosAGastar(inicial:number,final:number,maximo:number, puntosDisponibles:number,estadisticaFinal:number){
    let puntosAGastar = 0;
    let puntosDevueltos = 0;
    let puntosASumar  = 0;
    let puntosARestar = 0;
    if (inicial <= final){
        for (let i = inicial; i < comprararFinalYMaximo((final-inicial)+ estadisticaFinal,maximo,final); i++){
            if (puntosDisponibles < puntosAGastar + 2 && (i >= 13 || (estadisticaFinal >= 13 && i > 13))){
                return [-puntosAGastar,puntosASumar];
            }
            if (puntosDisponibles < puntosAGastar +1){
                return [-puntosAGastar,puntosASumar];
            }
            if (estadisticaFinal + puntosASumar == maximo){
                return [-puntosAGastar,puntosASumar];
            }
            if (i >= 13 || (estadisticaFinal >= 13 && i > 13)){
                
                puntosAGastar = puntosAGastar + 2;
            }
            else{

                puntosAGastar++;
            }

            puntosASumar++;
        }
        
        return [-puntosAGastar,puntosASumar];
    }
    else{
        for (let i = inicial; i > final; i--){
            if (i > 13 || (estadisticaFinal > 13 && i > 13)){
                
                puntosDevueltos = puntosDevueltos + 2;
            }
            else{
                
                puntosDevueltos++;
            }

            puntosARestar--;
        }
        return [puntosDevueltos,puntosARestar];
    }

}


function comprararFinalYMaximo(final:number,maximo:number,finalNumber:number){
    if (final > maximo){
        return maximo;
    }
    return finalNumber;
}

function calcularPuntosAgregados(statInicial:number,statFinal:number,estadisticaFinal:number,puntosDisponibles:number, maximo:number){
    let [puntosAGastar,puntosASumar] = calcularPuntosAGastar(statInicial,statFinal,maximo,puntosDisponibles,estadisticaFinal);

}