import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <h1>SP-GPT</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus inventore explicabo eveniet corrupti, dolore voluptatibus tenetur neque repudiandae, porro cum vel aperiam ducimus blanditiis molestias quam molestiae similique beatae. Ea.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>PLATFORM</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-245-556-789</li>
                <li>contact@google.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 @ Google.com - All Right Reserved</p>
    </div>
  )
}

export default Footer