import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserView } from '../user-log/user-log.component';
import { Observable } from 'rxjs';
import { UseAllocationData } from '../create-user-allocation/create-user-allocation.component';
import { UserAllocationView } from '../user-allocation/user-allocation.component';
import { AssestView, AssetListView, EquipmentView } from '../add-equipment/add-equipment.component';
import { AssignedProjectData } from '../assign-project/assign-project.component';
import { RoleView } from '../add-role/add-role.component';
import { RegionView } from '../add-region/add-region.component';
import { Global } from 'src/config/Global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private REST_API_SERVER = "http://18.217.108.137:8080";
  // private REST_API_SERVER = "http://18.217.108.137:9090"; //working Ip
  // private REST_API_SERVER = "http://localhost:9090"; //local IP For Testing


  //private REST_API_SERVER = "http://ec2-3-142-240-133.us-east-2.compute.amazonaws.com:9090";
  constructor(
    private httpClient: HttpClient,
    private global: Global
    ) { }

  private REST_API_SERVER = this.global.SERVER; //local IP For Testing

  getAllUsers() {
    return this.httpClient.get<UserView[]>(this.REST_API_SERVER + '/user/getAllusers/');
  }

  createUser(data): Observable<UserService> {
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/user/adduserData`, data)
  }

  uploadUserSign(id, sign, profile){
    let config = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    };

    let formParams = new FormData();
    formParams.append('eimage', sign)
    formParams.append('profile', profile)
    console.log(formParams)
    return this.httpClient.put(`${this.REST_API_SERVER}/user/updatesign/${id}`, formParams, config)
  }

  retriveUser(id) {
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/UserData/${id}`)
  }

  updateUSer(data, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/UserData/${id}`, data)
  }

  deactivateUser(id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/UserData/${id}/${false}`, '')
  }

  //USER ALLOCATION API CALL
  getUserAllocation() {
    return this.httpClient.get<UserAllocationView>(`${this.REST_API_SERVER}/getalluserview`)
  }
  createUserAllocation(data): Observable<UserService> {
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/saveData`, data)
  }

  retriveAllocation(id) {
    return this.httpClient.get<UseAllocationData>(`${this.REST_API_SERVER}/userAllocation/${id}`)
  }
  updateUserAllocation(data) :Observable<UserService> {
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/updateData`, data)
  }


  //USER LIST FOR INSPECTION REPORT

  getApproverList() {
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/UserDatabyapprover`)
  }

  getReviewverList() {
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/UserDatabyrevever`)
  }

  getCreaterList() {
    return this.httpClient.get<UserView[]>(`${this.REST_API_SERVER}/UserDatabycreater`)
  }


  //ADD EQUIPMENT OR ASSIGN EQUIPMENT
  getAllAssetes() {
    return this.httpClient.get<AssestView>(`${this.REST_API_SERVER}/getAssets`)
  }
  getAllAssignEquipment() {
    return this.httpClient.get<Array<EquipmentView>>(`${this.REST_API_SERVER}/getEquipmentsjoin`)
  }

  addEquipment(data): Observable<UserService> {
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/addequipment`, data);
  }

  retriveEquipemnt(id) {
    return this.httpClient.get<EquipmentView>(`${this.REST_API_SERVER}/Equipment/${id}`)
  }

  updateEquipemt(data, id) {
    return this.httpClient.put(`${this.REST_API_SERVER}/Equipment/${id}`, data)
  }

  deleteAssignEqiopment(id, status, remark){
    return this.httpClient.put(`${this.REST_API_SERVER}/updatestatus/${id}/${status}`, remark)
  }


  assignNewUserToEquipment(equipmentId, userId, data){
    return this.httpClient.put(`${this.REST_API_SERVER}/Equipmentbyidanduserid/${equipmentId}/${userId}`, data)
  }

  newAsset(data):Observable<UserService>{
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/AssignEqu/saave`, data)
  }

  getAssetsList(){
    return this.httpClient.get<Array<AssetListView>>(`${this.REST_API_SERVER}/AssignEqu/getalljoin`)
  }

  updateAsset(id, data){
    return this.httpClient.put<any>(`${this.REST_API_SERVER}/AssignEqu/update/${id}`, data)
  }

  getAssetById(id){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/AssignEqu/getallbyid/${id}`)
  }
  deleteAsset(id){
    return this.httpClient.delete(`${this.REST_API_SERVER}/AssignEqu/deletebyid/${id}`)
  }

  getEquipmentByAssetType(typeId){
    return this.httpClient.get<Array<any>>(`${this.REST_API_SERVER}/AssignEqu/getallbyassetid/${typeId}`)
  }

  getMyEquipments(userId){
    return this.httpClient.get<Array<any>>(`${this.REST_API_SERVER}/getEquipmentsjoinbyid/${userId}`)
  }

  getEqDetails(eqId){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/getEquipmentsjoinbyequipmentid/${eqId}`)
  }

  sendPolicyMain(userId){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/sendemail/${userId}`)
  }

  acceptPolisy(data){
    return this.httpClient.put(`${this.REST_API_SERVER}/updatestatusandsignatyre`, data)
  }

  returnEquipment(data):Observable<UserService>{
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/addequipmenthistory`, data)
  }

  donloadToolkitPolicy(equipmentId, userId){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/report/downloadtookitpolicyreport/${userId}/${equipmentId}`)
  }


  //ASSIGN PROJECT TO USER API CALL
  getAssignedProjectByUserId(id){
    return this.httpClient.get<AssignedProjectData[]>(`${this.REST_API_SERVER}/getUserProjectbyuserids/${id}`)
  }

  assignProject(data) :Observable <UserService>{
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/adduserproject`, data)
  }

  removeUserProject(projectId, userId){
    return this.httpClient.delete(`${this.REST_API_SERVER}/userproject/${userId}/${projectId}`)
  }
  //ASSIGN PROJECT TO USER API CALL


  //ROLES API CALL
  addRoles(data) :Observable<UserService>{
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/addroles`, data)
  }
  
  getAllRoles(){
    return this.httpClient.get<RoleView>(`${this.REST_API_SERVER}/getRoles`)
  }

  getRole(id){
    return this.httpClient.get<RoleView>(`${this.REST_API_SERVER}/roles/${id}`)
  }

  updateRole(data: RoleView, id){
    return this.httpClient.put(`${this.REST_API_SERVER}/roles/${id}`, data)
  }
  
  deactiveRole(id){
    return this.httpClient.delete(`${this.REST_API_SERVER}/roles/${id}`)
  }
  //ROLES API CALL

  //REGIONS API CALL
  getAllRegions(){
    return this.httpClient.get<RegionView>(`${this.REST_API_SERVER}/getRegions`)
  }

  AddRegion(data):Observable<UserService>{
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/addRegiont`, data)
  }

  getRegion(id){
    return this.httpClient.get<RegionView>(`${this.REST_API_SERVER}/Region/${id}`)
  }

  updateRegion(data, id){
    return  this.httpClient.put(`${this.REST_API_SERVER}/Region/${id}`, data)
  }

  deactiveRegion(id){
    return this.httpClient.delete(`${this.REST_API_SERVER}/Region/${id}`)
  }



  //USER ACCESS MANAGEMENT
  
  setUserAccess(data):Observable<UserService>{
    return this.httpClient.post<UserService>(`${this.REST_API_SERVER}/addusermenu`, data)
  }

  getUserAccess(id){
    return this.httpClient.get<any>(`${this.REST_API_SERVER}/getuserMenubyid/${id}`)
  }

  getUserDataByRepresentative(id):Observable<Array<UserView>>{
    return this.httpClient.get<Array<UserView>>(`${this.REST_API_SERVER}/UserDatabyrepresentingtypeid/${id}`)
  }

}
