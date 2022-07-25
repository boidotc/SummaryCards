import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Col, Row, Accordion, Container, ButtonGroup, Badge } from "react-bootstrap";
import CardService  from '../../services/card.service';
import {AiFillEdit} from "react-icons/ai";
import {BsFillTrashFill} from "react-icons/bs";
import { saveAs } from 'file-saver';
import { TagsInput } from "react-tag-input-component";

export default function ActiveCard(data){

    const [mode, setMode] = React.useState("normal");
    const [inputList, setInputList] = React.useState(data.data.content);
    const [randKey, setRandKey] = React.useState(Math.random());
    const [topics, setTopics] = React.useState(data.data.topics);
    let title = data.data.title;
    let desc = data.data.description;

    const handleChange = event => {
        title = data.data.title;
        desc = data.data.description;
      };

    function onDelete(data){
        CardService.delete(data).then(
            (response) => {
                if(response.status === 200){
                    window.location.replace("/cards");
                }
                else {
                }
            });
            setTimeout(() => {  }, 5000);
    }

    function onGetPdf(data){
        CardService.getPdf(data).then(
            (response) => {
                if(response.status === 200){
                    const blob = new Blob([response.data], { type: 'application/pdf' })
                    saveAs(blob, data+".pdf")
                    // fileDownload(response.data, data+".pdf");
                }
                else {
                    console.log("An issue occured: "+response);
                }
            }
        );
    }

     /** form add/remove input methods **/

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { paragraphTitle: "", paragraphContent: "" }]);
    };


    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();

      const onSubmit = (data) => { 
        var updatedCard = data;
        updatedCard.content=inputList;
        updatedCard.topics = topics;
        edit(updatedCard);
      };

    function edit(card){
        if(card){
            try {
                CardService.update(data.data.id, card).then((response) => {
                    console.log(response);
                    if(response.status === 200){
                        console.log("donee!");
                        window.location.replace("/cards");
                    }
                    else {
                        console.log("something went wrong");
                    }
                });
            } catch (error) {
                console.log(error);
            }
            setTimeout(() => { }, 5000);
        }
    }

    useEffect(() => {
        title = data.data.title;
        desc = data.data.description;
    });

    function displayContentMode(){
        if(mode === "normal"){
            let description = data.data.description.replace(/(?:\r\n|\r|\n)/g, '<br/>');
            return (
                <Card id = "presentationCard">
                    <Container fluid id="cardBackground">
                        <Card.Body>
                        <Card.Title><h1>{data.data.title}</h1></Card.Title>
                        <Container fluid style={{/*border: "solid black",*/ marginBottom:  "15px", alignContent: "start"}}>
                            {data.data.topics.map((x, i) => {
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
                            })}
                        </Container>
                        <Card.Title style={{textAlign: "center", marginBottom:  "15px"}}>{description}</Card.Title>
                        <Accordion>
                        {data.data.content.map((x, i) => {
                            x.paragraphContent.replace(/(?:\r\n|\r|\n)/g, '<br/>');
                            return (
                                <Accordion.Item variant="main" key={"ai"+i} eventKey={i}>
                                    <Accordion.Header>{x.paragraphTitle}</Accordion.Header>
                                    <Accordion.Body>{x.paragraphContent}</Accordion.Body>
                                </Accordion.Item>
                            );
                        })}
                        </Accordion>
                        
                        <Row style={{marginTop: "20px"}}>
                            <Col>
                                <Button variant= "main" onClick={() =>{onGetPdf(data.data.id)}}>Open PDF</Button>
                            </Col>

                            <Col>
                                <ButtonGroup style={{float: "right"}}>
                                    <Button variant= "outline-success" onClick={() =>{
                                        setMode("edit");
                                        setInputList(data.data.content);
                                        setRandKey(Math.random());
                                        document.querySelectorAll("button").forEach((button) =>{button.disabled = true});
                                    }}><AiFillEdit/></Button>
                                    <Button variant= "outline-danger" onClick={() =>{onDelete(data.data.id)}}><BsFillTrashFill/></Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                    
                </Container>
            </Card>
            );
        } else {
            return (
                <Container fluid id="cardBackground">
                    <Card.Body>
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                            <Card.Title>
                                <div key={randKey}>
                                    <input defaultValue={title} {...register("title", { required: true })} />
                                    {errors.exampleRequired && <p id="required">This field is required!</p>}
                                </div>
                            </Card.Title>
                            <Card.Text>
                                <textarea value={desc} key={ 'desc'} onChange={handleChange()}{...register("description", { required: true })} />
                                {errors.exampleRequired && <p id="required">This field is required!</p>}
                            </Card.Text>
                            <TagsInput
                                value={topics}
                                onChange={setTopics}
                                name="topics"
                                placeHolder="Edit topics"
                            />
                            {inputList.map((x, i) => {
                                return (
                                    <div className="box" key={"div-"+i}>
                                        <input
                                        name="paragraphTitle"
                                        defaultValue={x.paragraphTitle}
                                        value={x.title}
                                        onChange={e => handleInputChange(e, i)}
                                        />
                                        <textarea
                                        className="ml10"
                                        name="paragraphContent"
                                        defaultValue={x.paragraphContent}
                                        value={x.content}
                                        onChange={e => handleInputChange(e, i)}
                                        />
                                        <div className="btn-box">
                                            {inputList.length !== 1 && <Button variant="outline-danger" style={{marginLeft: "20px", marginBottom: "10px"}} className="mr10" onClick={() => handleRemoveClick(i)}>Remove section</Button>}
                                            {inputList.length - 1 === i && <Button variant="outline-success" style={{marginLeft: "20px", marginBottom: "10px"}}onClick={handleAddClick}>Add section</Button>}
                                        </div>
                                    </div>                 
                                );
                            })}
                            
                            <Row>
                                <Col /*style={{width: "33%"}}*/>
                                    <input type="submit"/>
                                    <Button onClick={() =>{
                                        setMode("normal");
                                        document.querySelectorAll("button").forEach((button) =>{button.disabled = false});
                                    }}>Exit editing</Button>
                                </Col>
                            </Row>
                        </form>
                    </Card.Body>
                </Container>                 
            );
        }
    }

    return(
        <Card id = "presentationCard">
            {displayContentMode()}
        </Card>
    );
}