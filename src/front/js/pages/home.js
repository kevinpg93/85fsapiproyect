import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate, useParams } from "react-router-dom";



export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email,setEmail]= useState("")
	const [password,setPassword]= useState("")
	const navigate=useNavigate()
	useEffect(()=>{
		actions.privateRoute()
	},[store.token])

	const handlelogin= ()=>{
		actions.login(email,password)
		navigate("/demo")
	}

	return (
		<div className="text-center mt-5">
			<h1>signUp</h1>
			<label>email</label>
			<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
			<label>password</label>
			<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
			<button onClick={()=>actions.signUp(email,password)}>Send</button>
			<h1>Login</h1>
			<label>email</label>
			<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
			<label>password</label>
			<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
			<button onClick={()=>handlelogin()}>Send</button>
			
			
		</div>
		
	);
};
