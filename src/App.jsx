import './App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WeatherDetail from './components/WeatherDetail';

function App() {

  return (
    <Router>
      <Routes>
        {/* <div className='mx-32 my-12'> */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/:slug" element={<WeatherDetail />} />
        {/* </div> */}
      </Routes>
    </Router>
  )
}

export default App
