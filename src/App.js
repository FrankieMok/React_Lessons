
import * as React from "react";
import axios from "axios"
import { render } from "@testing-library/react";
const { useState, useEffect } = React;

const api = axios.create({
  baseURL: "https://randomuser.me/api"
})



function App() {
  const [Num, setNum] = useState(1)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get(`/?results=${Num}`)
      .then(res => {
        console.log(res.data)
        setUsers(res.data.results)
      })
      .catch(error => console.log(error))
  }, [Num])

  return (
    <div>
      <label for="person">Choose how many person:</label>

      <select id="person" onChange={(e) => setNum(e.target.value)}>
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="8">8</option>
      </select>

      {users && <div>{users.map(user => (
        <div key={user.id}>
          <h1>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h1>
          <p>{user.gender}</p>
          <img src={user.picture.medium}></img>
        </div>
      ))}</div>}
    </div>
  )
}


export default App;
