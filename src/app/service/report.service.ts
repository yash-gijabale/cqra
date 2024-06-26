import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from 'src/config/Global';
import { QualityProcedureView } from '../Reports/quality-procedure-ammendment/quality-procedure-ammendment.component';
import { SchemeMomReportView } from '../Reports/minutes-of-meeting-report/minutes-of-meeting-report.component';
import { MomReportPointView } from '../Reports/scheme-mom-reports/scheme-mom-reports.component';
import { QualityObservationReportView } from '../Reports/quality-observation/quality-observation.component';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(
        private httpClient: HttpClient,
        private global: Global
    ) { }
    private REST_API_SERVER = this.global.SERVER;


    //QAULITY PROCEDURE AMENDMEND
    getAllQualityProcedureAmmentment() {
        return this.httpClient.get<QualityProcedureView>(`${this.REST_API_SERVER}/qualityProcedureAmendmet/getall`)
    }



    //SCHEME MOM
    createSchemeMomReport(data) {
        return this.httpClient.post(`${this.REST_API_SERVER}/SchemeMom/savemaster`, data)
    }

    getAllSchemeMomReport() {
        return this.httpClient.get<SchemeMomReportView>(`${this.REST_API_SERVER}/SchemeMom/getmomall`)
    }

    getMomReportById(id) {
        return this.httpClient.get<MomReportPointView>(`${this.REST_API_SERVER}/SchemeMom/getmomreportbyid/${id}`)
    }

    updateSchemeMom(id, data) {
        return this.httpClient.put(`${this.REST_API_SERVER}/SchemeMom/updateschemmom/${id}`, data)
    }

    getMomPointsByMomId(id) {
        return this.httpClient.get<MomReportPointView>(`${this.REST_API_SERVER}/SchemeMom/getmomreport/${id}`)
    }

    addMomReportPoints(data) {
        return this.httpClient.post(`${this.REST_API_SERVER}/SchemeMom/savemomreport`, data)
    }

    updateMomReportPoint(id, data) {
        return this.httpClient.put(`${this.REST_API_SERVER}/SchemeMom/updateschememomreport/${id}`, data)
    }

    getMomReportPoint(id) {
        return this.httpClient.get<any>(`${this.REST_API_SERVER}/SchemeMom/getmomreport/${id}`)
    }


    //QUALITY OBSERVATION REPORT
    createQualityObservationReport(data) {
        return this.httpClient.post(`${this.REST_API_SERVER}/QualityObservation/save`,data)
    }
    updateQualityObsevationRepor(id, data){
        return this.httpClient.put(`${this.REST_API_SERVER}/QualityObservation/update/${id}`, data)
    }
    getAllQaulityObservationReports(){
        return this.httpClient.get<QualityObservationReportView>(`${this.REST_API_SERVER}/QualityObservation/getallQualityObservation`)
    }
    getQaulityObservationByClientId(clientId){
        return this.httpClient.get<QualityObservationReportView>(`${this.REST_API_SERVER}/QualityObservation/getallbyclientid/${clientId}`)
    }

        // --> QUALITY OBSERVATION REPORT ADDITIONAL OBSERVATION
    addObservationToQualityReport(data){
        return this.httpClient.post(`${this.REST_API_SERVER}/QualityObservationReport/save`, data)
    }

}