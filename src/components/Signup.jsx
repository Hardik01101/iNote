import React,{useState} from 'react';
import { useHistory } from 'react-router';

const Signup = (props) => {
    const [data, setdata] = useState({name:"",email:"",password:"",cpassword:""});
    let history =useHistory();
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const {name,email,password}=data;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
           
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            history.push('/login');
            props.showAlert("Signed up successfully","success");
        }else{
           props.showAlert("Invalid credentials","danger");
        }
    }

    const handlechange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value});
    }
    return (
        <div className="container my-5">
            <h2>Signup to use iNote</h2>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={handlechange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handlechange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handlechange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handlechange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default Signup