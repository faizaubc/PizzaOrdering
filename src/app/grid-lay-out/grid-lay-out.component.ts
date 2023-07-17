import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-grid-lay-out',
  templateUrl: './grid-lay-out.component.html',
  styleUrls: ['./grid-lay-out.component.css']
})
export class GridLayOutComponent {
  toppingsListVeggies: any=[];
  toppingsListNonVeggies: any=[];
  listOfQuantities: any=[];
  total:any=0;
  totalsObject: any={};
  totalsDisplayObject: any={};
  offers: any={};
  toppingsCountedTwice: any=["barbecueChicken", "Pepperoni"];


  ngOnInit():void{
    this.initialize();
  }

  initialize(){
    this.toppingsListVeggies=[{
      name:"Tomatoes ($1.00)",
      price:"1.00",
      id:"tomatoes"
    },
    {
      name:"Onions ($0.50)",
      price:"0.50",
      id:"onions"
    },
    {
      name:"Bell Pepper ($1.00)",
      price:"1.00",
      id:"bellpepper"
    },
    {
      name:"Mushrooms ($1.20)",
      price:"1.20",
      id:"mushrooms"
    },

    {
      name:"Pineapple ($0.75)",
      price:"0.75",
      id:"pineapple"
    }];



    this.toppingsListNonVeggies=[{
      name:"Sausage($1.00)",
      price:"1.00",
      id:"sausage"
    },

    {
      name:"Pepperoni ($2.00)",
      price:"2.00",
      id:"Pepperoni"
    },

    {
      name:"Barbecue Chicken ($3.00)",
      price:"3.00",
      id:"barbecueChicken"
    }
  ];

  this.totalsObject = 
  {
    totalSmallPizza: 0,
    totalMediumPizza: 0,
    totalLargePizza: 0,
    totalExtraLargePizza:0
  };

  this.totalsDisplayObject = 
  {
    totalSmallPizza: 0,
    totalMediumPizza: 0,
    totalLargePizza: 0,
    totalExtraLargePizza:0
  };



  this.listOfQuantities=[
    {
      id: "small"
    },
    {
      id:  "medium"
    },
    {
      id: "large"
    },
    {
      id: "extralarge"
    }

  ];

  this.offers={
    Offer1:{
    id:"Offer1",
    quantity: 1,
    toppings: 2,
    type: "medium",
    price: 5.00,
    percent: 0.00,
    visible:false

  },
  Offer2:{
    id:"Offer2",
    quantity:2,
    toppings: 4,
    type: "medium",
    price: 9,
    percent:0,
    visible:false
  },
    Offer3:{
    id:"Offer3",
    quantity: 1,
    toppings: 4,
    type: "large",
    price: 0,
    percent:50,
    visible:false
  }
  };

  }

  receiveClickedCheckBoxId($event:any){
    console.log($('#' + $event).prop('checked'));
    this.calculateTotalPriceForEachPizza();
  }




  calculateTotalPriceForEachPizza(){
    
    //loop through each pizza toppings and see the checked ones via jQuery
    var smallPizzaToppingsChecked = $('input:checkbox[id$="-sm"]:checked');
    this.totalsObject.totalSmallPizza= this.calculateTotals(smallPizzaToppingsChecked);
    (smallPizzaToppingsChecked.length > 0)? this.totalsObject.totalSmallPizza +=5: this.totalsObject.totalSmallPizza;
    

    var mediumPizzaToppingsChecked = $('input:checkbox[id$="-md"]:checked');
    this.totalsObject.totalMediumPizza= this.calculateTotals(mediumPizzaToppingsChecked);
    (mediumPizzaToppingsChecked.length > 0)? this.totalsObject.totalMediumPizza +=7: this.totalsObject.totalMediumPizza;
   

    var largePizzaToppingsChecked = $('input:checkbox[id$="-lg"]:checked');
    this.totalsObject.totalLargePizza= this.calculateTotals(largePizzaToppingsChecked);
    (largePizzaToppingsChecked.length > 0)? this.totalsObject.totalLargePizza +=8: this.totalsObject.totalLargePizza;
    

    var extraLargePizzaToppingsChecked = $('input:checkbox[id$="-exlg"]:checked');
    this.totalsObject.totalExtraLargePizza= this.calculateTotals(extraLargePizzaToppingsChecked);
    (extraLargePizzaToppingsChecked.length > 0)? this.totalsObject.totalExtraLargePizza +=9: this.totalsObject.totalExtraLargePizza;

    this.calculateOffers();
  }

  calculateTotals(checkboxes:any){
    var totalPrice = 0;
    for(var check of checkboxes){
      var splitted = check.id.split("-"); 
      var pizzaSize = splitted[1];
      var toppingName = splitted[0];
      totalPrice += this.findTheToppingsPrice(toppingName);
    }
    return totalPrice;
  }


  calculateOffers(){

    for(var key in this.offers){

      switch(this.offers[key].type){

        case"small":
        break;

        case"medium":
        var quantityMed = this.grabQuantity("medium");
        var checkedMediumPizzaToppings = $('input:checkbox[id$="-md"]:checked');
        var mediumPizzaToppingsCheckedCount = checkedMediumPizzaToppings.length /*+ this.adjustToppingsCountForParticularToppings(checkedMediumPizzaToppings)*/;
        this.totalsObject.totalMediumPizza = this.calculateOffer(mediumPizzaToppingsCheckedCount, this.offers[key], this.totalsObject.totalMediumPizza, quantityMed);
        break;

        case"large":
        var quantityLg = this.grabQuantity("large");
        var checkedLargePizzaToppings = $('input:checkbox[id$="-lg"]:checked');
        var largePizzaToppingsCheckedCount = checkedLargePizzaToppings.length+ this.adjustToppingsCountForParticularToppings(checkedLargePizzaToppings);
        this.totalsObject.totalLargePizza = this.calculateOffer(largePizzaToppingsCheckedCount, this.offers[key], this.totalsObject.totalLargePizza, quantityLg);
        break;

        case"extralarge":
        break;

        default:
          break;
      }
    }

    this.modifyTotalsForEachQuantity("small");
    this.modifyTotalsForEachQuantity("medium");
    this.modifyTotalsForEachQuantity("large");
    this.modifyTotalsForEachQuantity("extralarge");
      
  }

  modifyTotalsForEachQuantity(id:string){
    var quantityNumeric = this.grabQuantity(id);
    switch(id){
      case "small":
        (this.checkOfferIsActive("small"))?
        this.totalsDisplayObject.totalSmallPizza= this.totalsObject.totalSmallPizza :
        this.totalsDisplayObject.totalSmallPizza= this.totalsObject.totalSmallPizza * quantityNumeric;
      break;
      case"medium":
      (this.checkOfferIsActive("medium"))?
      this.totalsDisplayObject.totalMediumPizza= this.totalsObject.totalMediumPizza :
        this.totalsDisplayObject.totalMediumPizza=this.totalsObject.totalMediumPizza * quantityNumeric;
      break;
      case"large":
      (this.checkOfferIsActive("large"))?
      this.totalsDisplayObject.totalLargePizza= this.totalsObject.totalLargePizza :
        this.totalsDisplayObject.totalLargePizza= this.totalsObject.totalLargePizza * quantityNumeric;
      break
      case"extralarge":
      (this.checkOfferIsActive("extralarge"))?
      this.totalsDisplayObject.totalExtraLargePizza= this.totalsObject.totalExtraLargePizza :
        this.totalsDisplayObject.totalExtraLargePizza=this.totalsObject.totalExtraLargePizza * quantityNumeric;
      break;
      default:
      break;
    }

  }

  checkOfferIsActive(id:string){
    for(var key in this.offers){
      {
        if(this.offers[key].type == id && this.offers[key].visible == true){
          return true;
        }
      }
    }
    return false;
  }

  adjustToppingsCountForParticularToppings(checkboxes:any){
    var countToppingsAsDouble=0;
    for(var check of checkboxes){
      var splitted = check.id.split("-"); 
      var pizzaSize = splitted[1];
      var toppingName = splitted[0];
      if(this.toppingsCountedTwice.includes(toppingName))
        countToppingsAsDouble++;
    }
    return countToppingsAsDouble;
  }
 

  grabQuantity(id:string){
    var quantity = $('#'+id).val();
    if(!quantity)
      return 0;
    var quantityNumeric = parseInt(quantity.toString());  
    if(quantityNumeric < 0)
      return 0;
    return quantityNumeric;
  }

  calculateOffer(totalCheckBoxes: number, offer:any, currentPrice: any, quantity: any){
    if(offer.toppings==totalCheckBoxes){
      if(offer.price > 0 && offer.quantity == quantity ){
        offer.visible= true;
        return offer.price
      }
      if(offer.percent > 0 && offer.quantity == quantity){
        offer.visible= true;
        return currentPrice *= (offer.percent/100);
      }
      offer.visible= false;
    }else{
      offer.visible= false;
    }

    return currentPrice;
  }


findTheToppingsPrice(toppingName:string){
  for(let prop of this.toppingsListVeggies){
      if(prop.id== toppingName)
        return parseFloat(prop.price);
  }

  for(let prop of this.toppingsListNonVeggies){
    if(prop.id== toppingName)
      return parseFloat(prop.price);
}

return 0;
}



}
