import { useState } from 'react'
import { HomePage } from './pages/home/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ServicesPage } from './pages/services/ServicesPage';
import { ProjectsPage } from './pages/projects/ProjectsPage';
import { AboutPage } from './pages/about/AboutPage';
import { CareersPage } from './pages/careers/CareersPage';
import { BlogsPage } from './pages/blogs/BlogsPage';
import { BlogDetailPage } from './pages/blog-detail/BlogDetalPage';
import { ContactPage } from './pages/contact/ContactPage';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/services' element={<ServicesPage/>}/>
        <Route path='/projects' element={<ProjectsPage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/careers' element={<CareersPage/>}/>
        <Route path='/blogs' element={<BlogsPage/>}/>
        <Route path='/blog/:id' element={<BlogDetailPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
