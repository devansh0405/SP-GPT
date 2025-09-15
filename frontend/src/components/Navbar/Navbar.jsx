import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = () => {
    const {setToken} = useContext(StoreContext);
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/login");
    }

  return (
    <div className='navbar'>
      <Link to='/'><h1 className='logo'>SP-GPT</h1></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu('home')} className={menu=='home'?'active':""}>Home</Link>
        <a href='#explore-module' onClick={()=>setMenu('module')} className={menu=='module'?'active':""}>Our Modules</a>
        <a href='#footer' onClick={()=>setMenu('contact us')} className={menu=='contact us'?'active':""}>Contact us</a>
      </ul>
      <div className='navbar-right'>
        <div className="navbar-icons">
            <img className="icon noti" src={assets.notification} alt="" />
            <Link to='/chatbot'><img className='icon' src={assets.chatbot} alt="" /></Link>
            <img className='icon' src={assets.dark_theme} alt="" />
        </div>
        <div className='navbar-profile'>
          <img className='profile_icon' src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/my-progress')}><img src={assets.bag_icon} alt="" /><p>My Progress</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
