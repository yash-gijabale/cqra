import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { ActivatedRoute, Router} from '@angular/router';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { data } from 'jquery';
import { ClientServiceService } from 'src/app/service/client-service.service';

export class FirstNote{
  constructor(
    public firstNoteId: number,
    public sanpAuditId: number,
    public firstNoteText: string
  ){}
}
@Component({
  selector: 'app-first-note',
  templateUrl: './first-note.component.html',
  styleUrls: ['./first-note.component.css']
})
export class FirstNoteComponent implements OnInit {
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<FirstNote> = new Subject<FirstNote>();
  // forman: FormanData[];

  snapAuditId:number;
  // firstNoteForm: FormGroup;
  firstNotes: FirstNote[];
  isLoading: boolean

  constructor(
    private route:ActivatedRoute,
    // private formBuilder:FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private clientService:ClientServiceService
    ) { }

  ngOnInit() {
    this.isLoading = true
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive:true,
      scrollX:true
    };
    this.snapAuditId = this.route.snapshot.params['id'];
    // this.firstNoteForm = this.formBuilder.group({
    //   sanpAuditId: ['', Validators.required],
    //   firstNoteText: ['', Validators.required]
    // })

    this.clientService.getFirstNoteBySnapAudit(this.snapAuditId)
    .subscribe(data => {
      console.log('note data------>', data)
      this.firstNotes = data;
      this.dtTrigger.next();
      this.isLoading = false
      // setTimeout(
      //   function () {
      //   }.bind(this)
      // );
  
    })
  }


  editNote(id)
  {
    this.router.navigate(['createFirstNote', this.snapAuditId, id])
  }

  deActivate(id){
    let isDelete = confirm('Are You sure want to delete ?')
    if(isDelete)
    {
      this.clientService.deleteFirstNote(id)
      .subscribe(data =>{
        console.log('deleted')
        location.reload()
      })
    }
  }


}
