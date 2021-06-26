

import { BrowserRouter, Route, Switch } from 'react-router-dom' //Serve para criar rotas e direcionar compoentes;

import {Home} from './pages/Home'
import {NewRoom} from './pages/NewRoom'

import { AuthContextProvider } from './contexts/AuthContex'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

//exact = indica que a página de fato deve ser a primeira opção de pesquisa;
//Componete Context prcisa receber valor;


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room}/>

        <Route path="/admin/rooms/:id" component={AdminRoom}/> 
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App; //export para visualização em outros compoentes;
