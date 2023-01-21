import './App.css';
import Home from './components/Home';
import Posts from './components/Posts';
import Form from './components/Form';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="posts" element={<Posts />} />
          <Route path="create-post" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
