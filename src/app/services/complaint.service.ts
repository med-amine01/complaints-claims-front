import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Complaint} from "../common/complaint";

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private BASE_COMPLAINT_URL = 'http://localhost:3030/api/v1/complaints';

  constructor(private httpClient: HttpClient) {
  }

  public saveComplaint(content: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const request = {
      content : content
    }
    return this.httpClient.post<any>(this.BASE_COMPLAINT_URL, request, {headers: headers});
  }
  public getComplaintById(id: number) : Observable<Complaint> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient
      .get<Complaint>(this.BASE_COMPLAINT_URL +"/"+id, {headers: headers}).pipe(
        map(
          (response: any) => {
            const comp : Complaint = new Complaint();
            comp.id = response.results.id;
            comp.complaintContent = response.results.complaintContent;
            comp.username = response.results.username;
            comp.userEmail = response.results.userEmail;

            return comp;
          }
        )
      );
  }
  public getComplaints(): Observable<Complaint[]> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<any>(this.BASE_COMPLAINT_URL, {headers: headers})
      .pipe(
        map((response: any) => {
          // Map each item in results array to Complaint object
          return response.results.map((item: any) => {
            const complaint = new Complaint();
            complaint.username = item.username;
            complaint.userEmail = item.userEmail;
            complaint.complaintContent = item.complaintContent;
            complaint.id = item.id;
            complaint.createdAt = item.createdAt;
            complaint.updatedAt = item.updatedAt;
            return complaint;
          });
        })
      );
  }

  public getCurrentUserComplaints(username: any) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<any>(this.BASE_COMPLAINT_URL+"/users/"+username, {headers: headers})
      .pipe(
        map((response: any) => {
          // Map each item in results array to Complaint object
          return response.results.map((item: any) => {
            const complaint = new Complaint();
            complaint.username = item.username;
            complaint.userEmail = item.userEmail;
            complaint.complaintContent = item.complaintContent;
            complaint.id = item.id;
            complaint.createdAt = item.createdAt;
            complaint.updatedAt = item.updatedAt;
            return complaint;
          });
        })
      );
  }
}
