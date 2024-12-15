import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavScrollExample() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    navigate(`/allproduct?catalog=${searchQuery}`);
    console.log();
    location.reload()
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#" className="ml-5" style={{ marginLeft: "2%" }}>
          <a href="/"><img src="src\assets\images\logo.png" style={{ height: "100px" }} /></a>
        </Navbar.Brand>
        <Navbar.Toggle id='navbarScroll'></Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-3" navbarScroll>
            <Nav.Link href="#action1">
              <a href="/"><img src="src\assets\images\shopsy.png" style={{ height: "50px" }} /></a>
            </Nav.Link>
          </Nav>
          <Form className="me-auto" onSubmit={handleSubmit}>
            <div className="input-group">
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ width: '500px', height: "50px" }}
                value={searchQuery}
                onChange={handleChange}
              />
              <span className="input-group-text me-2">
                <i class="bi bi-list"></i>
              </span>
              <span className="input-group-text">
                <a href="/cart">

                <i className="bi bi-cart" style={{ width: "30px" }}></i>
                </a>
              </span>
            </div>
          </Form>
          <div className="rounded-circle" style={{ width: '60px', height: '60px', overflow: 'hidden' }}>
            <a href="/login">
              <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png" alt="Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </a>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
