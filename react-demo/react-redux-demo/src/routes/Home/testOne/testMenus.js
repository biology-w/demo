import React, { useState, useEffect } from 'react'
// hoooks 本质上是一类特殊函数

// useState setState
// useEffect componentDidMount
// useContext
const useFriendsStatus = (id) => {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {

  })
  return isOnline;
}


const UserDisplay = (props) => {
  console.log('---0000')
  const [age, setAge] = useState(42)
  const [name, setName] = useState('weijuwei')
  const [user, setUser] = useState({ name: 'one', age: 27, address: 'onnoo' })

  useEffect(() => {
    console.log('userEffect', user)
    return function cleanup() {
      console.log('cleanup', user)
    }
  }, [name, user])
  const fn = () => {
    setUser({ name: 'change name' })
    setAge(24)
    // props.history.push('/about')
  }

  return (
    <div>
      <div>
        <p>{user.name}</p>
        <p>{user.age}</p>
        <p>{user.address}</p>
        <button onClick={fn}>btn</button>
      </div>
    </div>
  )
}

export default UserDisplay
