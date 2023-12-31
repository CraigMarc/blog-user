import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import Header from './Header'
import ImageUpload from './ImageUpload'
import { useForm } from "react-hook-form";


const NewPost = (props) => {

  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [text, setText] = useState();

  const token = sessionStorage.getItem("token");
  const tokenOb = JSON.parse(token)
  const tokenFetch = `Bearer ${tokenOb.token}`

  //submit new post

  const handleSubmit = async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const formData = new FormData();
    formData.append("title", data.title)
    formData.append("text", data.text)
    formData.append("image", data.image);


    await fetch("https://blogapi1200.fly.dev/users/posts/", {

      method: 'Post',
      body: formData,

      headers: {
        Authorization: tokenFetch,
        //'Content-type': 'application/json; charset=UTF-8',

      },
    })
      .then((response) => response.json())
      .then((data) => {
        navigate('/');

      })
      .catch((err) => {
        console.log(err.message);
      });

  }

  return (
    <div className="login-wrapper">

      <Header />
      <h2 className="pageTitle">New Post</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label>
          <p>Title</p>
          <input className="titleInput" type="text" name="title" required onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          <p>Text</p>
          <textarea type="text" name="text" required onChange={e => setText(e.target.value)} />
        </label>
        <div className="addImage">
          <label>Image (file must be .jpeg .jpg or .png):</label>
          <input type="file" className="form-control-file" id="image" name="image" accept=".jpeg, .jpg, .png" />
        </div>
        <div className="newPostSubmit">
          <button type="submit post">Submit</button>
        </div>
      </form>

    </div>
  )
}




export default NewPost;