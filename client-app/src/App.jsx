import Header from "./components/header/Header"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import { Routes, Route } from "react-router-dom"

function App() {


  return (
    <>
      <Header/>
      <Routes>

          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    </>
  )
}

export default App
