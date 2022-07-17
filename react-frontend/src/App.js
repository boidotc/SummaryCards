import './App.css';
import setThemeColors from './themeColors';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Header from './myComponents/Header.js'
import PageSelector from'./myComponents/PageSelector.js'

function App() {

  return(
    
    <Container>
      {setThemeColors()}
      <Row>
        <Header />
      </Row>
      <Row>
        <PageSelector />
      </Row>
    </Container>
  );
}

export default App;
