import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateionService {

  //private REST_API_SERVER = "http://18.217.108.137:8080";
  // private REST_API_SERVER = "http://18.217.108.137:9090"; //working Ip
  private REST_API_SERVER = "http://localhost:9090"; //local Ip for testing
  // private REST_API_SERVER = "http://ec2-3-142-240-133.us-east-2.compute.amazonaws.com:8080";
  // Adds CORS header to the request?
  //private httpOptions = { headers: new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origins':'*'})};

  user1 = {
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
  }

  user2 = {
    "pkUserId": 187,
    "clientMenu": 1,
    "schemeMenu": 0,
    "buildingMenu": 0,
    "floorMenu": 0,
    "unitMenu": 0,
    "unitItemMenu": 0,
    "tradeMenu": 0,
    "questionMenu": 0,
    "questionGroupMenu": 0,
    "questionHeadingMenu": 0,
    "subgroupMenu": 0,
    "userMenu": 0,
    "roleMenu": 0,
    "userAllocationMenu": 0,
    "severityMenu": 0,
    "manageUserAccessMenu": 1,
    "checklistGenerationMenu": 0,
    "qrr": 1,
    "qur": 1,
    "nc": 1,
    "ncr": 0,
    "qualityRecommendation": 1,
    "userId": 217,
    "tradeGroup": 0,
    "assignContractor": 0,
    "schemeMomMenu": 1,
    "regionalManagerMenu": 0,
    "contractorMenu": 1,
    "supervisorMenu": 0,
    "foremanMenu": 0,
    "clientStaffMenu": 1,
    "mockupMenu": 0,
    "qualityIpMenu": 1,
    "trainingMenu": 1,
    "kickoffMenu": 1,
    "methodStatementMenu": 1,
    "deletedNcMenu": 0,
    "inductionMenu": 0,
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
    "queView": 0,
    "gdremark": 1,
    "addExt": 0,
    "misLink": 1,
    "misLinkNew": 0,
    "userLog": 0,
    "ta": 1,
    "ma": 1,
    "pat": 1,
    "pam": 1,
    "tam": 1,
    "qrr1": 0,
    "rgct": 0,
    "ca": 0,
    "cam": 0,
    "momlog": 0,
    "cccia": 0,
    "qi": 0,
    "qo": 0,
    "ncco1": 0,
    "iu": 0,
    "sar": 0,
    "cis": 0,
    "hi": 0,
    "clientMis": 0,
    "clientNcr": 0,
    "clientDr": 0,
    "qos": 0,
    "auditReport": 0,
    "aSnapAudit": 0,
    "aQualityIndex": 0,
    "aHomeInspect": 0,
    "aHomeInspect1": 0,
    "aDownloadReport": 0,
    "aInspectReport": 0,
    "ncClosureMenu1": "",
    "webCard": "",
    "mirLink": 0,
    "clientDash": 0,
    "ncBeanCreater": 0,
    "ncBeanReviewer": 0,
    "ncBeanApprover": 0,
    "wash": 0,
    "qipr": 0,
    "ncBeanCreaterNew": 0,
    "ncBeanReviewerNew": 0,
    "ncBeanApproverNew": 0,
    "aorReport": 0,
    "aorClientReport": 0,
    "aHomeInspect2": 0
  }

  constructor(private httpClient: HttpClient) { }

  authenticateUser(userName, password) {
    if (userName === 'pramod' && password === 'pramod') {
      console.log(userName + password)
      return true;

    } else {
      return false;
    }
  }

  authenticate(username, password) {
    return this.httpClient.post<any>(this.REST_API_SERVER + '/api/auth/signin', { username, password }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', userData.username);
          sessionStorage.setItem('id', userData.id);
          sessionStorage.setItem('email', userData.email);
          let tokenStr = 'Bearer ' + userData.accessToken;
          sessionStorage.setItem('token', tokenStr);

          localStorage.setItem('username', userData.username);
          localStorage.setItem('id', userData.id);
          localStorage.setItem('email', userData.email);
          localStorage.setItem('token', tokenStr);
          // localStorage.setItem('userMenu', JSON.stringify(this.user1));
          return userData;
        }
      )

    );
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }


}