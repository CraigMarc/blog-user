import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./Posts"
import ErrorPage from "./ErrorPage";
import Login from "./Login"
import Edit from "./Edit"

const Router = (props) => {

    const {
  
      messages,
      setMessages,
      comments,
      setComments,
      token,
      setToken,
      
      
  
    } = props;
  
    const router = createBrowserRouter([

      {
        path: "/",
        element:
          <Posts
          messages={messages}
          setMessages={setMessages}
          comments={comments}
          setComments={setComments}
          
          />,
        
        errorElement: <ErrorPage />,
      },
     
      {
        path: "/login",
        element: <Login
        messages={messages}
          setMessages={setMessages}
          setToken={setToken}
          
        />,
        errorElement: <ErrorPage />,
      },

      {
      path: "/post/:id",
      element:
        <Edit
        messages={messages}
        comments={comments}
        setComments={setComments}
        
        />,
      
      errorElement: <ErrorPage />,
    },
    
  
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;