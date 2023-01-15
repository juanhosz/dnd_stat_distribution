import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { StatBox } from './components/stat_box';
import { Personaje } from './components/types';

function App() {

  let stats = ["Strenght","Dexterity","Constitution","Intelligence","Wisdom","Charisma","Honor"];
  const [puntos_disponibles, setPuntosDisponibles] = useState(85)

  const[bonusNivel, setbonusNivel] = useState(0)



  return (
    <div className='centered_parent'>
      <div>puntos disponibles = {puntos_disponibles}</div>
      <input placeholder='Nivel del personaje ' onChange={e => setbonusNivel(Number(e.target.value)-1)}></input>
      <div> bonus de nivel = {bonusNivel}</div>
      <div className="box_caracteristicas">
        {stats.map(stat => 
          <StatBox stat_name = {stat} setPuntosDisponibles = {setPuntosDisponibles} puntos_disponibles = {puntos_disponibles} bonus_nivel = {bonusNivel} setBonusNivel = {setbonusNivel}></StatBox>)}
      </div>
    </div>
  );
}

export default App;
