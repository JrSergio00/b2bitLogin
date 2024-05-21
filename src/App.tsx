import './App.css'
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedLayout } from './components/ProtectedLayout/ProtectedLayout'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route 
            path='/' 
            element={<Login />}
          ></Route>
          
          <Route 
            path='/profile' 
            element={
              <ProtectedLayout>
                <Profile />
              </ProtectedLayout>
            }
          ></Route>
        
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App