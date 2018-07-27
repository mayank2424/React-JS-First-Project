//burger Compoennt is used here and its the main component where structure of burger is rendering

import React from 'react';
import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger=(props)=>{ 
	//getIngredients is just an array ,stroing ingredients value in array form 
	let editIngredients=Object.keys(props.ingredients).map(igKey => {   //Here map funciton creates a new array by calling function once for every elelent in array given in arguments and it doesn;t chnage original array
		return [...Array(props.ingredients[igKey])].map((_, i)=>{  
			return <BurgerIngredient key={igKey + i} type={igKey} />
		});
	})
	.reduce((arr,el) => {
		return arr.concat(el);
	},[]);

	if(editIngredients.length===0){
		editIngredients=<p>Please Add Ingredients</p>
	}
	// console.log(editIngredients);

	return(
         <div className={classes.Burger}>
           <BurgerIngredient type="bread-top" />
             {editIngredients}
           <BurgerIngredient type="bread-bottom" />
         </div>
		)
}

export default burger;
