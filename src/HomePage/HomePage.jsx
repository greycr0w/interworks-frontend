import React from 'react';
import { userService, authenticationService } from '@/_services';
import { productService } from '../_services/product.service';
import "./Homepage.css";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null,
            products: null, 
            id: null,
            name: null,
            price: null,
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
        productService.getAll().then(products => this.setState({ products }));
        if(this.state.products != null ){
            console.log(this.state.products)
        }
    }


 
    render() {
        const { currentUser, users, products } = this.state;

        console.log(products)
        if(products === null ) {
            
            return (
                <div>
                    <h1>
                        waiting
                    </h1>
                </div>
            )
        }else {
            // const product = products[0].product;
           return (
               
            <div>
                <h1>Products</h1>
                <div className="container">
                    <div className="row"> 
                        <div>
                                {

                                products.map((product, i) => {
                                    return(
                                            <li className="no-bullets-list" key={i}>
                                                <h3>{product.product.name}</h3>
                                                <h3>{product.product.price}</h3> 
                                                <h3>{product.product.description}</h3>
                                            </li>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
}


export { HomePage };