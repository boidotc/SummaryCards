import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Col, Row, Accordion, Container } from "react-bootstrap";
import CardService  from '../../services/card.service';
import {AiFillEdit} from "react-icons/ai";
import {BsFillTrashFill} from "react-icons/bs";

export default function ActiveCard(data){

    const [mode, setMode] = React.useState("normal");
    const [inputList, setInputList] = React.useState(data.data.content);
    const [randKey, setRandKey] = React.useState(Math.random());
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
            return (
                <Container>
                    <Card.Body>
                    <Card.Title><h1>{data.data.title}</h1></Card.Title>
                    <Card.Text>
                        {data.data.description}
                    </Card.Text>
                    <Accordion flush>
                    {data.data.content.map((x, i) => {
                        return (
                            <Accordion.Item key={"ai"+i} eventKey={i}>
                                <Accordion.Header>{x.paragraphTitle}</Accordion.Header>
                                <Accordion.Body>{x.paragraphContent}</Accordion.Body>
                            </Accordion.Item>
                        );
                    })}
                    </Accordion>
                </Card.Body>
                <Row>
                    <Col style={{width: "33%"}}>
                        <Button>Generate PDF</Button>
                    </Col>
                    <Col style={{width: "33%"}}>
                        <Button onClick={() =>{
                            setMode("edit");
                            setInputList(data.data.content);
                            setRandKey(Math.random());
                            document.querySelectorAll("button").forEach((button) =>{button.disabled = true});
                        }}><AiFillEdit/></Button>
                    </Col>
                    <Col style={{width: "33%"}}>
                        <Button style={{backgroundColor: "red", marginLeft: "80px"}} onClick={() =>{onDelete(data.data.id)}}><BsFillTrashFill/></Button>
                    </Col>
                </Row>
            </Container>
            );
        } else {
            return (
                <Container>
                    <Card.Body>
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                            <Card.Title>
                                <div key={randKey}>
                                    <input defaultValue={title} {...register("title", { required: true })} />
                                    {errors.exampleRequired && <p id="required">This field is required!</p>}
                                </div>
                            </Card.Title>
                            <Card.Text>
                                <input value={desc} key={ 'desc'} onChange={handleChange()}{...register("description", { required: true })} />
                                {errors.exampleRequired && <p id="required">This field is required!</p>}
                            </Card.Text>
                            {inputList.map((x, i) => {
                                return (
                                    <div className="box" key={"div-"+i}>
                                        <input
                                        name="paragraphTitle"
                                        defaultValue={x.paragraphTitle}
                                        value={x.title}
                                        onChange={e => handleInputChange(e, i)}
                                        />
                                        <input
                                        className="ml10"
                                        name="paragraphContent"
                                        defaultValue={x.paragraphContent}
                                        value={x.content}
                                        onChange={e => handleInputChange(e, i)}
                                        />
                                        <div className="btn-box">
                                            {inputList.length !== 1 && <button className="mr10" onClick={() => handleRemoveClick(i)}>Remove section</button>}
                                            {inputList.length - 1 === i && <button onClick={handleAddClick}>Add section</button>}
                                        </div>
                                    </div>                 
                                );
                            })}
                            <Row>
                                <Col style={{width: "33%"}}>
                                    <Button onClick={() =>{
                                        setMode("normal");
                                        document.querySelectorAll("button").forEach((button) =>{button.disabled = false});
                                    }}>Exit editing</Button>
                                    <input type="submit"/>
                                </Col>
                            </Row>
                        </form>
                    </Card.Body>
                    
                </Container>
            );
        }
    }

    return(
        <Card style={{ width: '550px'}} id = "presentationCard">
            {displayContentMode()}
        </Card>
    );
}