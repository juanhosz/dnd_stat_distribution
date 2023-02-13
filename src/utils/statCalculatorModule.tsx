import { Atributos, Personaje } from "../components/types";


export default function calcularPuntosOverflow(atributos:Personaje,setAtributos:any,statFinal:number,settings:Atributos,setSettings:any,estadistica_final:number,nombre:string){
    let statName = nombre as keyof Personaje;
    let statInicial = atributos[statName]
    let [numero_maximo,puntos_utilizados] = calcularStatFinalMaximo(statInicial,statFinal,settings.PuntosDisponibles,settings.AbilityScoreMaximo);
    let [ptos_utilizados,puntos_adicionales] = calcularPuntosUtilizados(statFinal,numero_maximo,settings.AbilityScoreMaximo,estadistica_final);
    setSettings({...settings, "PuntosDisponibles":settings.PuntosDisponibles + puntos_utilizados});
    setAtributos({...atributos, [nombre]:numero_maximo});
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
            if (puntos_utilizados + 2 > ptos_disponibles){
                return [i,-puntos_utilizados];
            }
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

export  function BonusNivelFuncion(stat:any,atributosNivel:Personaje,settings:Atributos,estadistica_final:number,setAtributosNivel:any,setSettings:any,statName:keyof Personaje, nombreStat:string){
    let bonus_final = Number(stat);
    let bonus_inicial = Number(atributosNivel[statName]);
    let ptos_disponibles = Number(settings.BonusNivel);
    let puntos_utilizados = 0;
    let puntos_adicionales = 0;
    if (bonus_final > bonus_inicial){
        if (ptos_disponibles == 0){
            setAtributosNivel({...atributosNivel, [nombreStat]:bonus_inicial});
        }
        
        for (let i = bonus_inicial; i < bonus_final;i++){
            if (puntos_adicionales + estadistica_final == settings.AbilityScoreMaximo){
                setAtributosNivel({...atributosNivel, [nombreStat]:bonus_inicial+puntos_adicionales});
                setSettings({...settings, "BonusNivel":ptos_disponibles-puntos_utilizados});
                return;
            }
            if (puntos_utilizados == ptos_disponibles){
                setAtributosNivel({...atributosNivel, [nombreStat]:bonus_inicial+puntos_adicionales});
                setSettings({...settings, "BonusNivel":ptos_disponibles-puntos_utilizados});
                return;
            }
            if (settings.AbilityScoreMaximo == 35 && estadistica_final + puntos_adicionales >= 30){
                if (puntos_utilizados + 2 > ptos_disponibles){
                    setAtributosNivel({...atributosNivel, [nombreStat]:bonus_inicial+puntos_adicionales});
                    setSettings({...settings, "BonusNivel":ptos_disponibles-puntos_utilizados});
                    return;
                }
                puntos_utilizados = puntos_utilizados +2;
            }
            else{
                puntos_utilizados++;
            }
            puntos_adicionales++;
            
        }
        setAtributosNivel({...atributosNivel, [nombreStat]:bonus_final})
        setSettings({...settings, "BonusNivel":ptos_disponibles-puntos_utilizados});
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
        setAtributosNivel({...atributosNivel, [nombreStat]:bonus_final});
        setSettings({...settings, "BonusNivel":ptos_disponibles+puntos_utilizados});
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