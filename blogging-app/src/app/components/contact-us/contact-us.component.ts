import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/services/contact-us.service';
import Swal from 'sweetalert2';
import { ContactUs } from '../contact-us';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contact: ContactUs=new ContactUs();

  constructor(private contactUsServe: ContactUsService) { }

  ngOnInit(): void {
  }
  addContactUs(){
    this.contactUsServe.addContactUs(this.contact).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }

  formSubmit(){
    console.log(this.contact);
    console.log("hello");
    this.addContactUs();

    Swal.fire('Success','message sent successfully','success');

  }

}
