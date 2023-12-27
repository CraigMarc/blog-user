import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
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
  console.log(comments)

  const navigate = useNavigate();

  //const [title, setTitle] = useState();
  // const [text, setText] = useState();
  

  const token = sessionStorage.getItem("token");
  const tokenOb = JSON.parse(token)
  const tokenFetch = `Bearer ${tokenOb.token}`

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

   //get comments for post
/*
   const fetchCommentInfo = async () => {
    //setLoading(true)
    
 
    try {
      
      const res = await fetch(`https://blogapi1200.fly.dev/users/comments/${postId}`)
 
      const commentsData = await res.json();
     
      //setData(productData)
      setComments(commentsData)
 
    }
 
    catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
      //add error message to dom
      setError("true")
 
    }
    setLoading(false)
 
  }
 
 
  useEffect(() => {
    fetchCommentInfo();
  }, [])
 
  //display error and loading for api call
 
  if (error) return (
    <div>
      
      <p>A network error was encountered</p>
    </div>
  )
 
  if (loading) return <p>Loading...</p>;
*/


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
  </div>
)
      

 
}




export default Edit;