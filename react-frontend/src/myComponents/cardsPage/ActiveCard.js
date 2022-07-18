import React from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Col, Row, Toast, Accordion, Container } from "react-bootstrap";
import CardService  from '../../services/card.service';
import {AiFillEdit} from "react-icons/ai";
import {BsFillTrashFill} from "react-icons/bs";

export default function ActiveCard(data){

    const [mode, setMode] = React.useState("normal");
    const [toast, setToast] = React.useState([]);
    const [inputList, setInputList] = React.useState(data.data.content);


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
        watch, //to check if the value has changed
        formState: { errors }
      } = useForm();

      const onSubmit = (data) => { 
        var updatedCard = data;
        updatedCard.content=inputList;     
        console.log(JSON.stringify(data));
        edit(updatedCard);
      };

    function edit(card){
        if(card){
            try {
                CardService.update(data.data.id, card).then((response) => {
                    console.log(response);
                    if(response.status === 200){
                        console.log("donee!")
                    }
                    else {
                        console.log("something went wrong");
                    }
                });
            } catch (error) {
                console.log(error);
            }
            setTimeout(() => { }, 5000)      
        }
    }

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
                            <Accordion.Item eventKey={i}>
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
                        <Button onClick={() =>{setMode("edit")}}><AiFillEdit/></Button>
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
                                <input defaultValue={data.data.title} key={'title'} {...register("title", { required: true })} />
                                {errors.exampleRequired && <p id="required">This field is required!</p>}
                            </Card.Title>
                            <Card.Text>
                                <input defaultValue={data.data.description} key={ 'desc'} {...register("description", { required: true })} />
                                {errors.exampleRequired && <p id="required">This field is required!</p>}
                            </Card.Text>
                            {inputList.map((x, i) => {
                                return (
                                    <div className="box" key={ 'section-${ i }'}>
                                        <input key={ 'sectionTitle-${ i }'}
                                        name="paragraphTitle"
                                        defaultValue={x.paragraphTitle}
                                        value={x.title}
                                        onChange={e => handleInputChange(e, i)}
                                        />
                                        <input key={ 'sectionDesc-${ i }'}
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
                            <input type="submit" />
                        </form>
                    </Card.Body>
                    <Row>
                        <Col style={{width: "33%"}}>
                            <Button onClick={() =>{setMode("normal")}}>Cancel edit</Button>
                        </Col>
                    </Row>
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