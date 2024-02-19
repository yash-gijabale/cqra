import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from '../service/client-service.service';
import { CommonService } from '../common.service';import { UserView } from '../user-log/user-log.component';


@Component({
  selector: 'app-create-user-access',
  templateUrl: './create-user-access.component.html',
  styleUrls: ['./create-user-access.component.css']
})


export class CreateUserAccessComponent implements OnInit {
  accessFrom: FormGroup;
  submitted = false;
  SelUser: string = "0";
  userMenu = JSON.parse(sessionStorage.getItem('userMenu'))
  users: UserView[]
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientServiceService: ClientServiceService,
    private commonService: CommonService
  ) { }

  ngOnInit() {

    this.commonService.getAllUsers()
    .subscribe(data =>{
        this.users = data
    })
  }
  // get f() { return this.accessFrom.controls; }

  onSubmit() {
    console.log("Id==");


    this.accessFrom = this.formBuilder.group({
      "pkUserId": 1,
      "clientMenu": 1,
      "schemeMenu": 1,
      "buildingMenu": 1,
      "floorMenu": 1,
      "unitMenu": 1,
      "unitItemMenu": 1,
      "tradeMenu": 1,
      "questionMenu": 1,
      "questionGroupMenu": 1,
      "questionHeadingMenu": 1,
      "subgroupMenu": 1,
      "userMenu": 1,
      "roleMenu": 1,
      "userAllocationMenu": 1,
      "severityMenu": 0,
      "manageUserAccessMenu": 1,
      "checklistGenerationMenu": 1,
      "qrr": 1,
      "qur": 1,
      "nc": 1,
      "ncr": 1,
      "qualityRecommendation": 1,
      "userId": 1,
      "tradeGroup": 1,
      "assignContractor": 1,
      "schemeMomMenu": 1,
      "regionalManagerMenu": 0,
      "contractorMenu": 1,
      "supervisorMenu": 1,
      "foremanMenu": 1,
      "clientStaffMenu": 1,
      "mockupMenu": 1,
      "qualityIpMenu": 1,
      "trainingMenu": 1,
      "kickoffMenu": 1,
      "methodStatementMenu": 1,
      "deletedNcMenu": 1,
      "inductionMenu": 1,
      "ncStatusMenu": 1,
      "ncClosureMenu": 1,
      "qpaMenu": 1,
      "downloadReports": 1,
      "nccloseHistory": 1,
      "logMenu": 1,
      "nclogMenu": 1,
      "pnf": 1,
      "mnp": 1,
      "nnc": 1,
      "nnco": 0,
      "ra": 1,
      "sfa": 1,
      "queView": 1,
      "gdremark": 1,
      "addExt": 1,
      "misLink": 1,
      "misLinkNew": 1,
      "userLog": 0,
      "ta": 1,
      "ma": 1,
      "pat": 1,
      "pam": 1,
      "tam": 1,
      "qrr1": 1,
      "rgct": 1,
      "ca": 1,
      "cam": 1,
      "momlog": 1,
      "cccia": 1,
      "qi": 1,
      "qo": 1,
      "ncco1": 1,
      "iu": 0,
      "sar": 1,
      "cis": 1,
      "hi": 1,
      "clientMis": 0,
      "clientNcr": 0,
      "clientDr": 0,
      "qos": 1,
      "auditReport": 0,
      "aSnapAudit": 1,
      "aQualityIndex": 1,
      "aHomeInspect": 1,
      "aHomeInspect1": 1,
      "aDownloadReport": 1,
      "aInspectReport": 1,
      "ncClosureMenu1": "1",
      "webCard": "1",
      "mirLink": 1,
      "clientDash": 1,
      "ncBeanCreater": 1,
      "ncBeanReviewer": 1,
      "ncBeanApprover": 1,
      "wash": 1,
      "qipr": 1,
      "ncBeanCreaterNew": 1,
      "ncBeanReviewerNew": 1,
      "ncBeanApproverNew": 1,
      "aorReport": 1,
      "aorClientReport": 0,
      "aHomeInspect2": 0
    })
  }

}
