import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Home } from './components/Home';
import { Shoes } from './components/Shoes';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shoes/:id' element={<Shoes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
