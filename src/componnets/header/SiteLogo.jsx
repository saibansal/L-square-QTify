import React from 'react' 
import { NavbarBrand } from 'reactstrap'; 
import Logo from '../../assets/images/logo.png'

function SiteLogo() {
  return (
    <>
     <NavbarBrand href="/"><img src={Logo} alt='Logo' /></NavbarBrand>
    </>
  )
}

export default SiteLogo