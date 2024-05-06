import React, { useEffect } from "react";
import Post from "../Post/Post";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./BlogPostsList.css";
import EmptyFeed from "../EmptyFeed/EmptyFeed";

function BlogPostsList() {
  const posts = useSelector((state) => state.posts);

  if (posts.length == 0) {
    return <EmptyFeed />;
  }

  return (
    <>
      <div className="blog-post-feed">
        <h1 className="feed-title">Blog Feed</h1>

        <Link to="/create">
          <button className="create-post-button">Create New Blog</button>
        </Link>
        <div className="all-post">
          {posts.map((post) => (
            <Post key={post.id} post={post} /> // Will render each post
          ))}
        </div>
      </div>
    </>
  );
}

export default BlogPostsList;
