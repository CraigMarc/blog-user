import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'

/*
const Login = () => {
  return (
    <div className="error">
      <h1>Login</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};*/

async function loginUser(credentials) {
  console.log(credentials)
  return fetch('https://blogapi1200.fly.dev/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }


const Login = (props) => {

  const {

    setToken,


  } = props;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
    console.log(token)
  }


  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}


export default Login;