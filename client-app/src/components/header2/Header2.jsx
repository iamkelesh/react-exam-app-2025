import styles from './Header2.module.css';
// <header className={`${styles.header} ${styles["text-center"]}`}>
//     <h1 className={`${styles["blog-name"]} ${styles["pt-lg-4"]} ${styles["mb-0"]}`}>
//         <a href="index.html">Anthony's Blog</a>
//     </h1>
//     <nav className={`${styles.navbar} ${styles["navbar-expand-lg"]} ${styles["navbar-dark"]}`}>
//         <button
//             className={`${styles["navbar-toggler"]}`}
//             type="button"
//             data-toggle="collapse"
//             data-target="#navigation"
//             aria-controls="navigation"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//         >
//             <span className={`${styles["navbar-toggler-icon"]}`} />
//         </button>
//         <div id="navigation" className={`${styles.collapse} ${styles["navbar-collapse"]} ${styles["flex-column"]}`}>
//             <div className={`${styles["profile-section"]} ${styles["pt-3"]} ${styles["pt-lg-0"]}`}>
//                 <img
//                     className={`${styles["profile-image"]} ${styles["mb-3"]} ${styles["rounded-circle"]} ${styles["mx-auto"]}`}
//                     src="assets/images/profile.png"
//                     alt="image"
//                 />
//                 <div className={`${styles.bio} ${styles["mb-3"]}`}>
//                     Hi, my name is Anthony Doe. Briefly introduce yourself here. You can
//                     also provide a link to the about page.
//                     <br />
//                     <a href="about.html">Find out more about me</a>
//                 </div>
//                 {/*//bio*/}
//                 <ul className={`${styles["social-list"]} ${styles["list-inline"]} ${styles["py-3"]} ${styles["mx-auto"]}`}>
//                     <li className={`${styles["list-inline-item"]}`}>
//                         <a href="#">
//                             <i className="fab fa-twitter fa-fw" />
//                         </a>
//                     </li>
//                     <li className={`${styles["list-inline-item"]}`}>
//                         <a href="#">
//                             <i className="fab fa-linkedin-in fa-fw" />
//                         </a>
//                     </li>
//                     <li className={`${styles["list-inline-item"]}`}>
//                         <a href="#">
//                             <i className="fab fa-github-alt fa-fw" />
//                         </a>
//                     </li>
//                     <li className={`${styles["list-inline-item"]}`}>
//                         <a href="#">
//                             <i className="fab fa-stack-overflow fa-fw" />
//                         </a>
//                     </li>
//                     <li className={`${styles["list-inline-item"]}`}>
//                         <a href="#">
//                             <i className="fab fa-codepen fa-fw" />
//                         </a>
//                     </li>
//                 </ul>
//                 {/*//social-list*/}
//                 <hr />
//             </div>
//             {/*//profile-section*/}
//             <ul className={`${styles["navbar-nav"]} ${styles["flex-column"]} ${styles["text-left"]}`}>
//                 <li className={`${styles["nav-item"]} ${styles["active"]}`}>
//                     <a className={`${styles["nav-link"]}`} href="index.html">
//                         <i className="fas fa-home fa-fw mr-2" />
//                         Blog Home <span className={`${styles["sr-only"]}`}>(current)</span>
//                     </a>
//                 </li>
//                 <li className={`${styles["nav-item"]}`}>
//                     <a className={`${styles["nav-link"]}`} href="blog-post.html">
//                         <i className="fas fa-bookmark fa-fw mr-2" />
//                         Blog Post
//                     </a>
//                 </li>
//                 <li className={`${styles["nav-item"]}`}>
//                     <a className={`${styles["nav-link"]}`} href="about.html">
//                         <i className="fas fa-user fa-fw mr-2" />
//                         About Me
//                     </a>
//                 </li>
//             </ul>
//             <div className={`${styles["my-2"]} ${styles["my-md-3"]}`}>
//                 <a
//                     className={`${styles["btn"]} ${styles["btn-primary"]}`}
//                     href="https://themes.3rdwavemedia.com/"
//                     target="_blank"
//                 >
//                     Get in Touch
//                 </a>
//             </div>
//         </div>
//     </nav>
// </header>

function Header2() {
    return (

        <header className="header text-center">
            <h1 className="blog-name pt-lg-4 mb-0">
                <a href="index.html">Anthony's Blog</a>
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
                        <img
                            className="profile-image mb-3 rounded-circle mx-auto"
                            src="assets/images/profile.png"
                            alt="image"
                        />
                        <div className="bio mb-3">
                            Hi, my name is Anthony Doe. Briefly introduce yourself here. You can
                            also provide a link to the about page.
                            <br />
                            <a href="about.html">Find out more about me</a>
                        </div>
                        {/*//bio*/}
                        <ul className="social-list list-inline py-3 mx-auto">
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-twitter fa-fw" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-linkedin-in fa-fw" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-github-alt fa-fw" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-stack-overflow fa-fw" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-codepen fa-fw" />
                                </a>
                            </li>
                        </ul>
                        {/*//social-list*/}
                        <hr />
                    </div>
                    {/*//profile-section*/}
                    <ul className="navbar-nav flex-column text-left">
                        <li className="nav-item active">
                            <a className="nav-link" href="index.html">
                                <i className="fas fa-home fa-fw mr-2" />
                                Blog Home <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="blog-post.html">
                                <i className="fas fa-bookmark fa-fw mr-2" />
                                Blog Post
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="about.html">
                                <i className="fas fa-user fa-fw mr-2" />
                                About Me
                            </a>
                        </li>
                    </ul>
                    <div className="my-2 my-md-3">
                        <a
                            className="btn btn-primary"
                            href="https://themes.3rdwavemedia.com/"
                            target="_blank"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </nav>
        </header>

    );
}

export default Header2;