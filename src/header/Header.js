import NavBar from '../components/navBar/NavBar';
import Logo from '../images/breaking-logo.png';

const Header = () => {
  return (
    <header>
      <div>
        <img src={Logo} alt="" width="300" />
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
