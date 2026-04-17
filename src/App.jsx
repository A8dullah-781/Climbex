import React from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import About from '../components/About'
import Service from '../components/Service'
import Sequence from '../components/Sequence'
import Testimonail from '../components/Testimonail'
import Pricing from '../components/Pricing'
import Faqs from '../components/Faqs'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const App = () => {
  return (
    <>
   <div id='page-content'>
     <Navbar/>
    <Home/>
    <About/>
    <Service/>
    <Sequence/>
    <Testimonail/>
    <Pricing/>
    <Faqs/>
    <Contact/>
    <Footer/>
   </div>
    </>
  )
}

export default App