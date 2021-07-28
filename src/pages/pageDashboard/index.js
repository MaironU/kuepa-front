import './index.css'
import React, { useEffect, useState, useContext } from'react'
import Transmission from '../../components/Transmission'
import Chat from '../../components/Chat'
import socketIoClient from 'socket.io-client'
import { HOST } from '../../Utils/const'
import { isAuthenticated, getUser } from '../../Utils/helper'
import { DataContext } from '../../context/DataContext';
import { useHistory } from 'react-router-dom';

const PageDashboard = () => {

    const [ isAuth, setIsAuth ] = useState(false)
    const { user, setUser } = useContext(DataContext);

    useEffect(() => {
      const { name } = getUser()
      var socket = socketIoClient(HOST);
      const data = {
        name
      }
      socket.emit("new user", data);
    }, [])


    useEffect(() => {
      if(user){
        setIsAuth(isAuthenticated())
        setUser(getUser())
      }
    }, []);

    //const { data, setData, initialValue } = useContext(DataContext);
    const history = useHistory();
    const closeSession = () => {
      localStorage.setItem('token', '')
      history.push('/login');
      setUser('')
      setIsAuth(false)
    }

    return(
      <div className="dashboard">
        <div className="cont-data">
          <h2 className="dashboard-title">Clase Teoría de exponentes</h2>
          {isAuth &&
            <div className="header-user">
              <span>{user.name} ({user.type})</span>
              <span onClick={closeSession}>Cerrar sesión</span>
            </div>
          }
        </div>
          <div className="dashboard-components">
            <Transmission />
            <Chat />
          </div>
      </div>
    )
}

export default PageDashboard
