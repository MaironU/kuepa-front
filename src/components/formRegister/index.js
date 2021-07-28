import React, { useState, useContext } from 'react'
import './index.css'
import { isError } from '../../Utils/helper'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom';
import Loading from '../Loading'
import ApiRequest from '../../Utils/request';
import { DataContext } from '../../context/DataContext';

const initialValue = {
  user: '', password: '', type: 'user', name: ''
}

const FormRegister = () => {

  const [credentials, setCredentials] = useState(initialValue);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const request = new ApiRequest();
  const { setData } = useContext(DataContext);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await request.post('/api/auth/register', credentials)

      if(response.data.error){
        setError(true)
        setLoading(false);
        setMessage(response.data.message)
        setLoading(false);
      }else{
        setMessage(response.data.message)
        setSuccess(true)
        setLoading(false);
        setCredentials(initialValue);
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
      handleRegister(e)
      setError(false)
    }
  }

  return(
    <>
      <div className="form-login">
        <div className="form-login-container">
          <div className="w-70-center">
            <h1>
              Registro
            </h1>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" onChange={handleChange} id="name" name="name" value={credentials.name} className="form-control" placeholder="Ingrese su nombre"></input>
            </div>
            <div className="form-group">
              <label htmlFor="type">Tipo</label>
              <select className="form-control" value={credentials.type} id="type" onChange={handleChange} name="type">
                <option value="user">Usuario</option>
                <option value="mod">Moderador</option>
              </select>
            </div>
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
            {success &&
              <span className="text-success">{message}</span>
            }
            <div className="form-login-button">
              <div>
                <span className="cursor-pointer">Ya tienes cuenta?,</span><Link to="/login">Iniciar Sesión</Link>
              </div>
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

export default FormRegister
