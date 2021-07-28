import React, { useContext, useEffect, useState } from 'react'
import logo from '../../images/logo.png'
import './index.css'
import { isAuthenticated, getUser } from '../../Utils/helper'
import { DataContext } from '../../context/DataContext';
import { useHistory } from 'react-router-dom';

const Header = () => {

    return(
      <div className="header">
        <img src={logo} alt="" />
      </div>
    )
}

export default Header
