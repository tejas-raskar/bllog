import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Feed } from './pages/Feed'
import { Editor } from './pages/Editor'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/create' element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
