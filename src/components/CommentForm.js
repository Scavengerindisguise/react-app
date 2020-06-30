import React, { Component } from 'react';
import { Button, ModalHeader, ModalBody, Modal,Row,Label } from 'reactstrap';
import { LocalForm,Control,Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len); 

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal(); 
        this.props.postComment(this.props.dishId, values.rating, values.author, values.message);
        console.log(values);
        
    }
    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>&nbsp;Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="container">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                        <Label htmlFor="rating" md={2}>Rating</Label>
                        
                          <Control.select model=".rating" id ="rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    
                            </Row>
                            <Row className="form-group">
                            <Label htmlFor="author" md={2}>Author</Label>
                            <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                          <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Row>
                            <Row className="form-group">
                            <Label htmlFor="message" md={2}>Comment</Label>
                            <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                                        </Row>
                                        <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        )
    }

}
export default CommentForm;