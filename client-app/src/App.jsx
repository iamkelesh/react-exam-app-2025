import { Routes, Route } from "react-router-dom"

import Header from "./components/header/Header"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import Logout from "./components/logout/Logout"
import { AuthProvider } from "./contexts/authContext"
import Create from "./components/create/Create"

function App() {


  return (
    <>
      <AuthProvider>

        <Header />

        <Routes>
          <Route path="/user/login" element={<Login />} />
          <Route path='/user/register' element={<Register />} />
          <Route path='/user/logout' element={<Logout />} />

          <Route path='/create-discusion' element={<Create />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>

      </AuthProvider>

    </>
  )
}

export default App
