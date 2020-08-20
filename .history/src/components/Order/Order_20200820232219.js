import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  //transformisanje objekta ingredients u array
  //mogli smo korsititi istu logiku kau u Burger.js-u
  //Ali cemo raditi alternativni nacin

  const ingredients = [];
  //console.log(ingredients);    //[{name: bacon, value: 0}, {name:cheese,  value:0}, {name: meat, value: 1}, {name:salad,  value:0}], {sve naruddzbe tako}]
  debugger;
  for (let ingredientName in props.ingredients) {
    debugger;
    //console.log(props.ingredients);
    //{bacon: 0, cheese: 0, meat: 0, salad: 1}...
    //console.log('props.ingredients[ingredientName]: ' + props.ingredients[ingredientName]);
    ingredients.push({
      name: ingredientName,
      value: props.ingredients[ingredientName],
    });
    //props.ingredients[ingredientName]   value: 1 2 ili 3 itd
    //console.log('props.ingredients[ingredientName]: ' + props.ingredients[ingredientName]);
    //{bacon: 1, cheese: 0, meat: 0, salad: 1}
    //console.log('ingredients: ' + ingredients);
  }

  //console.log(props);

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span className={classes.IngredientsOutput} key={ig.name}>
        {ig.name} ({ig.value})
      </span>
    );
    /*
      0: {name: "bacon", value: 1}
      1: {name: "cheese", value: 1}
      */
  });

  //const customerOutput =

  return (
    //dole u divu zelimo outputsti dakle ingredients i total price
    //A ingredients iz Checkouta koliko se sjecam

    //Ovaj fajl Order je kako treba da izgleda jedan single Order
    //A tamo u Orders definisemo ih onoliko koliko ih treba

    <div className={classes.Order}>
      <p><span>Ingredients:</span> {ingredientOutput}</p>
      <p>
        Price: <strong>{props.price.toFixed(2)} KM</strong>
      </p>
    </div>
  );
};

export default Order;
