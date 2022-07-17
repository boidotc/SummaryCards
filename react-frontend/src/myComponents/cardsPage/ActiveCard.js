import React from "react";
import { Button, Card, Col, Row, ListGroup, Toast } from "react-bootstrap";
import CardService  from '../../services/card.service';
import { AiFillEdit } from "react-icons/ai";
import {BsFillTrashFill} from "react-icons/bs";

export default function ActiveCard(data){

    const [toast, setToast] = React.useState([]);

    function onDelete(data){
        CardService.delete(data).then(
            (response) => {
                if(response.status === 200){
                    window.location.replace("/cards");
                }
                else {
                    setToast(
                        <Toast bg={"danger"}>
                            <Toast.Body>
                                Something went wrong.
                            </Toast.Body>
                         </Toast>
                    );
                }
            });
            setTimeout(() => { setToast(); }, 5000);
    }

    return(
        <Card style={{ width: '550px'}} id = "presentationCard">
            <Card.Body>
                <Card.Title><h1>{data.data.title}</h1></Card.Title>
                <Card.Text>
                    <h4>{data.data.description}</h4>
                </Card.Text>
                {data.data.content.map((x, i) => {
                    return (
                        <div>
                            <h5>{x.paragraphTitle}</h5>
                            <h6>{x.paragraphContent}</h6>
                        </div>
                    );
                })}
            </Card.Body>
            <Row>
                <Col>
                    <Button>Generate PDF</Button>
                </Col>
                <Col>
                    <Button><AiFillEdit/></Button>
                </Col>
                <Col>
                    <Button style={{backgroundColor: "red"}} onClick={() =>{onDelete(data.data.id)}}><BsFillTrashFill/></Button>
                </Col>
            </Row>
        </Card>
    );
}