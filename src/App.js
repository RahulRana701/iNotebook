import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



function App() {
  return (
    <>
      {/* we will wrap all this in our NoteState so that we can access our context api  anywhere we want */}
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/"
              element={<Home />}>
            </Route>
            <Route exact path="/about"
              element={<About />}>
            </Route>
            <Route exact path="/login"
              element={<Login />}>
            </Route>
            <Route exact path="/signup"
              element={<Signup />}>
            </Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
