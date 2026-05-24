import { Footer } from '../../shared/uikit/molecules/footer/footer';
import { Header } from '../../shared/uikit/molecules/header/header';
import { AdminSection1 } from './admin-section-1/AdminSection1';

export const AdminPage = () => {
  return (
    <>
      <Header />
        <AdminSection1/>
      <Footer/>
    </>
  );
}