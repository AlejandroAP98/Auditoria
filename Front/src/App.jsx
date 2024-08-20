import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './components/Users/CreateUser';
import UserList from './components/Users/UserList';
import EditUser from './components/Users/UserEdit';
import NavBar from './NavBar';
import CreateCredit from './components/Credits/CreateCredits';
import CreditList from './components/Credits/CreditList';
import EditCredit from './components/Credits/CreditEdit';
import CreateLifeInsurance from './components/LifeInsurance/CreateLifeInsurance';
import LifeInsuranceList from './components/LifeInsurance/LifeInsuranceList';
import LifeInsuranceEdit from './components/LifeInsurance/LifeInsuranceEdit';
import Audit from './components/Audit/Events';
import NavBarAudit from './components/Audit/NavBarAudit';
import Dashboard from './components/Audit/Dashboard';
import './index.css'

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <NavBar />  
            <NavBarAudit isOpen={isSidebarOpen} />
            <a className="sidebar-toggle" onClick={toggleSidebar}>
                {isSidebarOpen ? 'x' : '≣'}
            </a>
            <Routes>
                <Route path="/create-user" element={<CreateUser />} />
                <Route path='/users' element={<UserList />} />
                <Route path="/edit-user/:id" element={<EditUser />} />
                <Route path='/create-credit' element={<CreateCredit />} />
                <Route path='/credits' element={<CreditList />} />
                <Route path='/edit-credit/:id' element={<EditCredit />} />
                <Route path='/create-lifeinsurance' element={<CreateLifeInsurance />} />
                <Route path='/lifeinsurance' element={<LifeInsuranceList />} />
                <Route path='/edit-lifeinsurance/:id' element={<LifeInsuranceEdit />} />
                <Route path='/events' element={<Audit />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
