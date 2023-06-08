import  Navbar from "./Navbar";
import  MainPage from "./MainPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryDetail from "./countryDetail";

function App() {
  return (
      <Router>
    <div className="App">
      <Navbar />
        <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/countries/:id" element={<CountryDetail />} />
        </Routes>
    </div>
      </Router>
  );
}

export default App;
