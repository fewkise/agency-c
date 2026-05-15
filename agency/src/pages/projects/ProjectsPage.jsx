import { Footer } from '../../shared/uikit/molecules/footer/footer';
import { Header } from '../../shared/uikit/molecules/header/header';
import { HomeSection3 } from '../home/home-section-3/HomeSection3';
import { HomeSection5 } from '../home/home-section-5/HomeSection5';
import { HomeSection6 } from '../home/home-section-6/HomeSection6';
import { ServicesSection1 } from '../services/services-section-1/ServicesSection1';
import { ProjectsSection1 } from './projects-section-1/ProjectsSection1';

export const ProjectsPage = () => {
  return (
    <>
      <Header />
      <ServicesSection1 heroId={2}/>
        <ProjectsSection1/>
        <HomeSection3/>
        <HomeSection5/>
        <HomeSection6/>
      <Footer/>
    </>
  );
}