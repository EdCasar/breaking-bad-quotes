import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes/Routes';
import Header from './header/Header';

function App() {
  return (
    <Router>
	  <Header />
      <Routes />
    </Router>
  );
}

export default App;
