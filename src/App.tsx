import './App.css';
import {MainFrame} from './components/MainFrame';
import titleStyle from './styles/title.module.css';
import backgroundStyle from './styles/background.module.css';


function App() {
  return (
    <div className={backgroundStyle.body_background}>
      <div className={titleStyle.title_container}>Chelo & Dragons - Distribución de estadísticas</div>
      <MainFrame></MainFrame>
    </div>
  )
}

export default App;
