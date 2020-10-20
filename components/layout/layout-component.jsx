
import styles from './layout-styles.module.scss';
import Header from 'components/header/header';
// import Footer from '../components/footer'

const LayoutComponent = ({ children }) => {
  return (
    <>
      <Header/>
      <main className={styles.container}>
        {children}
      </main>
      {/* <Footer/> */}
    </>
  )
}

export default LayoutComponent;
