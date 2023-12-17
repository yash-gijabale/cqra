import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonService } from '../common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from '../service/client-service.service';

export class ContractorData {
  constructor(
    public contractorId: number,
    public contractorName: string,
    public contarctorAddress: string,
    public contarctorEmail: string,
    public contarctorPhone: string,
    public isActive: boolean
  ) { }
}

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent implements OnInit {

  title = 'datatables'
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ContractorData> = new Subject();
  // submitted = false;
  contractors: ContractorData[]

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private clientService: ClientServiceService
    ) { }


  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 25, 50]
    };

    this.commonService.getAllContractors().subscribe((data) => {
      console.log('----> office service : get all data', data);
      this.contractors = data;
      this.dtTrigger.next();
      this.isLoading = false

    }, (err) => {
      console.log('-----> err', err);
    })

  }

  editContractor(id) {

    this.router.navigate(['createContractor', id])

  }

  deleteContractor(id)
  {
    const isdelete = confirm('Are sure want to delete ?')
    if(isdelete)
    {
      this.clientService.deleteContractor(id)
      .subscribe(
        data => {
          console.log('deleted !')
          location.reload()
        },
        err => console.log(err)
      )
    }

  }





}
