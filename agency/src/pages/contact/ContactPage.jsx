import { Footer } from '../../shared/uikit/molecules/footer/footer';
import { Header } from '../../shared/uikit/molecules/header/header';
import { HomeSection5 } from '../home/home-section-5/HomeSection5';
import { HomeSection6 } from '../home/home-section-6/HomeSection6';

import { ContactSection1 } from './contact-section-1/ContactSection1';
import { ContactSection2 } from './contact-section-2/ContactSection2';

export const ContactPage = () => {
  return (
    <>
      <Header />
      <ContactSection1 heroId={2}/>
      <ContactSection2/>
      <HomeSection5/>
      <HomeSection6/>
      <Footer/>
    </>
  );
}