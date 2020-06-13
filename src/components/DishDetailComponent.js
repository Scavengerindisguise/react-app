import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';

function RenderDish({ dish }) {
    const dishdetail = dish;
    console.log(dish);
    if (dishdetail === undefined)
        return (
            <div></div>
        ); else
        return (
            
            <Card key={dishdetail.id}>
                <CardImg top src={dishdetail.image} alt={dishdetail.name} />
                <CardBody>
                    <CardTitle>{dishdetail.name}</CardTitle>
                    <CardText>{dishdetail.description}</CardText>
                </CardBody>
            </Card>
        )
};

function RenderComments({ dish }) {
    console.log(dish);
    if (dish === undefined)
        return (
            <div></div>
        ); else
        return dish.comments.map((item) => {
            return (
                <>
                <div key={item.id}>
                    <ul className="list-unstyled">
                        <li>{item.comment}</li>
                        <li>-- {item.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(item.date)))}</li>
                    </ul>
                </div>
                </>
            );
        });
}


const DishDetail = (props) => {
    console.log(props.dish);
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1" >
                    <RenderDish dish={props.dish} />
                </div>

                <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                    <RenderComments dish={props.dish} />
                </div>
            </div>
        </div>
    );
}
export default DishDetail;
