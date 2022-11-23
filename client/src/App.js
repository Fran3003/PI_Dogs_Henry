import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/home';
import Landing from './components/LandingPage/landing';
import DogCreate from './components/DogCreate/DogCreate';
import DogDetail from './components/DogDetail/dogDetail';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/dogs/:id" component={DogDetail}/>
        <Route path="/dogs" component={DogCreate}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;