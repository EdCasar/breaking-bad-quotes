import NavBar from '../components/navBar/NavBar';
import Logo from '../images/breaking-logo.png';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={Logo} alt=""  />
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
