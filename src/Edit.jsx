
/*
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

export default Edit;*/

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from 'react'
import Header from './Header'




const Edit = (props) => {

  const {

    messages,
    comments,
    setComments,


  } = props;

  const urlParams = useParams();
  const postId = urlParams.id
  const postData = messages.filter((post) => post._id == postId)
  console.log(postData)

  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [text, setText] = useState();

  const token = sessionStorage.getItem("token");
  const tokenOb = JSON.parse(token)
  const tokenFetch = `Bearer ${tokenOb.token}`

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log(data.title)
    console.log(data.text)


    //send form data
    await fetch(`https://blogapi1200.fly.dev/users/edit/${postId}`, {
      method: 'PUT',
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
        navigate('/')
        //setMessages(data)
        //maybe set state for a rerender
      })


      .catch((err) => {
        console.log(err.message);
      });


  }

      return (
        <div className="login-wrapper">
          <Header/>
          <h2>Edit Post</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Title</p>
              <input defaultValue={postData[0].title} type="text" name="title"/>
            </label>
            <label>
              <p>Text</p>
              <textarea defaultValue={postData[0].text} type="text" name="text"  />
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )
      

 
}




export default Edit;