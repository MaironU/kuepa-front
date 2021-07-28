import React, { useContext, useState, useEffect, useRef } from 'react'
import './index.css'
import send from '../../images/send.png'
import { getUser } from '../../Utils/helper'
import socket from '../../Utils/socket'
import { DataContext } from '../../context/DataContext';
import ApiRequest from '../../Utils/request';
import sound from '../../sound/envio.mp3'

const Chat = () => {
  const [ messageList, setMessageList ] = useState([]);
  const request = new ApiRequest();
  const divRef = useRef(null)
  const soundRef = useRef(null)
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [ sendM, setSendM ] = useState(false)

  useEffect(() => {
    getMessages()
    let user = getUser()
    if(user){
      setUser(user)
      socket.emit("new user", user.name)
    }
  }, []);

  const getMessages = async () => {
    try {
      const response = await request.get('/api/messages')

      if(!response.data.error){
        console.log("messages", response.data)
        setMessageList(response.data.messages)
      }
    } catch (e) {
        console.log(e)
    }
  }

  useEffect(() => {
    socket.on('message', body => {
      console.log("vemaos ucnaoas veces", body)
      const {user, message } = body
      let objMessgae = {
        user,
        message
      }
      let array = getDataMessages(objMessgae)
      updateMessages(array)
      soundRef.current.play()
    })
  });

  const getDataMessages = (objMessgae) => {
    let array = []
      messageList.forEach(elem => {
        array.push(elem)
      })
      array.push(objMessgae)

      return array
  }

  const updateMessages = (array) => {
    console.log("el array", array)
    setMessageList(array)
  }

  useEffect(() => {
    console.log(divRef)
    divRef.current.scrollTop = 5000
  },[messageList])


  const sendMessage = async (e) => {
    e.preventDefault()
    console.log("todo el list", messageList)
    console.log("user", user)
    const { _id } = user

    if(message){
      const data = {
        _id,
        message
      }
      await socket.emit("message", data);
      setMessage('')
      setSendM(true)
      let objMessgae = {
        user,
        message
      }
      let array = getDataMessages(objMessgae)
      updateMessages(array)
      soundRef.current.play()
    }
  }

  return(
    <div className="chat">
        <audio id = "audioEnvio" ref={soundRef} src = {sound}></audio>
      <h3 onClick={() => console.log(messageList)}>Mensajes en la transmisión</h3>
      <div>{console.log(messageList)}</div>
      <div className="content-chat pt-3" ref={divRef}>
        {messageList.length > 0 && messageList.map((elem, key) =>
          <div className={user._id == elem.user._id ? "content-message-me" : "content-message-other"} key={key}>
            <strong><span>{elem.user.name}: </span></strong>
            <span>{elem.message}</span>
          </div>
        )}
      </div>
      <div className="px-2">
        <div className="chat-input-message">
          <form onSubmit={sendMessage} className="chat-input-message form-message">
            <input type="text" placeholder="Envía un mensaje a todos" value={message} onChange = {(e)=> setMessage(e.target.value)}/>
            <button type="submit">
              <img src={send} width="20px"/>
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Chat
