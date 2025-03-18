const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			backendUrl: process.env.BACKEND_URL,
			token: null
		},
		actions: {
			
			signUp: (email,password)=>{
				fetch(getStore().backendUrl + '/api/sign-up', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body:JSON.stringify({
						correo: email,
						contraseña: password
					})
				   
				})
					.then(response => {
						return response.json()
					})
					.then(data => {
					  console.log(data)
					})
					.catch(error => {
						console.error(error);
					});
				
			},

			login: (email,password)=>{
				fetch(getStore().backendUrl + "/api/login", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body:JSON.stringify({
						correo: email,
						contraseña: password
					})
				   
				})
					.then(response => {
						return response.json()
					})
					.then(data => {
					localStorage.setItem("token", data.token)
					})
					.catch(error => {
						console.error(error);
					});
				
			},
			 privateRoute : () => {
				fetch(getStore().backendUrl + "api/protected", {
					method:"GET",
					headers:{'Authorization': `Bearer ${localStorage.getItem("token")}`,
					
                }
				})
					.then(response => {
					   if (!response.ok) {
					
						console.log(response)
					   }
					   else {
						return(response.json())
					   }
					})
					.then(data => {
						console.log(data);
						
					})
					.catch(error => {
						console.error(error);
					});
			}
		}
	};
};

export default getState;
