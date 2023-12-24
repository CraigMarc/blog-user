import { useState, useEffect } from 'react'
import './App.css'
import Router from './Router'
/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}*/

function App() {

  const [messages, setMessages] = useState([])
  const [comments, setComments] = useState()
  

   // get comments from api
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
  
 /*
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
    
    />
  </div>
)

}

export default App



