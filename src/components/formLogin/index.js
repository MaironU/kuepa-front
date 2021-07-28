import React, { useState, useContext } from 'react'
import './index.css'
import { isError } from '../../Utils/helper'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom';
import Loading from '../Loading'
import ApiRequest from '../../Utils/request';
import { DataContext } from '../../context/DataContext';

const Formlogin = () => {

  const [credentials, setCredentials] = useState({user: '', password: ''});
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const request = new ApiRequest();
  const { setUser } = useContext(DataContext);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const formatData = (res) => {
    const { data } = res;
      return {
          token: res.token,
          signIn: true,
          user: {
              ...data
          }
      }
  }

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await request.post('/api/auth/login', credentials)

      if(response.data.error){
        setError(true)
        setLoading(false);
        setMessage(response.data.message)
        setLoading(false);
      }else{
        const res = formatData(response.data);
        localStorage.setItem('token', `${res.token}`);
        setLoading(false);
        setUser(res)
        history.push('/');
      }

    } catch (e) {
        setLoading(false);
        console.log(e)
    }
  }

  const handleSubmit = (e) => {
    if(isError(credentials)){
      setError(true)
      setMessage('Todos los campos son obligatorios')
    }else{
    console.log(credentials)
      handleSignIn(e)
      setError(false)
    }
  }

  return(
    <>
      <div className="form-login">
        <div className="form-login-container">
          <div className="w-70-center">
            <h1>
              Iniciar Sesión
            </h1>
            <div className="form-group">
              <label htmlFor="user">Nombre de usuario</label>
              <input type="text" onChange={handleChange} id="user" name="user" value={credentials.user} className="form-control" placeholder="Ingrese su nombre de usuario"></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" onChange={handleChange} id="password" name="password" value={credentials.password} className="form-control" placeholder="Ingresa tu contraseña"></input>
            </div>
            {error &&
              <span className="text-danger">{message}</span>
            }
            <div className="form-login-button">
              <di>
                <span className="cursor-pointer">¿No tienes cuenta?,</span><Link to="/register">registrarse</Link>
              </di>
              <button onClick={handleSubmit}>Registrarse</button>
            </div>
          </div>
        </div>
      </div>
      <div className="form-login-background">
      </div>
      <Loading isLoading={loading} />
    </>
  )
}

export default Formlogin
