import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
import { first } from 'rxjs/operators';


export class RoleView {
  constructor(
    public id: number,
    public name: string
  ) { }
}

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  roleForm: FormGroup
  roles: RoleView
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<RoleView> = new Subject<RoleView>();

  isLoading: boolean = false
  isbtnLoading = false
  isUpdate: boolean = false
  roleId: number
  submitted:boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
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

    this.userService.getAllRoles().subscribe(data => {
      this.roles = data
      this.dtTrigger.next();
      this.isLoading = false
    })

    this.roleForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  get f() {
    return this.roleForm.controls
  }
  onSubmit() {
    // Toast.show('#liveToast')
    // return/
    this.submitted = true
    if (this.roleForm.invalid) {
      return
    }
    this.isbtnLoading = true
    console.log(this.roleForm.value)
    if (this.isUpdate) {
      this.userService.updateRole(this.roleForm.value, this.roleId)
        .subscribe(data => {
          console.log('ROles Updted', data)
          this.userService.getAllRoles().subscribe(data => this.roles = data)
          this.isUpdate = false
          this.isbtnLoading = false
          this.roleForm.reset()
        })

    } else {

      this.userService.addRoles(this.roleForm.value)
        .subscribe(data => {
          console.log('ROles addded', data)
          this.userService.getAllRoles().subscribe(data => this.roles = data)
          this.isbtnLoading = false
          this.roleForm.reset()

        })
    }
  }

  getRole(id) {
    this.isUpdate = true
    this.roleId = id
    this.isLoading = true
    this.userService.getRole(id)
      .pipe(first())
      .subscribe(data => {
        this.roleForm.patchValue(data)
        this.isLoading = false
      })
  }

  deactiveRole(id) {
    let isDeactive = confirm('Are you sure want to deactive ?')
    if (isDeactive) {
      this.userService.deactiveRole(id)
        .subscribe(data => this.userService.getAllRoles().subscribe(data => this.roles = data))
    }
  }

}
