import logo from './logo.svg';
import './App.css';
import PxpClient from 'pxp-client';
import {Link, Route, Switch} from 'react-router-dom';
import Home from "./componentes/Home";
import Marca from "./componentes/marca/Marca";
import Categoria from "./componentes/Categoria";
import Producto from "./componentes/Producto";

console.log('PxpClient',PxpClient)

PxpClient.init(
  '18.222.162.187',
  'kerp/lib/rest',
  'cors',
  '80',
  'http',
  '2',
  'NO',
  '8010',
  'v1'
);

PxpClient.onAuthStateChanged((user)=> {
  if(!user) {
    PxpClient.login('admin','admin');
  }
})







function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/marca">Marca</Link></li>
          <li><Link to="/categoria">Categoria</Link></li>
          <li><Link to="/producto">Producto</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route path="/marca"><Marca/></Route>
        <Route path="/categoria"><Categoria/></Route>
        <Route path="/producto"><Producto/></Route>
      </Switch>
    </div>
  );
}

export default App;
