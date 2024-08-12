// NavBar.jsx
import { Link } from 'react-router-dom';
import './NavBar.css'; // Asegúrate de tener un archivo CSS para los estilos

const NavBar = () => {
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
          {/* Agrega más enlaces según tus rutas */}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
