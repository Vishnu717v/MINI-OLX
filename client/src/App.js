
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Home} from "./pages/home";
import {Auth} from "./pages/auth";
import {Sell} from "./pages/sell";
import {Availableproduct} from "./pages/availableproducts"
import { Navbar } from "./components/navbar";


function App() {
  return (
    <div className="App">
     <Router>  
       <Navbar/>
       <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/auth' element={<Auth />}/>
      <Route path='/sell' element={<Sell />}/>
      <Route path='/availableproducts' element={<Availableproduct />}/>
    </Routes>
     </Router>
    </div>
  );
}
export default App;
