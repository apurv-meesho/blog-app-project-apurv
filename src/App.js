import "./App.css";
import CreatePost from "./components/CreatePost/CreatePost";
import BlogPostsList from "./components/BlogPostsList/BlogPostsList";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ViewPost from "./components/ViewPost/ViewPost";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BlogPostsList />,
    },
    {
      path: "/create",
      element: <CreatePost />,
    },
    {
      path: "/view/:id",
      element: <ViewPost />,
    },
    {
      path: "/edit/:id",
      element: <CreatePost />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
