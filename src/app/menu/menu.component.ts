import { Component, OnInit ,Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { HttpClientModule } from '@angular/common/http'
import { DishService } from '../services/dish.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  dishes: Dish[]; 
  errMess:String;

  constructor(private dishService: DishService,@Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errMess =>  this.errMess = <any>errMess);
    
 }
  
}





