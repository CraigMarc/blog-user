import { Link } from "react-router-dom";

const Posts = () => {
  return (
    <div className="error">
      <h1>Homepage</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default Posts;