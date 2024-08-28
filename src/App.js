// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import './App.css';
import LandingPage from './page/landingPage';
import store from './redux/store';
import Rockets from "./page/rockets";
function App() {
  return (    <Provider store={store}>
<div className="App">
    <Router>
    <Routes>   
   
      <Route path="/" element={      <LandingPage/>} />
      <Route path="/rockets" element={<Rockets/>} /> 
    </Routes>
  </Router>
  </div>
 
</Provider>
  );
}

export default App;
