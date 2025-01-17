import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';

import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Header from './components/Header';
//import PrivateRoute from './components/PrivateRoute';


export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        
          <Route path="Profile" element={<Profile />} />
       
      </Routes>
    </BrowserRouter>
  );
}
