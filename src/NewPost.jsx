import { Link } from "react-router-dom";

const NewPost = () => {
  return (
    <div className="error">
      <h1>New Post</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default NewPost;