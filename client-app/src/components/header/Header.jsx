import  { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../contexts/authContext";

function Header() {
    const { isAuthenticated, userId } = useContext(AuthContext)

    return (
        <header className="header text-center">
            <h1 className="blog-name pt-lg-4 mb-0">
                <a href="index.html">Blog site exam</a>
            </h1>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navigation"
                    aria-controls="navigation"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div id="navigation" className="collapse navbar-collapse flex-column">
                    <div className="profile-section pt-3 pt-lg-0">

                        <div className="bio mb-3">
                            Hi, this web app is in alpha version. Please report any bugs to the developer.
                        </div>

                        <hr />
                    </div>

                    <ul className="navbar-nav flex-column text-left">

                        <li className="nav-item">
                            <Link to="/home" className="nav-link" >Home</Link>
                        </li>

                        {isAuthenticated &&
                            <li className="nav-item">
                                <Link to={`/user/posts/${userId}`} className="nav-link" >My posts</Link>
                                <Link to="/posts/create" className="nav-link" >Create post</Link>
                                <Link to="/user/logout" className="nav-link" >Logout</Link>
                            </li>
                        }

                        {!isAuthenticated &&
                            <li className="nav-item">
                                <Link to="/user/login" className="nav-link" >Login</Link>
                            </li>
                        }
                        {!isAuthenticated &&
                            <li className="nav-item">
                                <Link to="/user/register" className="nav-link" >Register</Link>
                            </li>
                        }

                    </ul>

                </div>
            </nav>
        </header>
    );
}

export default Header;