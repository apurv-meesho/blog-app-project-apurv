import React, { useState, useRef, useEffect } from "react";
import "./CreatePost.css";
import { addPost } from "../../redux/Actions/AddPostAction";
import { editPost } from "../../redux/Actions/EditPostAction";
import * as uuid from "uuid";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function CreatePost() {
  const titleInputRef = useRef(null);

  const location = useLocation();
  const segment = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const flag = segment === "create";

  const posts = useSelector((state) => state.posts);

  const post = posts.find((item) => {
    if (item.id == segment) {
      return item;
    }
  });

  const [formData, setFormData] = useState(
    flag
      ? {
          title: "",
          author: "",
          themes: [],
          readerGroup: "",
          content: "",
          image: "",
          errors: {},
        }
      : { ...post }
  );

  const dispatch = useDispatch();

  const [imageName, setImageName] = useState("");

  const [dialogVisible, setDialogVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      let updatedThemes = [...formData.themes];

      if (checked) {
        updatedThemes.push(value);
      } else {
        updatedThemes = updatedThemes.filter((theme) => theme !== value);
      }

      setFormData({ ...formData, themes: updatedThemes });
    } else if (type === "file") {
      setFormData({
        ...formData,
        errors: { ...formData.errors, image: "" },
      });
      const reader = new FileReader();
      if (files[0]) {
        reader.readAsDataURL(files[0]);
      }
      reader.onloadend = () => {
        // Convert the image to base64
        const base64String = reader.result;

        setImageName(files.item(0).name);
        setFormData({ ...formData, [name]: base64String });
      };
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString();
    let errOcc = false;

    if (!formData.title) {
      errors.title = "Title is required";
      errOcc = true;
    }
    if (!formData.author) {
      errors.author = "Author is required";
      errOcc = true;
    }
    if (formData.themes.length === 0) {
      errors.themes = "At least one theme must be selected";
      errOcc = true;
    }
    if (!formData.readerGroup) {
      errors.readerGroup = "Reader group must be selected";
      errOcc = true;
    }
    if (!formData.content) {
      errors.content = "Content is required";
      errOcc = true;
    }
    if (!formData.image) {
      errors.image = "Image is required";
      errOcc = true;
    }

    if (!errOcc) {
      setDialogVisible(true);

      const newPost = {
        ...formData,
        creationTime: formattedTime,

        id: uuid.v4(),
      };

      const editTime = formattedTime + " (Edited)";
      dispatch(
        flag
          ? addPost(newPost)
          : editPost({
              ...formData,
              creationTime: editTime,
            })
      );

      if (flag) {
        setFormData({
          title: "",
          author: "",
          themes: [],
          readerGroup: "",
          content: "",
          image: "",
          errors: {},
        });
        setImageName("");
      }
    } else {
      setFormData({ ...formData, errors });
    }
  };

  const authors = ["Author1", "Author2", "Author3"];

  const focusTitleInput = () => {
    if (titleInputRef.current && flag) {
      titleInputRef.current.focus();
    }
  };

  useEffect(() => {
    focusTitleInput();
  }, []);

  const handleFocus = (e) => {
    setFormData({
      ...formData,
      errors: { ...formData.errors, [e.target.name]: "" },
    });
  };

  const readerGrpArr = ["Beginner", "Intermediate", "Advanced"];
  const themesArr = [
    "Adventure",
    "Comedy",
    "Thriller",
    "Science Fiction",
    "Romance",
    "Miscellaneous",
  ];

  return (
    <>
      {flag ? (
        <Link to="/">
          <button className="feed-link">&#8592; Feed</button>
        </Link>
      ) : (
        <div className="top-bar">
          <Link to={`/view/${post.id}`} className="edit-link">
            <button>&#8592; Back</button>
          </Link>
          <Link to="/" className="feed-link">
            <button>Feed &#8594;</button>
          </Link>
        </div>
      )}

      <div className="container">
        <h1>{flag ? "Create" : "Edit"} Blog Post</h1>
        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-group">
            <label>
              Title: <span className="star">*</span>{" "}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Title"
              ref={titleInputRef}
              onFocus={handleFocus}
            />
            {formData.errors.title && (
              <span className="error">{formData.errors.title}</span>
            )}
          </div>
          <div className="form-group">
            <label>
              Author: <span className="star">*</span>
            </label>
            <select
              name="author"
              value={formData.author}
              onChange={handleChange}
              onFocus={handleFocus}
            >
              <option value="">Select an author</option>
              {authors.map((author, index) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>

            {formData.errors.author && (
              <span className="error">{formData.errors.author}</span>
            )}
          </div>
          <div className="form-group">
            <label>
              Blog Reader Group: <span className="star">*</span>
            </label>
            <div className="radio-label">
              {readerGrpArr.map((readerGrp) => (
                <label key={readerGrp}>
                  <input
                    type="radio"
                    name="readerGroup"
                    value={readerGrp}
                    checked={formData.readerGroup === readerGrp}
                    onChange={handleChange}
                    onFocus={handleFocus}
                  />
                  {readerGrp}
                </label>
              ))}
            </div>
            {formData.errors.readerGroup && (
              <span className="error">{formData.errors.readerGroup}</span>
            )}
          </div>
          <div className="form-group">
            <label>
              Blog Theme: <span className="star">*</span>
            </label>
            <div className="theme-checkboxes">
              {themesArr.map((theme, index) => (
                <div key={theme}>
                  <input
                    type="checkbox"
                    name="themes"
                    value={theme}
                    id={theme}
                    onChange={handleChange}
                    checked={formData.themes.includes(theme)}
                    onFocus={handleFocus}
                  />
                  <label htmlFor={theme}>{theme}</label>
                </div>
              ))}
            </div>
            {formData.errors.themes && (
              <span className="error">{formData.errors.themes}</span>
            )}
          </div>
          <div className="form-group">
            <label>
              Blog Content: <span className="star">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write Something ..."
              onFocus={handleFocus}
            ></textarea>
            {formData.errors.content && (
              <span className="error">{formData.errors.content}</span>
            )}
          </div>
          <div className="form-group">
            <div id="image-label">
              Blog Image: <span className="star">* (only JPG format)</span>
            </div>
            <div className="img-info">
              <label
                id="select-image"
                htmlFor="files"
                onClick={(e) =>
                  setFormData({
                    ...formData,
                    errors: { ...formData.errors, image: "" },
                  })
                }
              >
                Select file
              </label>
              <p id="img-name">{imageName}</p>
            </div>

            <input
              id="files"
              type="file"
              name="image"
              className="hidden"
              accept=".jpg"
              onChange={handleChange}
              onFocus={handleFocus}
            />

            <img id="img-form" src={formData.image} />
            {formData.errors.image && (
              <span className="error">{formData.errors.image}</span>
            )}
          </div>
          <button type="submit">{flag ? "Publish" : "Save Changes"}</button>
        </form>
      </div>

      {dialogVisible && (
        <div className="dialog-img-outer">
          <div className="dialog">
            <div className="close-img-container">
              <button id="close-img" onClick={() => setDialogVisible(false)}>
                X
              </button>
            </div>
            <span className="success-icon">✔</span>
            <p>
              Your post has been {flag ? "published" : "edited"} successfully!
            </p>
            {flag ? (
              <Link to={"/"}>
                <button>Go To Feed</button>
              </Link>
            ) : (
              <Link to={`/view/${post.id}`}>
                <button>Close</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePost;
