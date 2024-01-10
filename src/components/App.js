import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import Notfound from './notfound';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='*' element={<Notfound/>} />
        </Routes>
    </BrowserRouter>

  );
}

export default App;
