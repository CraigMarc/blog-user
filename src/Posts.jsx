import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Header from "./Header"

function Posts(props) {

  const {

    messages,
    setMessages,


  } = props;



  //load page get info use token

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
/*
  const token = sessionStorage.getItem("token");
  const tokenOb = JSON.parse(token)
  const tokenFetch = `Bearer ${tokenOb.token}`*/


const handleDelete = async (event) => {
  let id = event.target.value
  const token = sessionStorage.getItem("token");
  const tokenOb = JSON.parse(token)
  const tokenFetch = `Bearer ${tokenOb.token}`

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


  //get posts


  const fetchInfo = async () => {
    //setLoading(true)

    try {


      const res = await fetch('https://blogapi1200.fly.dev/users/posts', {
        headers: { Authorization: tokenFetch }

      })

      const messageData = await res.json();

      setMessages(messageData)

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
      <div className='postContainer'>

        <div className="postCard">

          {messages.map((index) => {
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
                <Link to={`post/${index._id}`} state={index._id}>
                  <div id={index._id} className="card" >


                    <h3>{index.title}</h3>
                    <p>Published: {published}</p>
                    <p>{date}</p>
                  </div>
                </Link>
                <div className="deleteButtonContainer">
                  <button className="delete" value={index._id} onClick={handleDelete} >delete post</button>

                </div>
                <div className="editButtonContainer">
                  <button className="delete" value={index._id} >edit post</button>

                </div>
                <div className="publishButtonContainer">
                  <button className="delete" value={index._id} >publish/unpublish post</button>

                </div>

              </div>

            )
          })}

        </div>
      </div>
    </div>
  )


}

export default Posts