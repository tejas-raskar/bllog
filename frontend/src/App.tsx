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
import { Bookmarks } from './pages/Bookmarks'
import { Landing } from './pages/Landing'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route element={<PrivateRoute />}>
              <Route path='/feed' element={<Feed />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/blog/:id' element={<Blog />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/create/:id?' element={<Create />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/profile/:id' element={<Profile />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/bookmarks' element={<Bookmarks />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
