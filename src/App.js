import './App.css';
import {
BrowserRouter as Router, Swith, Route,Link} from "react-router-dom";
import Dashboard from '../src/Components/Dashboard';


function App() {
  return (
   <Router>
     <div>
       
        <Route path="/" component={Dashboard} />
        {/* <Route path="/" component={Login} />
        <Route path="/" exact component={Register} /> */}
        </div>
   </Router>
   
  );
}

export default App;