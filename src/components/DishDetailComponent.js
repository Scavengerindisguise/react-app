import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const dishdetail = this.props.selectedDish;
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card key={dishdetail.id}>
                        <CardImg top src={dishdetail.image} alt={dishdetail.name} />
                        <CardBody>
                            <CardTitle>{dishdetail.name}</CardTitle>
                            <CardText>{dishdetail.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}
export default DishDetail;
