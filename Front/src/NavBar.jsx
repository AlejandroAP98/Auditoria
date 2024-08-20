// NavBar.jsx
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = () => {
  const location = useLocation();
  if (location.pathname === '/events' || location.pathname === '/dashboard') {
    return null;
  }

  return (
    <nav className="navbar">
      <ul>
        <div>
          <img alt='logo' src='/src/assets/logo.png'/>
        </div>
        <div>
          <li><Link to="/users">Usuarios</Link></li>
          <li><Link to="/create-user">Crear Usuario</Link></li>
          <li><Link to="/create-credit">Crear Crédito</Link></li>
          <li><Link to="/credits">Créditos</Link></li>
          <li><Link to="/create-lifeInsurance">Crear Seguro</Link></li>
          <li><Link to="/lifeInsurance">Seguros</Link></li>           
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
