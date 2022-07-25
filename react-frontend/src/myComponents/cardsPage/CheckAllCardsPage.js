import React, { useEffect } from "react";
import {Button, Row, Col, Container, Badge} from 'react-bootstrap';
import {ImCross} from "react-icons/im";
import './CheckAllCardsPage.css';

import ActiveCard from './ActiveCard';
import CardService  from '../../services/card.service';

function CheckAllCardsPage() {
  
    const [post, setPost] = React.useState([]);
    const [activeCard, setActiveCard] = React.useState([]);

    useEffect (() => {
      CardService.getAll()
        .then((response) => {
          if(response.status === 200){
            setPost(response.data);
          } else {
            console.log("Couldn't get all cards.");
          }
        })
    }, []);
    
    function prepareCardsTableElements(){  
      const cardsTable = [];    
      if(post!==[]){
          for(let i = 0; i < post.length; i++) {
              let title = post[i].title;
              let description = post[i].description;
              let topics = post[i].topics;
              let emptyTopics = "No topics attached to this card";
              if (topics.length === 0) {
                topics.push(emptyTopics);
              }
              let id = post[i].id;
              cardsTable.push(
                <tr id="infoRow" key={id}>
                  <td id = "title"><Button variant="contrast" onClick={() =>{displayCard({id})}}>{title}</Button></td>
                  <td id = "topics">{topics.map((x, i) => {
                            if (x === emptyTopics) {
                              return (
                                <Badge pill bg="outline-secondary">{x}</Badge>
                            )
                            }
                            let variant;
                            switch (i%4) {
                                case 0:
                                    variant = "primary";
                                    break;
                        
                                case 1:
                                    variant = "success";
                                    break;
                                case 2:
                                    variant = "danger";
                                    break;
                        
                                case 3:
                                    variant = "warning";
                                    break;
                            
                                default:
                                    variant = "info";
                                    break;
                            }
                            return (
                                <Badge pill bg={variant}>{x}</Badge>
                            )
                        })}</td>
                </tr>
              );
          }
      }
      return cardsTable;
  }

    function displayCard(data) {
      const id = data.id;
      CardService.get(id).then((response) => {
        if(response.status === 200){
          setActiveCard(
            <Container fluid>
              <Row>
                <Col ><ActiveCard data={response.data}/></Col>
                <Col xs={3}><Button variant="main" onClick={()=>{setActiveCard([])}}><ImCross/></Button></Col>
              </Row>
            </Container>
          );
        } else {
          console.log(response);
        }
      });
    }

    return (
        <Row >
          <Col xs={5}>
            <table id="mainTable">
              <thead>
                <tr id="headRow">
                    <th>Title</th>
                    <th>Topics</th>
                </tr>
              </thead>
              <tbody>
                {prepareCardsTableElements()}
              </tbody>
            </table>
            <Button variant="main" href="/create">Create a new Card</Button> 
          </Col>
          <Col>
            {activeCard}
          </Col>
        </Row>
    );
}

export default CheckAllCardsPage;
