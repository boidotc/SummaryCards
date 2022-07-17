import React, { Component, useEffect } from "react";
import {Button, Container, Row, Col} from 'react-bootstrap';
import './CheckAllCardsPage.css';

import { DbAddressApi } from '../../config';

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
          setActiveCard(response.data);
        } else {
          console.log(response);
        }
      });
    }

    return (
        <div>
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
            <p style={{color: "white"}}>{JSON.stringify(activeCard)}</p>
        </div>
    );
}

export default CheckAllCardsPage;
