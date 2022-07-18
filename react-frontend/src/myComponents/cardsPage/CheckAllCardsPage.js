import React, { useEffect } from "react";
import {Button, Row, Col, Container} from 'react-bootstrap';
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
              let id = post[i].id;
              cardsTable.push(
                <tr key={id}>
                  <td id = "title"><Button onClick={() =>{displayCard({id})}}>{title}</Button></td>
                  <td id = "description">{description}</td>
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
            <Container>
              <Row>
                <Col><ActiveCard data={response.data}/></Col>
                <Col><Button style={{position: "absolute"}} onClick={()=>{setActiveCard([])}}><ImCross/></Button></Col>
              </Row>
            </Container>
          );
        } else {
          console.log(response);
        }
      });
    }

    return (
        <Row>
          <Col>
            <table id = "cards">
              <tbody>
                  <tr>
                      <th>Title</th>
                      <th>Description</th>
                  </tr>
                  {prepareCardsTableElements()}
              </tbody>
            </table>
            <Button id = "createCardButton" href="/create">Create a new Card</Button> 
            
          </Col>
          <Col>
            {activeCard}
          </Col>
        </Row>
    );
}

export default CheckAllCardsPage;
