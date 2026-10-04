import { useState } from "react";
import { setuser } from "./features/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";


function Login(){

const dispatch = useDispatch();
const [email,setEmail] = useState("");
const [password , setPassword] = useState("");


const handleLogin = async  () =>{

    const response = await axios.post(
        "http://localhost:5000/api/user/login",
      {
        email,
        password
      }

    );
    const user = response.data.user;
    const token = response.data.token;
     console.log("User:", user);
     console.log("Token:", token);
    dispatch(setuser({
        user: response.data.user,
        token: response.data.token
  }));
   
}

return(
<div>

<h2>Login</h2>

<input
 type="text"
 placeholder="email"
 value={email}
 onChange={(e)=>setEmail(e.target.value)}
/>

<input
 type="text"
 placeholder="password"
 value={password}
 onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>Login</button>

</div>

);

}

export default Login;