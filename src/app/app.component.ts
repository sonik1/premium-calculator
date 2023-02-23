import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'premium-calculator';
  myDateValue: Date;
  name = 'Angular';
  maxDate = new Date();
  minDate = this.calculateMaxAge();
  bsConfig = { showWeekNumbers: false, dateInputFormat: 'DD-MMM-YYYY' };
  registerForm: FormGroup;
  amount:any;
  tpdAmount:any;
  rating:any;
  occupation_list:any = [
    {
      "occupation":"Cleaner",
      "rating":"Light Manual",
      "factor":"1.50"
    },
    {
      "occupation":"Doctor",
      "rating":"Professional",
      "factor":"1.0"
    },
    {
      "occupation":"Author",
      "rating":"White Collar",
      "factor":"1.25"
    },
    {
      "occupation":"Farmer",
      "rating":"Heavy Manual",
      "factor":"1.75"
    },
    {
      "occupation":"Mechanic",
      "rating":"Heavy Manual",
      "factor":"1.75"
    },
    {
      "occupation":"Florist",
      "rating":"Light Manual",
      "factor":"1.50"
    },
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myDateValue = new Date();
    this.createRegisterForm();
  }
  onDateChange(newDate: Date) {
    console.log(newDate);
  }
  calculateMaxAge(){
    var oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 70);
    var year = oneYearFromNow.toLocaleString("default", { year: "numeric" });
    var month = oneYearFromNow.toLocaleString("default", { month: "2-digit" });
    var day = oneYearFromNow.toLocaleString("default", { day: "2-digit" });
    var formattedDate = year + "-" + month + "-" + day;
    return new Date(formattedDate);
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      emailId: ['', Validators.compose([Validators.required,
      Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      age: ['', Validators.compose([Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]+$')])],
      dob: ['', Validators.compose([Validators.required])],
      occupation: ['', Validators.compose([Validators.required])],
      dsii: ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')])],
    });
  }
  get f() { return this.registerForm.controls; }
  registerFormSubmit(value) {
    console.log(value);
    
    let occupation_rating = this.occupation_list.find(object => object.occupation === value.occupation)
    console.log(occupation_rating);

    this.rating = occupation_rating.factor;

    this.amount = (((value.dsii * this.rating * value.age)/1000) * 12);

    this.tpdAmount = (((value.dsii * this.rating * value.age)/1234)).toFixed(2);
  }

  changePremium(e) {
    console.log(e.target.value);

    let controls = this.registerForm.controls;
    let dsi = controls.dsii.value;
    let person_occupation = controls.occupation.value;
    let person_age = controls.age.value;

    if(dsi && person_occupation && person_age){
      let occupation_rating = this.occupation_list.find(object => object.occupation === person_occupation)
      console.log(occupation_rating);

      this.rating = occupation_rating.factor;

      this.amount = (((dsi * this.rating * person_age)/1000) * 12);

      this.tpdAmount = (((dsi * this.rating * person_age)/1234)).toFixed(2);
    }

  }
}
