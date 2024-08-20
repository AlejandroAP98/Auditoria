import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import './Audit.css';
import Logo from '../../assets/logo.png';

const NavBarAudit = ({ isOpen }) => {
    return (
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-content">
                <div className="logo">
                    <img alt='logo' src={Logo} />
                </div>
                <ul className='ulAudit'>
                    <a className='liAudit'><Link to="/events">Events</Link></a>  
                    <a className='liAudit'><Link to='/dashboard'>Dashboard</Link></a>       
                </ul>
            </div>
        </nav>
    );
};


NavBarAudit.propTypes = {
    isOpen: PropTypes.bool.isRequired, 
};

export default NavBarAudit;
