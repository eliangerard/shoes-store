import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Home } from './components/Home';
import { Shoes } from './components/Shoes';
import { Cart } from './components/Cart';
import { Header } from './UI/Header';
import { Add } from './components/Add';

function App() {


  return (
    <BrowserRouter>
      <div className='px-2 max-w-7xl relative md:px-8 mx-auto'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shoes/:id' element={<Shoes />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add' element={<Add />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
