import { Link } from "react-router-dom";

const Edit = () => {
  return (
    <div className="error">
      <h1>Edit</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default Edit;