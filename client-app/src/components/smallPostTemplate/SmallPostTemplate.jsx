function SmallPostTemplate() {
    return (
        <div className="item mb-5">
            <div className="media">
                <img
                    className="mr-3 img-fluid post-thumb d-none d-md-flex"
                    src="assets/images/blog/blog-post-thumb-4.jpg"
                    alt="image"
                />
                <div className="media-body">
                    <h3 className="title mb-1">
                        <a href="blog-post.html">Top 5 JavaScript Frameworks</a>
                    </h3>
                    <div className="meta mb-1">
                        <span className="date">Published 2 months ago</span>
                        <span className="time">15 min read</span>
                        <span className="comment">
                            <a href="#">3 comments</a>
                        </span>
                    </div>
                    <div className="intro">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                        ultricies...
                    </div>
                    <a className="more-link" href="blog-post.html">
                        Read more →
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SmallPostTemplate