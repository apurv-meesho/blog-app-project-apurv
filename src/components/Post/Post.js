import React, { useEffect, useState, useRef } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import Reactions from "../Reactions/Reactions";

function Post({ post }) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);
  const readMoreRef = useRef(null);

  const [toShowReadMore, setToShowReadMore] = useState(null);

  useEffect(() => {
    const maxHeight = readMoreRef.current.clientHeight;

    if (readMoreRef.current.scrollHeight > maxHeight) {
      setToShowReadMore(true);
    } else {
      setToShowReadMore(false);
    }
  }, []);

  return (
    <>
      <div className="post">
        <div className="left-section">
          <img
            onClick={() => setDialogVisible(true)}
            src={post.image}
            alt="Blog Post"
          />
        </div>
        <div className="right-section">
          <h1>{post.title}</h1>
          <div className="author-time">
            <p>
              <strong>Created By:</strong> {post.author}
            </p>
            <p className="creation-time">{post.creationTime}</p>
          </div>

          <p
            className={`${
              isReadMoreClicked ? "post-content-clicked" : "post-content"
            }`}
            ref={readMoreRef}
          >
            {post.content}
          </p>

          <div className="author-time">
            <Link to={`/view/${post.id}`}>
              <button className="view-post-button">View Post</button>
            </Link>

            {toShowReadMore ? (
              <p
                className="read-more"
                onClick={() => setIsReadMoreClicked(!isReadMoreClicked)}
              >
                Read {isReadMoreClicked ? "Less" : "More"} ...
              </p>
            ) : (
              ""
            )}
          </div>
          <Reactions post={post} />
        </div>
      </div>
      {dialogVisible && (
        <div className="dialog-img-outer">
          <div className="dialog-img">
            <div className="close-img-container">
              <button
                id="close-img-feed"
                onClick={() => setDialogVisible(false)}
              >
                X
              </button>
            </div>
            <img src={post.image} alt="Blog Post" />
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
