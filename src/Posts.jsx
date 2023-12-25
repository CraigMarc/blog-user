/*
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

export default Posts;*/

import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";


function Posts(props) {

  const {

    messages,
    setMessages,


  } = props;


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");
  const tokenOb = JSON.parse(token)
  const tokenFetch = `Bearer ${tokenOb.token}`

  const fetchInfo = async () => {
    //setLoading(true)

    try {

     

      const res = await fetch('https://blogapi1200.fly.dev/users/posts', {
        headers: { Authorization: tokenFetch }
        
      })

      //return fetch
     // const res = await fetch("https://blogapi1200.fly.dev/api/published")

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

      <div className='postContainer'>

        <div className="postCard">

          {messages.map((index) => {
            let date = new Date(index.timestamp).toLocaleString()


            return (

              <div key={index._id} className="product">
                <Link to={`post/${index._id}`} state={index._id}>
                  <div id={index._id} className="card" >


                    <h3>{index.title}</h3>
                    <p>{date}</p>
                  </div>
                </Link>
              </div>

            )
          })}

        </div>
      </div>
    </div>
  )


}

export default Posts