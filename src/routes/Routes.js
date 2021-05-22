import { Switch, Route } from 'react-router-dom'
import Home from '../home/Home'
import Favorites from '../favorites/Favorites'

const Routes = () => {
    return(
       <Switch>
		<Route path="/favorites" component={Favorites} />
		<Route path="/" component={Home} />
	   </Switch>
	)
}
 
export default Routes
