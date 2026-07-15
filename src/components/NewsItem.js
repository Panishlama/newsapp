import React from "react";

const NewsItem =(props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } =props;
    return (
      <div className="my-3">
        <div className="card">
          <span
            className="position-absolute top-0 end-0 badge rounded-pill bg-danger"
            style={{
              zIndex: 1,
              transform: "translate(10%, -50%)",
              fontSize: "10px",
              padding: "4px 6px",
            }}
          >
            {source}
          </span>
          <img
            src={
              !imageUrl
                ? "https://www.taxpayer.net/wp-content/uploads/2017/12/treasury.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}....</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "unknown" : author} on {date}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}


export default NewsItem;
