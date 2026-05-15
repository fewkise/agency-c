import { Footer } from '../../shared/uikit/molecules/footer/footer';
import { Header } from '../../shared/uikit/molecules/header/header';
import { HomeSection5 } from '../home/home-section-5/HomeSection5';
import { HomeSection6 } from '../home/home-section-6/HomeSection6';
import { BlogsSection1 } from './blogs-section-1/BlogsSection1';

export const BlogsPage = () => {
  return (
    <>
      <Header />
      <BlogsSection1/>
      <HomeSection5/>
      <HomeSection6/>
      <Footer/>
    </>
  );
}