import React, { useContext, useState } from 'react';

import { UserContext } from '../../App.js';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, initialzeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager.js';


function Login() {

  const [newUser,setNewUser] = useState(false);

  const [user,setUser]= useState({
    isSignnedIn: false,
    name: '', 
    email:'',
    photo:'',
    password:''
  });

  initialzeLoginFramework();


  const [loggedInUser,setLoggedInUser]= useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  
  
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res,true);

    })
  }

  

  const fbSignIn= () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res,true);
    })
  }

  const signOut= () => {
    handleSignOut()
    .then(res => {
     handleResponse(res,false);
    })
  
  }

  
  
  const handleResponse = (res,redirect) => {
    setUser(res);
      setLoggedInUser(res);
      if(redirect){
        history.replace(from);
      }
  }

  const handleBlur = (event)=> {
            let isFieldValid =true;
            //console.log(event.target.name, event.target.value);

            if(event.target.name === 'email'){
            isFieldValid =/\S+@\S+\.\S+/.test(event.target.value);
            // console.log(isEmailValid);
            }

            if(event.target.name === 'password'){
            const isPaasswordValid = event.target.value.length > 6 ; 
            const passwordHasNumber = /\d{1}/.test(event.target.value) ;
                isFieldValid= isPaasswordValid && passwordHasNumber;
            }

            if (isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[event.target.name]= event.target.value;
            setUser(newUserInfo);
            }

  }

  const handleSubmit=(event)=> {
    console.log(user.email,user.password);

    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res =>{
        handleResponse(res,true);

      })
        
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then(res =>{
        handleResponse(res,true);

      })

    }
    event.preventDefault() //sob valid na hole submit kaj korbe na 
}



  return (
    <div style={{textAlign: "center"}} >
     
    {
      user.isSignnedIn ?<button onClick={signOut} >Sign out</button> : <button onClick={googleSignIn} >Sign In</button>
      
    }
    
    <br />
    
    <button onClick={fbSignIn}>Sign in using Facebook</button>

    {
      user.isSignnedIn && <div>
      <p>Welcome, {user.name}</p>
      <p>Your Email: {user.email}</p>
      <img src={user.photo} alt="broken pic" />

      </div>
    }


    <h1>Our Own Authentication</h1>


   {/* <p>Name: {user.name}</p>
    <p>Email: {user.email}</p>
    <p>Pass: {user.password}</p> */}

    <input type="checkbox" onChange={()=> setNewUser(!newUser)}  name="newUser" id="" />
    <label htmlFor="newUser">New User Sign Up</label>
    <form onSubmit={handleSubmit}>
      
       {newUser && <input name="name" onBlur={handleBlur} type="text"  placeholder='Your Name' />
      }
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Give me your email" id="123"  required/>
        <br />
        <input type="password" onBlur={handleBlur} name="password" placeholder="Password" id="456" required/>
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : "Sign In"} />
    </form>

    <p style={{color: 'red'}}>{user.error}</p>
    
    {
      user.success && <p style={{color: 'green'}}> User {newUser? 'Created' : "Logged In"} Successfully</p>
    }

    </div>
    
  );
}

export default Login;