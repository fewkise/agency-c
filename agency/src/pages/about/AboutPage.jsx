import { Footer } from '../../shared/uikit/molecules/footer/footer';
import { Header } from '../../shared/uikit/molecules/header/header';
import { HomeSection5 } from '../home/home-section-5/HomeSection5';
import { HomeSection6 } from '../home/home-section-6/HomeSection6';
import { AboutSection1 } from './about-section-1/AboutSection1';
import { AboutSection2 } from './about-section-2/AboutSection2';
import { AboutSection3 } from './about-section-3/AboutSection3';
import { AboutSection4 } from './about-section-4/AboutSection4';

export const AboutPage = () => {
  return (
    <>
      <Header />
      <AboutSection1 heroId={4}/>
      <AboutSection2 heroId={6}/>
      <AboutSection3 heroId={7}/>
      <AboutSection4 heroId={8}/>
      <HomeSection5/>
      <HomeSection6/>
      <Footer/>
    </>
  );
}