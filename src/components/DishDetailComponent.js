import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform, Fade , Stagger} from 'react-animation-components';

function RenderDish({ dish }) {
    const dishdetail = dish;
    console.log(dish);
    if (dishdetail === undefined)
        return (
            <div></div>
        ); else
        return (
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card key={dishdetail.id}>
                <CardImg top src={baseUrl + dish.image} alt={dishdetail.name} />
                <CardBody>
                    <CardTitle>{dishdetail.name}</CardTitle>
                    <CardText>{dishdetail.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        )
};

function RenderComments({ comments,postComment, dishId }) {
   if(comments!=null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                    {comments.map((item) => {  
                        return(
                            <Fade in>
                            <li key={item.id}>
                    <p>{item.comment}</p>
                    <p>-- {item.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</p>
                    </li>
                    </Fade>
                        );
                    })}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}  />
            </div>

    ); else 
        return (
            <div>
            </div>
        )
}


const DishDetail = (props) => {
    console.log(props);
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1" >
                    <RenderDish dish={props.dish} />
                </div>
                    <RenderComments comments={props.comments}  postComment={props.postComment}
                        dishId={props.dish.id} />
            </div>
        </div>
    );
}
export default DishDetail;
