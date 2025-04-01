import { Routes, Route, Link } from "react-router-dom"

import { AuthProvider } from "./contexts/authContext"
import AuthGuard from "./guards/AuthGuard"

import Header from "./components/header/Header"
import Register from "./components/register/Register"
import Logout from "./components/logout/Logout"
import Create from "./components/create/Create"
import UpdatePost from "./components/updatePost/UpdatePost"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import PostDetails from "./components/postDetails/PostDetails"
import Profile from "./components/profile/Profile"
import AllPosts from "./components/allPosts/AllPosts"
import SearchResultsComponent from "./components/searchResults/SearchResultsComponent"
import MyPosts from "./components/myPosts/MyPosts"
import ErrorBanner from "./components/errorBanner/ErrorBanner"
import Saved from "./components/saved/Saved"
import { ErrorProvider } from "./contexts/errorContext"


function App() {


  return (
    <>

      <ErrorProvider>
        <AuthProvider>


          <div className="app-container mx-auto">

            <Header />

            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
              <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              ></div>
            </div>


            <main className="main-content">
              <div className="main-wrapper relative">

                <ErrorBanner />

                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/posts/all-posts' element={<AllPosts />} />
                  <Route path='/search/:searchInput' element={<SearchResultsComponent />} />
                  <Route path='/posts/details/:postId' element={<PostDetails />} />
                  <Route path='/user/:profileId' element={< Profile />} />
                  <Route path='/user/register' element={<Register />} />
                  <Route path="/user/login" element={<Login />} />


                  <Route element={<AuthGuard />}>
                    <Route path="/user/my-posts" element={<MyPosts />} />
                    <Route path="/user/saved-posts" element={<Saved />} />
                    <Route path="/posts/create" element={<Create />} />
                    <Route path="/posts/edit/:postId" element={<UpdatePost />} />
                    <Route path="/user/logout" element={<Logout />} />
                    <Route path="/my-profile" element={<Profile />} />
                  </Route>

                  <Route
                    path="*"
                    element={
                      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
                        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
                        <p className="text-lg text-gray-700 mb-6">
                          Oops! The page you are looking for does not exist or an error occurred.
                        </p>
                        <Link
                          to="/"
                          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                          Go Back to Home
                        </Link>
                      </div>
                    }
                  />
                </Routes>
              </div>
            </main>

          </div>
        </AuthProvider>
      </ErrorProvider>

    </>
  )
}

export default App
