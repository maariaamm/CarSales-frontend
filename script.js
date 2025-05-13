fetch('https://u05-restful-api-fl36.onrender.com/api/users/login' , {
    method: 'POST', 
    headers: {'content-Type': 'application/json'},
    body: JSON.stringify({email: 'mimmi@example.com', password: 'testkodbara' }) 

})

.then(res=> res.json())
.then(data => {
  localStorage.setItem('token', data.token);
});