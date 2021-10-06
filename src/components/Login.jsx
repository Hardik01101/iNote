import React,{useState} from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';

const Login = (props) => {
    let history =useHistory();
   const [creds, setcreds] = useState({email:"",password:""});

   const handlechange=(e)=>{
       setcreds({...creds,[e.target.name]:e.target.value})
   }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:creds.email,password:creds.password})
        });
        const json = await response.json();
        console.log(json);

        if(json.success){
            localStorage.setItem('token',json.authtoken);
           
            props.showAlert("Logged in successfully","success");
            history.push('/');
        }else{
            props.showAlert("Invalid credentials","danger");
        }
    }
    return (
        <div className="container my-5">
            <h2>Login to Continue</h2>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={creds.email} onChange={handlechange}/>
                  
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={creds.password} onChange={handlechange}/>
                </div>

                <button type="submit" className="btn btn-primary mx-1" >Submit</button>
                <Link className="btn btn-primary mx-1" to="/signup">Signup</Link>
            </form>
              

        </div>
    )
}

export default Login
