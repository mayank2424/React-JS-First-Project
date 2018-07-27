import React from 'react';
import Aux from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button'

const orderSummary=(props)=>{
	const summary =Object.keys(props.ingredients)
	.map(igKey=>{
		return (<li key={igKey}>
			     <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
			   </li>)
	})
	
    return(
           <Aux>
              <h3>Your Order</h3>
              <p>Your Burger of your choice</p>
              <ul>
                    {summary}     
              </ul>
              <p>Checkout</p>
              <p><b>Total price: {props.price.toFixed(2)}</b></p>
              <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
              <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
           </Aux>
    	);
};

export default orderSummary