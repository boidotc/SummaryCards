import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

import setThemeColors from '../../themeColors';
import './HomePage.css'

function HomePage(){

    return(
        <Container>
            {setThemeColors()}
            <Row id = "presentationRow">
                <Col>
                    <Card style={{ width: '80%'}} id = "presentationCard">
                        <Container fluid id="cardBackground">
                            {/* <Card.Img variant="top" src={require("../logos/logo-card.png")} style={{ width: '95%', height: "auto",marginLeft: "auto", marginRight: "auto", marginTop: "2.5%" }}/> */}
                            <Card.Body>
                                <Card.Title><h1>Did you say <span id="emphasized">Mind Cards</span>?</h1></Card.Title>
                                <Card.Text>
                                        Mind Cards is an app to allow you to learn new 
                                        subjects and make cards in order to remember them more easily! 
                                        These cards are stored on a database and therefore accessible from anywhere ;)
                                </Card.Text>
                            <Accordion /*activeKey={"0"}*/>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Paragraph 1</Accordion.Header>
                                    <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Paragraph 2</Accordion.Header>
                                    <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                                <Card.Link href="https://www.verywellmind.com/how-to-become-a-more-effective-learner-2795162">How to learn</Card.Link>
                                <Card.Link href="https://hbr.org/2016/03/learning-to-learn">Learning to learn (HBR)</Card.Link>
                            
                                <div className="d-grid gap-2">
                                    <Button variant="success" size="lg" href="/create">
                                        Create a card
                                    </Button>
                                    <Button variant="main" size="lg" href="/cards">
                                        Start browsing!
                                    </Button>
                                </div>
                            </Card.Body>
                        </Container>
                    </Card>
                </Col>
                <Col>
                    <h2>An app to make everything <br/><span id="emphasized"> easily memorable!</span></h2>
                    <p id="presentation">
                    Le lorem ipsum (??galement appel?? faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilis??e ?? titre provisoire pour calibrer une mise en page, le texte d??finitif venant remplacer le faux-texte d??s qu'il est pr??t ou que la mise en page est achev??e.
                    G??n??ralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a ??t?? modifi??), le Lorem ipsum ou Lipsum.
                    L'avantage du latin est que l'op??rateur sait au premier coup d'??il que la page contenant ces lignes n'est pas valide et que l'attention du lecteur n'est pas d??rang??e par le contenu, lui permettant de demeurer concentr?? sur le seul aspect graphique.
                    Il circule des centaines de versions diff??rentes du lorem ipsum, mais ce texte aurait originellement ??t?? tir?? de l'ouvrage ??crit par Cic??ron en 45 av. J.-C., 
                    De finibus bonorum et malorum (Liber Primus, 32), texte populaire ?? cette ??poque, dont l'une des premi??res phrases est : ?? Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit??? ?? (?? Il n'existe personne qui aime la souffrance pour elle-m??me, ni qui la recherche ni qui la veuille pour ce qu'elle est??? ??). 
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage;