import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUsers(data)
      })
  }, [])

  const HandaleAddUser = (e) => {

    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        const newUser = [data, ...users]
        setUsers(newUser)
        form.reset()

      })
      .catch((error) => {
        console.error('Error:', error);
      });




  }



  return (
    <div className="App">
      <h1>User : {users.length}</h1>

      <form onSubmit={HandaleAddUser}>
        <input type="text" name="name" placeholder='Your Name' />
        <br />
        <input type="email" name="email" placeholder='Your Email' id="" />
        <br />
        <button type="submit" value="Ad d User" > Add User</button>
      </form>


      {
        users.map(user => <p key={user.id}>{user.name}  {user.email} </p>)
      }






    </div>
  );
}

export default App;
