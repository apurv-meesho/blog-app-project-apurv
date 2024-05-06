import React from "react";
import "./ViewPost.css";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Reactions from "../Reactions/Reactions";

function ViewPost() {
  const params = useParams();
  const postId = params.id;

  const posts = useSelector((state) => state.posts);

  const post = posts.find((item) => {
    if (item.id == postId) {
      return item;
    }
  });

  return (
    <>
      <div className="top-bar">
        <Link to="/" className="feed-link">
          <button>&#8592; Feed</button>
        </Link>
        <Link to={`/edit/${post.id}`} className="edit-link">
          <button>Edit &#8594;</button>
        </Link>
      </div>
      <div className="view-post-container">
        <h1 className="title">{post.title}</h1>
        <div className="info">
          <div className="author">
            Posted By <b>{post.author}</b> on <b>{post.creationTime}</b>
          </div>

          <div className="reader-group">{post.readerGroup}</div>
        </div>

        <div className="themes">
          {post.themes.map((theme) => (
            <div className="theme">
              {theme}
            </div>
          ))}
        </div>

        <div className="image-container">
          <img src={post.image} alt="Post Image" className="post-image" />
        </div>
        <div className="view-reactions">
          <Reactions post={post} />
        </div>
        <div className="content">{post.content}</div>
      </div>
    </>
  );
}

export default ViewPost;
