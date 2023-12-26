import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'





const NewPost = (props) => {

  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [text, setText] = useState();

  const token = sessionStorage.getItem("token");
  const tokenOb = JSON.parse(token)
  const tokenFetch = `Bearer ${tokenOb.token}`

  const handleSubmit = async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log(data)

    await fetch("https://blogapi1200.fly.dev/users/posts/", {
      method: 'Post',
      body: JSON.stringify({
        title: data.title,
        text: data.text,

      }),
      headers: {
        Authorization: tokenFetch,
        'Content-type': 'application/json; charset=UTF-8',
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
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Title</p>
          <input type="text" name="title" onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          <p>Text</p>
          <textarea type="text" name="text" onChange={e => setText(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}




export default NewPost;