
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './components/Users/CreateUser';
import UserList from './components/Users/UserList';
import EditUser from './components/Users/UserEdit';
import NavBar from './NavBar';
import CreateCredit from './components/Credits/CreateCredits';
import CreditList from './components/Credits/CreditList';
import EditCredit from './components/Credits/CreditEdit';
// import CreateLifeInsurance from './components/CreateLifeInsurance';

function App() {
    return (
        <Router>
          <NavBar/>
            <Routes>
                <Route path="/create-user" element={<CreateUser />} />
                <Route path='/users' element={<UserList/>}/>
                <Route path="/edit-user/:id" element={<EditUser />} />
                <Route path='/create-credit' element={<CreateCredit/>}/>
                <Route path='/credits' element={<CreditList/>}/>
                <Route path='/edit-credit/:id' element={<EditCredit/>}/>
                {/* <Route path="/create-credit" element={<CreateCredit />} />
                <Route path="/create-life-insurance" element={<CreateLifeInsurance />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
