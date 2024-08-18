import { Routes, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/authContext"

import Header from "./components/header/Header"
import Register from "./components/register/Register"
import Logout from "./components/logout/Logout"
import Create from "./components/create/Create"
import UpdatePost from "./components/updatePost/UpdatePost"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import UsersPosts from "./components/usersPosts/UsersPosts"
import PostDetails from "./components/postDetails/PostDetails"

import AuthGuard from "./guards/AuthGuard"
function App() {


  return (
    <>
      <AuthProvider>
        <div className="app-container">


          <Header />
          <div className="app-container">
            <main className="main-content">

              <div className="main-wrapper">
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/home/:pageNumber' element={<Home />} />

                  <Route path="/user/login" element={<Login />} />
                  <Route path='/user/register' element={<Register />} />

                  <Route path='/user/posts' element={
                    <AuthGuard>
                      <UsersPosts />
                    </AuthGuard>} />

                  <Route path='/user/posts/:pageNumber' element={
                    <AuthGuard>
                      <UsersPosts />
                    </AuthGuard>} />

                  <Route path='/user/logout' element={
                    <AuthGuard>
                      <Logout />
                    </AuthGuard>
                  } />
                  <Route path='/posts/details/:postId' element={<PostDetails />} />


                  <Route path='/posts/create' element={
                    <AuthGuard>
                      <Create />
                    </AuthGuard>
                  } />

                  <Route path='/posts/edit/:postId' element={
                    <AuthGuard>
                      <UpdatePost />
                    </AuthGuard>
                  } />

                  <Route path="*" element={<h1> something went wrong!!!</h1>} />
                </Routes>
              </div>
            </main>

          </div>

        </div>
      </AuthProvider>

    </>
  )
}

export default App
