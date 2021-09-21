import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import Home from './views/Home';
import Contact from './views/Contact'
import account from './views/People'

import PostContextProvider from './contexts/PostContext';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' render={props => <Auth {...props} authRoute='login' />} />
            <Route exact path='/register' render={props => <Auth {...props} authRoute='register' />} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            <ProtectedRoute exact path='/home' component={Home} />
            <ProtectedRoute exact path='/about' component={About} />
            <ProtectedRoute exact path='/contact' component={Contact} />
            <ProtectedRoute exact path='/account' component={account} />
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  )
}

export default App;
