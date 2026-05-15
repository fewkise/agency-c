import { Footer } from '../../shared/uikit/molecules/footer/footer';
import { Header } from '../../shared/uikit/molecules/header/header';
import { HomeSection5 } from '../home/home-section-5/HomeSection5';
import { HomeSection6 } from '../home/home-section-6/HomeSection6';
import { CareersSection1 } from './careers-section-1/CareersSection1';
import { CareersSection2 } from './careers-section-2/CareersSection2';
import { CareersSection3 } from './careers-section-3/CareersSection3';

export const CareersPage = () => {
  return (
    <>
      <Header />
    <CareersSection1 heroId={9}/>
    <CareersSection2 heroId={10}/>
    <CareersSection3 heroId={11}/>
    <HomeSection5/>
    <HomeSection6/>
      <Footer/>
    </>
  );
}