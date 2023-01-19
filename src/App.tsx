import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { StatBox } from './components/stat_box';
import { Personaje } from './components/types';
import { Stat_frame } from './components/stat_frame';

function App() {

  return (
    <div>
      <div className='parent_portrait'>Chelo & Dragons - Distribución de estadísticas</div>
      <div className='imagen_background'>
      <Stat_frame></Stat_frame>
      </div>
    </div>
  )
}

export default App;
