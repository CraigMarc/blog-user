import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import Header from './Header'
import CommentsJsx from './CommentsJsx'




const Edit = (props) => {

  const {

    messages,
    setMessages,
    comments,
    setComments,


  } = props;

  const urlParams = useParams();
  const postId = urlParams.id
  const postData = messages.filter((post) => post._id == postId)
  const commentData = comments.filter((comment) => comment.posts_id == postId)
  let image = postData[0].image
  let url = ""
  if (image) {
    url = `https://blogapi1200.fly.dev/uploads/${image}`
  }

  const navigate = useNavigate();

  // delete comments

  const deleteComments = async (event) => {
    let id = event.target.value


    await fetch(`https://blogapi1200.fly.dev/users/comments/${id}`, {
      method: 'Delete',

      headers: {
        Authorization: tokenFetch,
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {

        setComments(data)
        //maybe set state for a rerender
      })
      .catch((err) => {
        console.log(err.message);
      });
  };



  const token = sessionStorage.getItem("token");
  const tokenOb = JSON.parse(token)
  const tokenFetch = `Bearer ${tokenOb.token}`

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  //submit function

  const handleSubmit = async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());


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

      })


      .catch((err) => {
        console.log(err.message);
      });


  }

  // delete pic

  const deleteImage = async (event) => {
    let id = event.target.value


    await fetch(`https://blogapi1200.fly.dev/users/image/${id}`, {
      method: 'Delete',

      headers: {
        Authorization: tokenFetch,
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {

        setMessages(data)
        //maybe set state for a rerender
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //jsx

  return (
    <div className="login-wrapper">
      <Header />
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Title</p>
          <input defaultValue={postData[0].title} type="text" name="title" />
        </label>
        <label>
          <p>Text</p>
          <textarea defaultValue={postData[0].text} type="text" name="text" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <img className="img" src={url}></img>
      <div className="deleteImageContainer">
        <button className="delete" value={postData[0]._id} onClick={deleteImage}>delete image</button>

      </div>
      <h2>Comments</h2>

      <CommentsJsx
        commentData={commentData}
        deleteComments={deleteComments}
      />

    </div>
  )



}




export default Edit;