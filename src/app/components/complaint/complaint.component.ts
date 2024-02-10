import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Complaint} from "../../common/complaint";
import {CommonModule, DatePipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ComplaintService} from "../../services/complaint.service";
import Swal from 'sweetalert2';
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-complaint',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    RouterLink,
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.css',
})
export class ComplaintComponent implements OnInit{
  searchText: string = '';
  complaints: Complaint [] = [];

  constructor(private complaintService: ComplaintService, private router: Router) {
  }

  ngOnInit() {
    this.complaintService.getComplaints().subscribe(
      (res) => {
        this.complaints = res;
      },
      (err) => {
        this.complaintService.getCurrentUserComplaints(localStorage.getItem("username")).subscribe(
          (res) => {
            this.complaints = res;
          }
        );
      }
    );
  }

  showComplaint(id: number) {
    this.complaintService.getComplaintById(id).subscribe(
      (res) => {
        Swal.fire({
          title: "Complaint content",
          text: res.complaintContent,
          icon: "success"
        });
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
