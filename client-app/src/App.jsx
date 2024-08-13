import { Routes, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/authContext"

import Header from "./components/header/Header"
import Header2 from "./components/header2/Header2"
// import Header from "./components/header/Header"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import Logout from "./components/logout/Logout"
import Create from "./components/create/Create"
import Home from "./components/home/Home"
import Home2Strap from "./components/home2Strap/Home2Strap"
import Header3Strap from "./components/header3Strap/Header3Strap"

function App() {


  return (
    <>
      <AuthProvider>

        {/* <Header /> */}
        {/* <Header2 /> */}
        <Header3Strap />

        <Routes>
          <Route path='/' element={<Home2Strap />} />
          <Route path='/home' element={<Home2Strap />} />
          <Route path="/user/login" element={<Login />} />
          <Route path='/user/register' element={<Register />} />
          <Route path='/user/logout' element={<Logout />} />
          {/* <Route path='/home' element={<Home />} /> */}

          <Route path='/create-discusion' element={<Create />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>

      </AuthProvider>

    </>
  )
}

export default App
