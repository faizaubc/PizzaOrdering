import { Component , Input, Output, EventEmitter} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.css']
})
export class ToppingsComponent {
  @Input() toppingName: any;
  @Input() id: any;
  @Output() totalsEvent = new EventEmitter<string>();

  listOfToppingsIds:any=[];



  ngOnInit():void{
    this.initializeArrays();  
  }

  initializeArrays(){
    this.listOfToppingsIds=[
      {
        id: this.id + "-sm"
      },
      {
        id: this.id + "-md"
      },
      {
        id: this.id + "-lg"
      },
      {
        id: this.id + "-exlg"
      }

    ];

  }

  sendCheckedId(id:any){
    console.log($('#' + id).prop('checked'));
    this.totalsEvent.emit(id);
  }
  
}
