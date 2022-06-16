import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router,Event as RouterEvent, NavigationStart, NavigationEnd,NavigationCancel, NavigationError
} from '@angular/router'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private appService: AppServiceService,
    config: NgbModalConfig,
    private router: Router,
    private modalService: NgbModal
  ) {

    config.backdrop = 'static';
    config.keyboard = false;
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  public contacts: any = []
  public showOverlay = true;

  public modalTitle = ""
  public contactId = 0
  public name = ""
  public email = ""
  public phone=""
  public company = ""
  public notes=""



  ngOnInit(): void {
    this.refreshList()
  }

  refreshList(){
    this.appService.getAllContacts().subscribe(data=>{
      this.contacts  = data
      console.log("Test",this.contacts)
    })
  }

  openXlModal(content:any) {
    this.modalService.open(content, { size: 'xl' }).result.then((result:any) => {
      console.log("Modal closed" + result);
    }).catch((res:any) => { });
  }

  addContacts(){
    this.modalTitle = "Add Contacts"
    this.name = ""
    this.email = ""
    this.phone=""
    this.company = ""
    this.notes=""
  }

  editContacts(cont:any){
    this.modalTitle = "Edit Contacts"

    this.contactId = cont.ContactId
    this.name = cont.Name
    this.email = cont.Email
    this.phone= cont.Phone
    this.company = cont.Company
    this.notes= cont.Notes
  }

  createContact(){
    let contact = {
      Name: this.name,
      Email: this.email,
      Phone: this.phone,
      Company: this.company,
      Notes: this.notes
    }
    this.appService.createContact(contact).subscribe(data=>{
      this.refreshList()
    })
    this.modalService.dismissAll();
  }



  updateContact(){
    let contact = {
      ContactId:this.contactId,
      Name: this.name,
      Email: this.email,
      Phone: this.phone,
      Company: this.company,
      Notes: this.notes
    }
    this.appService.updateContact(contact).subscribe(data=>{
      this.refreshList()
    })
    this.modalService.dismissAll();
  }

  deleteContact(contactId:any){

    this.appService.deleteContact(contactId).subscribe(data=>{
      this.refreshList()
    })
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }


    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }

}
