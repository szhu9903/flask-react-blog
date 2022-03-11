import { useRoutes } from 'react-router-dom';
import './App.css';
import router from './router'

function App() {
  return useRoutes(router);
}

export default App;
