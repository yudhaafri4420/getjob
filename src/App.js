import { Router, Route, Switch } from "react-router-dom";
import history from "./common/history";
import Login from './components/login';
import Home from "./components/home";
import './App.css';
import Detail from "./components/detail";

function App() {
  return (
    <Router history={history}>
      <Switch>
        {/* <PrivateRoute exact path="/client" component={DashboardPage} /> */}
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default App;
