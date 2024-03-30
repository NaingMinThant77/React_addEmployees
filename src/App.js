import React, { useState, useEffect } from 'react'; //react hook
import User from "./components/users/User";
import AddUser from "./components/users/AddUser"

function App() {

  let [users, setUsers] = useState([]);

  let [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then(res => res.json())
      .then(users => {
        let rawUsers = users.results;
        let filteredUsers = rawUsers.map(usr => {
          return {
            uuid: usr.login.uuid,
            name: `${usr.name.title} ${usr.name.first} ${usr.name.last}`,
            phone: usr.phone,
            cell: usr.cell,
            image: usr.picture.thumbnail
          }
        });
        // console.log(filteredUsers);
        setUsers(filteredUsers);
      })
      .catch(err => console.log(err))
  }, []);

  const removeUserHandler = (uuid) => {
    // alert("From App compo",uuid)
    let remainUsers = users.filter(usr => usr.uuid != uuid);
    setUsers(remainUsers);
  }

  const showFormHandler = () => {
    setShowForm(!showForm);
  }

  const addUserHandler = (user) => {
    // console.log("Log from Parent",user)
    let newUsers = [user, ...users];
    setUsers(newUsers);
    setShowForm(!showForm);
  }

  return (
    <div className='container my-5 '>
      <div>
        <h1 className='text-center my-5 text-info'>Our Employees</h1>
        <button className='btn btn-primary  btn-sm my-2' onClick={showFormHandler}>Add User</button>
        {showForm && <AddUser addUser={addUserHandler}></AddUser>}
        {users.map(usr => <User key={usr.uuid} data={usr} remove={removeUserHandler}></User>)}
      </div>
    </div>
  );
}

export default App;
