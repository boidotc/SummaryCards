import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Header from './myComponents/Header.js'
import PageSelector from'./myComponents/PageSelector.js'

function App() {
  return(
    <Container>
      <Header />
      <Row id = "spaceRow"></Row>
      <PageSelector />
    </Container>
  );
}

export default App;
