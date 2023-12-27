import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Header from "./Header"

function Posts(props) {

  const {

    messages,
    setMessages,
    comments,
    setComments


  } = props;



  //load page get info use token

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");
  const tokenOb = JSON.parse(token)
  const tokenFetch = `Bearer ${tokenOb.token}`

  // publish posts

  const handlePublish = async (event) => {
    let id = event.target.value


    await fetch(`https://blogapi1200.fly.dev/users/publish/${id}`, {
      method: 'PUT',

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

  // delete posts

  const handleDelete = async (event) => {
    let id = event.target.value


    await fetch(`https://blogapi1200.fly.dev/users/posts/${id}`, {
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

  // edit posts

  const handleEdit = async (event) => {
    let id = event.target.value
    console.log(id)
  }
  //get posts


  const fetchInfo = async () => {
    //setLoading(true)

    try {

      const [apiPosts, apiComments] = await Promise.all([
        fetch('https://blogapi1200.fly.dev/users/posts', {
          headers: { Authorization: tokenFetch }
  
        }),
        fetch("https://blogapi1200.fly.dev/api/comments")
      ]);


      const messageData = await apiPosts.json();
      const commentData = await apiComments.json();
      setMessages(messageData)
      setComments(commentData)
      
    }

    catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
      //add error message to dom
      setError("true")

    }
    setLoading(false)

  }


  useEffect(() => {
    fetchInfo();
  }, [])



  //display error and loading for api call

  if (error) return (
    <div>

      <p>A network error was encountered</p>
    </div>
  )

  if (loading) return <p>Loading...</p>;




  return (
    <div>
      <Header />
      <h2>All Posts</h2>
      <div className='postContainer'>

        <div className="postCard">

          {messages.map((index) => {
            const postComments = comments.filter((comment) => comment.posts_id == index._id).length
              
            let date = new Date(index.timestamp).toLocaleString()
            let published = ""
            if (index.published == true) {
              published = 'Yes'
            }
            else {
              published = 'No'
            }

            return (

              <div key={index._id} className="product">
                
                  <div id={index._id} className="card" >


                    <h3>{index.title}</h3>
                    <p>Published: {published}</p>
                    <p>{date}</p>
                    <p>Comments: {postComments}</p>
                  </div>
                
                <div className="deleteButtonContainer">
                  <button className="delete" value={index._id} onClick={handleDelete} >delete post</button>

                </div>
                <div className="editButtonContainer" >
                  <Link to={`post/${index._id}`} state={index._id}>
                    <button className="edit" value={index._id} >edit post</button>
                  </Link>
                </div>
                <div className="publishButtonContainer"  >
                  <button className="publish" value={index._id} onClick={handlePublish} >publish/unpublish post</button>

                </div>

              </div>

            )
          })}

          <div className="newPostContainer" >
            <Link to={'/newpost'}>
              <button className="edit"  >New Post</button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )


}

export default Posts