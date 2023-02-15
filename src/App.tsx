import './App.css';
import {StatFrame} from './components/StatFrame';
import titleStyle from './styles/title.module.css';
import backgroundStyle from './styles/background.module.css';


function App() {
  return (
    <div className={backgroundStyle.body_background}>
      <div className={titleStyle.title_container}>Chelo & Dragons - Distribución de estadísticas</div>
      <StatFrame></StatFrame>
    </div>
  )
}

export default App;
