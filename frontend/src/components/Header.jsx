import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown, Row, Col } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';

const Header = () => {
   const { cartItems } = useSelector(state => state.cart);
   const { userInfo } = useSelector(state => state.auth);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [logoutApiCall] = useLogoutMutation();

   const logoutHandler = async () => {
      try {
         await logoutApiCall().unwrap();
         dispatch(logout());
         dispatch(resetCart());
         navigate('/auth');
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <header>
         <Navbar bg='black' variant='dark' expand='md' collapseOnSelect>
            <Container fluid>
               <Row className="w-100 align-items-center">
                  <Col xs="auto">
                     <LinkContainer to='/'>
                        <Navbar.Brand className='mx-2'>
                           <img src={logo} alt='ShopSphere' height={35} />
                           <span className='m-2'>ShopSphere</span>
                        </Navbar.Brand>
                     </LinkContainer>
                  </Col>
                  <Col>
                     <div className="d-flex justify-content-center w-100">
                        <SearchBox />
                     </div>
                  </Col>
                  <Col xs="auto">
                     <Navbar.Toggle aria-controls='basic-navbar-nav' />
                     <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto d-flex align-items-center'>
                           <LinkContainer to='/cart'>
                              <Nav.Link>
                                 <FaShoppingCart /> Cart
                                 {cartItems.length > 0 && (
                                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                       {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                    </Badge>
                                 )}
                              </Nav.Link>
                           </LinkContainer>
                           {userInfo ? (
                              <NavDropdown title={userInfo.name} id='username'>
                                 <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                 </LinkContainer>
                                 <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                 </NavDropdown.Item>
                              </NavDropdown>
                           ) : (
                              <LinkContainer to='/auth'>
                                 <Nav.Link>
                                    <FaUser /> Sign In
                                 </Nav.Link>
                              </LinkContainer>
                           )}
                           {userInfo && userInfo.isAdmin && (
                              <NavDropdown title='Admin' id='adminmenu'>
                                 <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                 </LinkContainer>
                                 <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                 </LinkContainer>
                                 <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                 </LinkContainer>
                              </NavDropdown>
                           )}
                        </Nav>
                     </Navbar.Collapse>
                  </Col>
               </Row>
            </Container>
         </Navbar>
      </header>
   );
};

export default Header;