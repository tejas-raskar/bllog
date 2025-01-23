import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Feed } from './pages/Feed'
import { Create } from './pages/Create'
import { Profile } from './pages/Profile'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './auth/AuthProvider'
import { PrivateRoute } from './auth/PrivateRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route element={<PrivateRoute />}>
              <Route path='/feed' element={<Feed />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/blog/:id' element={<Blog />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/create' element={<Create />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/profile/:id' element={<Profile />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
