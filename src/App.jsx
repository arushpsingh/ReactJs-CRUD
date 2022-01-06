import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddBooks from './components/AddBooks';
import BodyComponent from './components/BodyComponent';
import UpdateBooks from './components/UpdateBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BodyComponent />}/>
        <Route path="/add" element={<AddBooks />}/>
        <Route path="/putupdate/:id" element={<UpdateBooks /> }/>
      </Routes>
    </Router>
  );
}

export default App;
