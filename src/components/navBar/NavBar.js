import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/"><span>Ho</span>me</Link>
        </li>
        <li>
          <Link to="/favorites"><span>Fa</span>vorite</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
