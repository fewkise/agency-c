import { Footer } from '../../shared/uikit/molecules/footer/footer';
import { Header } from '../../shared/uikit/molecules/header/header';
import { HomeSection1 } from './home-section-1/HomeSection1';
import { HomeSection2 } from './home-section-2/HomeSection2';
import { HomeSection3 } from './home-section-3/HomeSection3';
import { HomeSection4 } from './home-section-4/HomeSection4';
import { HomeSection5 } from './home-section-5/HomeSection5';
import { HomeSection6 } from './home-section-6/HomeSection6';

export const HomePage = () => {
  return (
    <>
      <Header />
      <HomeSection1 />
      <HomeSection2/>
      <HomeSection3/>
      <HomeSection4/>
      <HomeSection5/>
      <HomeSection6/>
      <Footer/>
    </>
  );
}