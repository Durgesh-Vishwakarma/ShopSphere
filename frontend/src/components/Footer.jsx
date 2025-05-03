import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="footer-advanced">
         <Container>
            <Row>
               <Col className='text-center py-3'>
                  <p className="footer-text">
                     <span className="footer-logo">🛒 ShopSphere</span> &copy; {currentYear}
                  </p>
               </Col>
            </Row>
         </Container>
      </footer>
   );
};

export default Footer;