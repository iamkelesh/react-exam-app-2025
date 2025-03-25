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
import Favourites from "./components/favourites/Favourites"

import AuthGuard from "./guards/AuthGuard"
import SearchComponent from "./components/searchComponent/SearchComponent"

function App() {


  return (
    <>
      <AuthProvider>
        <div className="app-container">

          <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
            <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            // style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            ></div>
          </div>

          <Header />
          <div className="app-container">
            <main className="main-content">

            <SearchComponent/>
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

                  <Route path='/user/favourites' element={
                    <AuthGuard>
                      <Favourites />
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
