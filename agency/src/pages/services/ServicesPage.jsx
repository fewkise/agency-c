import { Footer } from '../../shared/uikit/molecules/footer/footer';
import { Header } from '../../shared/uikit/molecules/header/header';
import { HomeSection5 } from '../home/home-section-5/HomeSection5';
import { HomeSection6 } from '../home/home-section-6/HomeSection6';
import { ServicesSection1 } from './services-section-1/ServicesSection1';
import { ServicesSection2 } from './services-section-2/ServicesSection2';
import { ServicesSection3 } from './services-section-3/ServicesSection3';

export const ServicesPage = () => {
  return (
    <>
      <Header />
    <ServicesSection1 heroId={1}/>
    <ServicesSection2/>
    <ServicesSection3/>
    <HomeSection5/>
    <HomeSection6/>
      <Footer/>
    </>
  );
}