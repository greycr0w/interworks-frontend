import React, {PureComponent} from 'react';
import { userService, authenticationService } from '@/_services';
import { productService } from '../_services/product.service';
import "./Homepage.css";
import {
    CartComponent,
    ProductComponent,
    CheckoutButtonComponent,
    cartLocalization
  } from "react-shopping-cart";
   
  import "bootstrap/dist/css/bootstrap.css";
  import "animate.css/animate.min.css";
  import "font-awesome/css/font-awesome.min.css";

const { getDefaultLocalization } = cartLocalization;
const iPadCaseLocalization = {
    color: "Color",
    iPadCase: "iPad case",
    red: "Red",
    green: "Green",
    yellow: "Yellow",
    GBP: "£",
    EUR: "€",
    USD: "$"
};

const iPadPropertiesWithAdditionalCostLocalization = {
yellow: "Yellow (+{cost}{localizedCurrency})"
};

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null,
            id: null,
            products: null,
            name: null,
            price: null,
            products: null,
            product: {
            name: "iPadCase",
            id: "ipad-case",
            path: "/shop/ipad-case/",
            properties: {
                color: [
                "red",
                "green",
                {
                    additionalCost: {
                    GBP: 1,
                    EUR: 2,
                    USD: 3.5
                    },
                    value: "yellow"
                }
                ]
                
            },
            propertiesToShowInCart: ["color"],
            prices: { GBP: 70, EUR: 80, USD: 90 },
            currency: "GBP",
            imageSrc: "1-483x321.jpeg"
            },
            getProductLocalization: getDefaultLocalization("product", "en", {
            ...iPadCaseLocalization,
            ...iPadPropertiesWithAdditionalCostLocalization
            }),
            getCheckoutButtonLocalization: getDefaultLocalization(
                "checkoutButton",
                "en",
            iPadCaseLocalization
            ),
            getCartLocalization: getDefaultLocalization(
                "cart",
                "en",
            iPadCaseLocalization
            )
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
        const {
            addProduct,
            generateProductKey,
            updateProduct,
            removeProduct,
            state 
          } = this;
       
          const {
            getProductLocalization,
            getCheckoutButtonLocalization,
            getCartLocalization,
            products,
            product 
          } = state;
       
          const checkoutButtonElement = (
            <CheckoutButtonComponent
              grandTotal={500}
              hidden={false}
              checkoutURL="/to/my/checkout"
              currency="GBP"
              getLocalization={getCheckoutButtonLocalization}
            />
          );
        const { currentUser, users } = this.state;

        console.log(products)
        if(products === null) {
            
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
                <div className="container">
      </div>
        <h1>Products</h1>
            <div className="card">

              {
              products.map((product, i) => {
                return(
                  <li className="no-bullets-list" key={i}>
                      <h3>{product.product.name}</h3>
                      <h3>{product.product.price}</h3> 
                      <h3>{product.finalPrice}</h3>
                      <h3>{product.product.description}</h3>
                  </li>
                )
                })
              }
            </div>
          </div>
                
        );
    }
}
}


export { HomePage };