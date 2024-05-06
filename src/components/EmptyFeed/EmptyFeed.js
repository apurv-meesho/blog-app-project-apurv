import React from 'react'
import { Link } from 'react-router-dom';
import "./EmptyFeed.css"

function EmptyFeed() {
    return (
        <div className="create-post-page">
          <div className="create-post-container">
            <h1>No posts found!</h1>
            <p>It seems like there are no posts available. Why not create one?</p>
            <Link to="/create" className="create-post-button">
              Create Post
            </Link>
          </div>
        </div>
      )
}

export default EmptyFeed