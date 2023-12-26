import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { ClientServiceService } from 'src/app/service/client-service.service';

export class LastNoteData {
  constructor(
    public lastNoteId: number,
    public snapAuditId: number,
    public lastMoteText: string,
  ) { }
}
@Component({
  selector: 'app-last-note',
  templateUrl: './last-note.component.html',
  styleUrls: ['./last-note.component.css']
})
export class LastNoteComponent implements OnInit {
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<LastNoteData> = new Subject<LastNoteData>();
  // forman: FormanData[];

  snapAuditId: number;
  // firstNoteForm: FormGroup;
  lastNotes: LastNoteData[];
  isLoading: boolean

  constructor(
    private route: ActivatedRoute,
    // private formBuilder:FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private clientService: ClientServiceService
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive: true,
      scrollX: true
    };
    this.snapAuditId = this.route.snapshot.params['id'];
    // this.firstNoteForm = this.formBuilder.group({
    //   sanpAuditId: ['', Validators.required],
    //   firstNoteText: ['', Validators.required]
    // })

    this.clientService.getAllLastNoteBySnapAudit(this.snapAuditId)
      .subscribe(data => {
        console.log('note data------>', data)
        this.lastNotes = data;
        this.dtTrigger.next();
        this.isLoading = false
      })
  }


  editNote(id) {
    this.router.navigate(['createLastNote', this.snapAuditId, id])
  }

  deActivate(id) {
    let isDelete = confirm('Are You sure want to delete ?')
    if (isDelete) {
      this.clientService.deleteFirstNote(id)
        .subscribe(data => {
          console.log('deleted')
          location.reload()
        })
    }
  }


}