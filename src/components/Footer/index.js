import React, {useEffect} from 'react'
import logo from '../../images/logo.png'
import './index.css'

const Footer = () => {
    return(
      <div className="footer">
        <img src={logo} alt="" />
        <div className="footer-copytight">
          Copyright© Kuepa 2021
        </div>
      </div>
    )
}

export default Footer
