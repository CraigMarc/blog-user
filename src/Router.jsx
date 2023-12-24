import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./Posts"
import ErrorPage from "./ErrorPage";

const Router = (props) => {

    const {
  
      messages,
      setMessages,
      comments,
      setComments,
      
  
    } = props;
  
    const router = createBrowserRouter([
      
      {
        path: "/",
        element: <Posts
        messages={messages}
          setMessages={setMessages}
        />,
        errorElement: <ErrorPage />,
      },
      
       
  
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;