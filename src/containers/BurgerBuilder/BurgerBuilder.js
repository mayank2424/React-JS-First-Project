//This is the main Builder of Burger

import React, {Component} from 'react';
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../..//components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
 
const INGREDIENT_PRICE={
	salad:0.4,
	cheese:0.5,
	meat:1.2,
	bacon:0.7
}
class BurgerBuilder extends Component {

	state={
		ingredients :{
			salad:0,
			bacon:0,
			meat:0,
			cheese:0
		},
		totalPrice:4,
		purchasable:false,
		purchasing:false
	}

   updatePurchaseState(ingredients){
   	  // const ingredients={
   	  // 	...this.state.ingredients
   	  // }

   	  const sum=Object.keys(ingredients)
   	  .map(igKey=>{   //Here map func is creatinng new array by taking each value from original array and returing value  of each ingredients 
   	  	return ingredients[igKey];
   	  })
   	  .reduce((sum,el) =>{
   	  	return sum+el;         //Returning Total amount
   	  	},0);
   	  this.setState({purchasable: sum>0})
   }

	addIngredientsHandler=(type) =>{
		const oldCount=this.state.ingredients[type];
		const updatedCount=oldCount + 1;
		const updatedIngredients={
			...this.state.ingredients
		};
		updatedIngredients[type]=updatedCount;
		const priceAddition=INGREDIENT_PRICE[type];
		const oldPrice=this.state.totalPrice;
		const newPrice=oldPrice + priceAddition;
		// const roundOffPrice=Math.round(newPrice);
		this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientsHandler=(type)=>{
 		const oldCount=this.state.ingredients[type];
 		if(oldCount<=0){
 			return;
 		}
		const updatedCount=oldCount - 1;
		const updatedIngredients={
			...this.state.ingredients
		};
		updatedIngredients[type]=updatedCount;
		const priceDeduction=INGREDIENT_PRICE[type];
		const oldPrice=this.state.totalPrice;
		const newPrice=oldPrice - priceDeduction;
		// const roundOffPrice=Math.round(newPrice);
		this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

     purchaseHandler=() =>{
     	 this.setState({purchasing:true});
     }

     purchaseCancelHandler=() => {
     	this.setState({purchasing:false})
     }
     purchaseContinueHandler=()=>{
       alert("Hello");
     }
	render(){
		const disabledInfo={
			...this.state.ingredients
		};
		for(let key in disabledInfo){
			disabledInfo[key]=disabledInfo[key]<=0;
		}
		return (
			<Aux>
			   <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>

                   <OrderSummary 
                   ingredients={this.state.ingredients}
                   price={this.state.totalPrice}
                   purchaseCancelled={this.purchaseCancelHandler}
                   purchaseContinued={this.purchaseContinueHandler}/>

			   </Modal>
			   <Burger ingredients={this.state.ingredients}/>
			   <BuildControls 
			       ingredientAdded={this.addIngredientsHandler}
			       ingredientRemoved={this.removeIngredientsHandler}
			       disabled={disabledInfo}
			       purchasable={this.state.purchasable}
			       ordered={this.purchaseHandler}
			       price={this.state.totalPrice}/>
			</Aux> 

		);
	}
}

export default BurgerBuilder;