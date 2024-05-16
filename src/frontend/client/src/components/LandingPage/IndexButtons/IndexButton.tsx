import { useNavigate } from 'react-router-dom';
import './IndexButton.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

const IndexButtons = () => {
  const navigate = useNavigate();

  const navigateToPantry = () => {
    navigate('./pantries'); // Update with your desired route
  };

  const navigateToBlog = () => {
    window.open('https://news.vcu.edu/article/2021/10/little-ram-pantries-will-provide-emergency-food-assistance-to-vcu-students')
  };

  return (
    <Container className="button-container my-4">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Button variant="primary" size="lg" className="w-100" onClick={navigateToPantry}>View The Pantries</Button>
        </Col>
        <Col md={4}>
          <Button variant="secondary" size="lg" className="w-100"onClick={navigateToBlog}>Learn Our Story</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default IndexButtons;
