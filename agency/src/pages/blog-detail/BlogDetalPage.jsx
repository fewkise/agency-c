import { Footer } from '../../shared/uikit/molecules/footer/footer';
import { Header } from '../../shared/uikit/molecules/header/header';
import BlogDetailSection1 from './blog-detail-section-1/BlogDetailSection1';
import { BlogsSection1 } from '../blogs/blogs-section-1/BlogsSection1';
import { HomeSection5 } from '../home/home-section-5/HomeSection5';
import { HomeSection6 } from '../home/home-section-6/HomeSection6';
export const BlogDetailPage = () => {
  return (
    <>
      <Header />
        <BlogDetailSection1/>
        <BlogsSection1/>
        <HomeSection5/>
        <HomeSection6/>
      <Footer/>
    </>
  );
}