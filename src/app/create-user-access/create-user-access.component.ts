import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from '../service/client-service.service';
import { CommonService } from '../common.service'; import { UserView } from '../user-log/user-log.component';
import { UserService } from '../service/user.service';
import { SnackBarComponent } from '../loader/snack-bar/snack-bar.component';

@Component({
  selector: 'app-create-user-access',
  templateUrl: './create-user-access.component.html',
  styleUrls: ['./create-user-access.component.css']
})


export class CreateUserAccessComponent implements OnInit {
  accessFrom: FormGroup;
  submitted = false;
  SelUser: string = "0";
  userMenu: any = {}
  users: UserView[]
  userId:Number
  isLoading:boolean

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private commonService: CommonService,
    private userService: UserService,
    private snackBar: SnackBarComponent
  ) { }

  ngOnInit() {


    this.userId = this.route.snapshot.params['id']
    this.getUserAccess(this.userId)
    this.commonService.getAllUsers()
      .subscribe(data => {
        this.users = data
        this.accessFrom.patchValue({ pkUserId: sessionStorage.getItem('id') })


      })
    this.accessFrom = this.formBuilder.group({
      pkUserId: [0, Validators.nullValidator],
      clientMenu: [0, Validators.nullValidator],
      schemeMenu: [0, Validators.nullValidator],
      buildingMenu: [0, Validators.nullValidator],
      floorMenu: [0, Validators.nullValidator],
      unitMenu: [0, Validators.nullValidator],
      unitItemMenu: [0, Validators.nullValidator],
      tradeMenu: [0, Validators.nullValidator],
      questionMenu: [0, Validators.nullValidator],
      questionGroupMenu: [0, Validators.nullValidator],
      questionHeadingMenu: [0, Validators.nullValidator],
      subgroupMenu: [0, Validators.nullValidator],
      userMenu: [0, Validators.nullValidator],
      roleMenu: [0, Validators.nullValidator],
      userAllocationMenu: [0, Validators.nullValidator],
      severityMenu: [0, Validators.nullValidator],
      manageUserAccessMenu: [0, Validators.nullValidator],
      checklistGenerationMenu: [0, Validators.nullValidator],
      qrr: [0, Validators.nullValidator],
      qur: [0, Validators.nullValidator],
      nc: [0, Validators.nullValidator],
      ncr: [0, Validators.nullValidator],
      qualityRecommendation: [0, Validators.nullValidator],
      userId: [0, Validators.nullValidator],
      tradeGroup: [0, Validators.nullValidator],
      assignContractor: [0, Validators.nullValidator],
      schemeMomMenu: [0, Validators.nullValidator],
      regionalManagerMenu: [0, Validators.nullValidator],
      contractorMenu: [0, Validators.nullValidator],
      supervisorMenu: [0, Validators.nullValidator],
      foremanMenu: [0, Validators.nullValidator],
      clientStaffMenu: [0, Validators.nullValidator],
      mockupMenu: [0, Validators.nullValidator],
      qualityIpMenu: [0, Validators.nullValidator],
      trainingMenu: [0, Validators.nullValidator],
      kickoffMenu: [0, Validators.nullValidator],
      methodStatementMenu: [0, Validators.nullValidator],
      deletedNcMenu: [0, Validators.nullValidator],
      inductionMenu: [0, Validators.nullValidator],
      ncStatusMenu: [0, Validators.nullValidator],
      ncClosureMenu: [0, Validators.nullValidator],
      qpaMenu: [0, Validators.nullValidator],
      downloadReports: [0, Validators.nullValidator],
      nccloseHistory: [0, Validators.nullValidator],
      logMenu: [0, Validators.nullValidator],
      nclogMenu: [0, Validators.nullValidator],
      pnf: [0, Validators.nullValidator],
      mnp: [0, Validators.nullValidator],
      nnc: [0, Validators.nullValidator],
      nnco: [0, Validators.nullValidator],
      ra: [0, Validators.nullValidator],
      sfa: [0, Validators.nullValidator],
      queView: [0, Validators.nullValidator],
      gdremark: [0, Validators.nullValidator],
      addExt: [0, Validators.nullValidator],
      misLink: [0, Validators.nullValidator],
      misLinkNew: [0, Validators.nullValidator],
      userLog: [0, Validators.nullValidator],
      ta: [0, Validators.nullValidator],
      ma: [0, Validators.nullValidator],
      pat: [0, Validators.nullValidator],
      pam: [0, Validators.nullValidator],
      tam: [0, Validators.nullValidator],
      qrr1: [0, Validators.nullValidator],
      rgct: [0, Validators.nullValidator],
      ca: [0, Validators.nullValidator],
      cam: [0, Validators.nullValidator],
      momlog: [0, Validators.nullValidator],
      cccia: [0, Validators.nullValidator],
      qi: [0, Validators.nullValidator],
      qo: [0, Validators.nullValidator],
      ncco1: [0, Validators.nullValidator],
      iu: [0, Validators.nullValidator],
      sar: [0, Validators.nullValidator],
      cis: [0, Validators.nullValidator],
      hi: [0, Validators.nullValidator],
      clientMis: [0, Validators.nullValidator],
      clientNcr: [0, Validators.nullValidator],
      clientDr: [0, Validators.nullValidator],
      qos: [0, Validators.nullValidator],
      auditReport: [0, Validators.nullValidator],
      aSnapAudit: [0, Validators.nullValidator],
      aQualityIndex: [0, Validators.nullValidator],
      aHomeInspect: [0, Validators.nullValidator],
      aHomeInspect1: [0, Validators.nullValidator],
      aDownloadReport: [0, Validators.nullValidator],
      aInspectReport: [0, Validators.nullValidator],
      ncClosureMenu1: [0, Validators.nullValidator],
      webCard: [0, Validators.nullValidator],
      mirLink: [0, Validators.nullValidator],
      clientDash: [0, Validators.nullValidator],
      ncBeanCreater: [0, Validators.nullValidator],
      ncBeanReviewer: [0, Validators.nullValidator],
      ncBeanApprover: [0, Validators.nullValidator],
      wash: [0, Validators.nullValidator],
      qipr: [0, Validators.nullValidator],
      ncBeanCreaterNew: [0, Validators.nullValidator],
      ncBeanReviewerNew: [0, Validators.nullValidator],
      ncBeanApproverNew: [0, Validators.nullValidator],
      aorReport: [0, Validators.nullValidator],
      aorClientReport: [0, Validators.nullValidator],
      aHomeInspect2: [0, Validators.nullValidator],
      dtmDeclaration: [0, Validators.nullValidator],
      inspectorDeclaration: [0, Validators.nullValidator],
      newInsTraining: [0, Validators.nullValidator],
      underInsTraining: [0, Validators.nullValidator],
      preSnapAuditForm: [0, Validators.nullValidator],
    })
  }
  get f() { return this.accessFrom.controls; }


  userAllocationLoad: boolean = false
  onSubmit() {
    this.userAllocationLoad = true
    console.log("Id==");
    let a = document.querySelectorAll('.form-check-input')

    // console.log((<HTMLInputElement>a[0]).attributes[2].value)
    this.accessFrom.value.pkUserId = this.userId
    a.forEach(menu => {
      this.accessFrom.value[(<HTMLInputElement>menu).attributes[2].value] = (<HTMLInputElement>menu).checked ? 1 : 0
    })

    console.log(this.accessFrom.value)
    this.userService.setUserAccess(this.accessFrom.value)
      .subscribe(data => {
        console.log('added-->', data)
        this.snackBar.showSuccess('Allocation added successfully')
        this.userAllocationLoad = false

      }, err =>{
        this.snackBar.showSnackError('Something is wrong !')
        this.userAllocationLoad = false
      })


  }

  getUserAccess(id) {
    this.isLoading = true

    this.userService.getUserAccess(id)
      .subscribe(data => {
        console.log("User Access",data)
        this.userMenu = data
      this.isLoading = false

      }, err =>{
      this.isLoading = false

      })
  }

  addCheckMenu(e) {
    console.log(e)
    this.accessFrom.value[e.target.attributes.formcontrolname.value] = e.target.checked ? 1 : 0
    console.log(this.accessFrom.value)
  }
}
