import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

import setThemeColors from '../../themeColors';
import './HomePage.css'

function HomePage(){

    return(
        <Container>
            {setThemeColors()}
            <Row id = "presentationRow">
                <Col>
                    <Card style={{ width: '550px'}} id = "presentationCard">
                        <Card.Img variant="top" src={require("../logos/logo-card.png")} style={{ width: '95%', height: "auto",marginLeft: "auto", marginRight: "auto", marginTop: "2.5%" }}/>
                        <Card.Body>
                            <Card.Title><h1>Did you say <span id="emphasized">Mind Cards</span>?</h1></Card.Title>
                            <Card.Text>
                                <p>
                                    Mind Cards is an app to allow you to learn new 
                                    subjects and make cards in order to remember them more easily! 
                                    These cards are stored on a database and therefore accessible from anywhere ;)
                                </p>
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item id = "paragraphs">
                                <h3>Paragraph 1</h3>
                                <p>Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée.</p>
                            </ListGroup.Item>
                            <ListGroup.Item id = "paragraphs">
                                <h3>Paragraph 2</h3>
                                <p>Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée.</p>
                            </ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Card.Link href="https://www.verywellmind.com/how-to-become-a-more-effective-learner-2795162">How to learn</Card.Link>
                            <Card.Link href="https://hbr.org/2016/03/learning-to-learn">Learning to learn (HBR)</Card.Link>
                        </Card.Body>
                        <Card.Body>
                            <div className="d-grid gap-2">
                                <Button variant="outline-success" size="lg" href="/cards">
                                    Start browsing!
                                </Button>
                                <Button variant="outline-primary" size="lg" href="/create">
                                    Create a card
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <h2>An app to make everything <br/><span id="emphasized"> easily memorable!</span></h2>
                    <p id="presentation">
                    Le lorem ipsum (également appelé faux-texte, lipsum, ou bolo bolo1) est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée.
                    Généralement, on utilise un texte en faux latin (le texte ne veut rien dire, il a été modifié), le Lorem ipsum ou Lipsum.
                    L'avantage du latin est que l'opérateur sait au premier coup d'œil que la page contenant ces lignes n'est pas valide et que l'attention du lecteur n'est pas dérangée par le contenu, lui permettant de demeurer concentré sur le seul aspect graphique.
                    Il circule des centaines de versions différentes du lorem ipsum, mais ce texte aurait originellement été tiré de l'ouvrage écrit par Cicéron en 45 av. J.-C., 
                    De finibus bonorum et malorum (Liber Primus, 32), texte populaire à cette époque, dont l'une des premières phrases est : « Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit… » (« Il n'existe personne qui aime la souffrance pour elle-même, ni qui la recherche ni qui la veuille pour ce qu'elle est… »). 
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage;