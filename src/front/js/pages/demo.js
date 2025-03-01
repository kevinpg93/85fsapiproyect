import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
useEffect(()=>{
		actions.privateRoute()
	},[])
	return (
		<div className="container">
			<h1>Private</h1>
		</div>
	);
};
