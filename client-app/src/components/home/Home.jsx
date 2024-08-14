import styles from './Home.module.css';

function Home() {
    return (
        <div className={styles['main-wrapper']}>
            <section className={`${styles['cta-section']} ${styles['theme-bg-light']} ${styles['py-5']}`}>
                <div className={`${styles.container} ${styles['text-center']}`}>
                    <h2 className={styles.heading}>DevBlog - A Blog Made For Geeks</h2>
                    <div className={styles.intro}>
                        Welcome to my blog. Subscribe and get my latest blog post in your inbox.
                    </div>
                    <form className={`${styles['signup-form']} ${styles['form-inline']} ${styles['justify-content-center']} ${styles['pt-3']}`}>
                        <div className={styles['form-group']}>
                            <label className={styles['sr-only']} htmlFor="semail">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="semail"
                                name="semail1"
                                className={`${styles['form-control']} ${styles['mr-md-1']} ${styles.semail}`}
                                placeholder="Enter email"
                            />
                        </div>
                        <button type="submit" className={`${styles.btn} ${styles['btn-primary']}`}>
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
            <section className={`${styles['blog-list']} ${styles['px-3']} ${styles['py-5']} ${styles['p-md-5']}`}>
                <div className={styles.container}>
                    <div className={`${styles.item} ${styles['mb-5']}`}>
                        <div className={styles.media}>
                            <img
                                className={`${styles['mr-3']} ${styles['img-fluid']} ${styles['post-thumb']} ${styles['d-none']} ${styles['d-md-flex']}`}
                                src="assets/images/blog/blog-post-thumb-1.jpg"
                                alt="image"
                            />
                            <div className={styles['media-body']}>
                                <h3 className={`${styles.title} ${styles['mb-1']}`}>
                                    <a href="blog-post.html">Why Every Developer Should Have A Blog</a>
                                </h3>
                                <div className={styles.meta}>
                                    <span className={styles.date}>Published 2 days ago</span>
                                    <span className={styles.time}>5 min read</span>
                                    <span className={styles.comment}>
                                        <a href="#">8 comments</a>
                                    </span>
                                </div>
                                <div className={styles.intro}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies...
                                </div>
                                <a className={styles['more-link']} href="blog-post.html">
                                    Read more →
                                </a>
                            </div>
                        </div>
                    </div>

                    <nav className={`${styles['blog-nav']} ${styles.nav} ${styles['nav-justified']} ${styles['my-5']}`}>
                        <a className={`${styles['nav-link-prev']} ${styles['nav-item']} ${styles['nav-link']} ${styles['d-none']} ${styles['rounded-left']}`} href="#">
                            Previous
                            <i className={`${styles['arrow-prev']} fas fa-long-arrow-alt-left`} />
                        </a>
                        <a className={`${styles['nav-link-next']} ${styles['nav-item']} ${styles['nav-link']} ${styles.rounded}`} href="blog-list.html">
                            Next
                            <i className={`${styles['arrow-next']} fas fa-long-arrow-alt-right`} />
                        </a>
                    </nav>
                </div>
            </section>
            <footer className={`${styles.footer} ${styles['text-center']} ${styles['py-2']} ${styles['theme-bg-dark']}`}>
                <small className={styles.copyright}>
                    Designed with <i className="fas fa-heart" style={{ color: "#fb866a" }} /> by{" "}
                    <a href="http://themes.3rdwavemedia.com" target="_blank">
                        Xiaoying Riley
                    </a>{" "}
                    for developers
                </small>
            </footer>
        </div>
    );
}

// export default Home;

export default Home;