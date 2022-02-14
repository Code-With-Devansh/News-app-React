import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let {
      title,
      description,
      imgSrc,
      articleLink,
      author,
      publishedAt,
      source,
    } = this.props;
    return (
      <div>
        <div className="card">
          <div style={{
            display:"flex",
            position:"absolute",
            justifyContent:"flex-end",
            right:0
          }}>
        <span className="badge rounded-pill bg-danger" style={{zIndex:1, left:'90%'}}>
              {source}
        </span>
        </div>
          <img src={imgSrc} className="card-img-top" alt="..." height="175px" />
          <div className="card-body">
            <h5 className="card-title">{title ? title : ""}</h5>
            <p className="card-text">
              {description
                ? description > 250
                  ? description.slice(0, 120) + "..."
                  : description
                : ""}
            </p>
            <a
              rel="noreferrer"
              href={articleLink}
              target="_blank"
              className="btn btn-sm btn-outline-dark"
            >
              Read More
            </a>
            {(author || publishedAt) && (
              <p className="card-text">
                <small className="text-muted">
                  Published by: {author ? author : "Unknown"} on:{" "}
                  {new Date(publishedAt).toGMTString()}
                </small>
              </p>
            )}
            
          </div>
        </div>
      </div>
    );
  }
}
