import { useState, useEffect } from 'react'
import './App.css'
import Router from './Router'
import Login from './Login';
//import useToken from './useToken';



function App() {

  function useToken() {

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }

}

  const [messages, setMessages] = useState([])
  const [comments, setComments] = useState()
  const [loggedIn, setLoggedIn] = useState();
/*
  function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }

  function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  }

  const token = getToken();
*/
const { token, setToken } = useToken();

  //token state


  //const [token, setToken] = useState();


  if (!token) {

    return <Login setToken={setToken} />
  }



  // get comments from api
  /*
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
 
 
  const fetchCommentInfo = async () => {
    //setLoading(true)
    
 
    try {
      
      const res = await fetch("https://blogapi1200.fly.dev/api/comments")
 
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

//send props to router so routes have them available
*/
  return (
    <div>

      <Router
        messages={messages}
        setMessages={setMessages}
        comments={comments}
        setComments={setComments}
        token={token}
        setToken={setToken}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
    </div>
  )

}

export default App



