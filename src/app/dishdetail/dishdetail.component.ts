
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild,Input,Directive ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


const DISH = {
  name: 'Uthappizza',
  image: '/assets/images/uthappizza.png',
  category: 'mains',
  label: 'Hot',
  
  price: '4.99',
  description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
  comments: [
    {
      rating: 5,
      comment: "Imagine all the eatables, living in conFusion!",
      author: "John Lemon",
      date: "2012-10-16T17:57:28.556094Z"
    },
    {
      rating: 4,
      comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
      author: "Paul McVites",
      date: "2014-09-05T17:57:28.556094Z"
    },
    {
      rating: 3,
      comment: "Eat it, just eat it!",
      author: "Michael Jaikishan",
      date: "2015-02-13T17:57:28.556094Z"
    },
    {
      rating: 4,
      comment: "Ultimate, Reaching for the stars!",
      author: "Ringo Starry",
      date: "2013-12-02T17:57:28.556094Z"
    },
    {
      rating: 2,
      comment: "It's your birthday, we're gonna party!",
      author: "25 Cent",
      date: "2011-12-02T17:57:28.556094Z"
    }
  ]
};

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishDetailComponent implements OnInit {

  @Input()
  dish:Dish;
  dishIds: string[];
  prev: string;
  next: string;
  curDate=new Date();
  //new form
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('baseURL') private baseURL,
    private fb:FormBuilder) {
      this.createForm();
     }

  //form for comment
  commentForm: FormGroup;
  comment: Comment;
  
  //headings
  formErrors = {
    'author': '',
    'comment': ''
  };
  
  //validation
  validationMessages = {
    'author': {
      'required':      ' Name is required.',
      'minlength':     ' Name must be at least 2 characters long.',
      'maxlength':     ' Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 1 characters long.',
      
    },
    
  };


    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    }
  
    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
  
    
  //create form  
    createForm() {
      this.commentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        comment: ['', [Validators.required, Validators.minLength(1)] ],
        rating: 5
      });
  
      this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  
      this.onValueChanged(); // (re)set validation messages now
    }

  //submit form
  onSubmit() {
    this.comment = this.commentForm.value;
    
    console.log(this.comment);

    
    
  }
  //value changes
    onValueChanged(data?: any) {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
      for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
      this.comment = form.value;
    }

  goBack(): void {
    this.location.back();
  }
  
  

}