import './App.css';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Employees from './Components/Employees';
import AddEmployee from './Components/AddEmployee';
import ViewEmployee from './Components/ViewEmployee';
import EditEmployee from './Components/EditEmployee';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';
import ViewTask from './Components/ViewTask';
import EidtTask from './Components/EditTask';



import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" exact={true} element={<Home/>} />

          {/* Employee Routes */}
          <Route path="/employees" element={<Employees/>} />
          <Route path="/employees/add" element={<AddEmployee/>} />
          <Route path="/tasks" element={<Tasks/>} />
          <Route path="/tasks/add" element={<AddTask/>} />

          <Route path="/employees/view/:id" element={<ViewEmployee/>} />
          <Route path="/tasks/view/:id" element={<ViewTask/>} />"

          <Route path="/employees/edit/:id" element={<EditEmployee/>} />
          <Route path="/tasks/edit/:id" element={<EidtTask/>} />"

        </Routes>
      </div>
    </Router>
  );
}

export default App;
