import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgClass} from "@angular/common";
import {ComplaintService} from "../../services/complaint.service";

@Component({
  selector: 'app-create-complaint',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './create-complaint.component.html',
  styleUrl: './create-complaint.component.css'
})
export class CreateComplaintComponent implements OnInit {

  authorFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private complaintService: ComplaintService) {

    this.authorFormGroup = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }

  inputNameValid(): boolean {
    return this.authorFormGroup?.invalid && (this.authorFormGroup?.dirty || this.authorFormGroup?.touched) ? true : false;
  }

  onSubmit() {
    if (this.authorFormGroup.invalid) {
      this.authorFormGroup.markAllAsTouched();
      return;
    }


    this.complaintService.saveComplaint(this.authorFormGroup?.value.name).subscribe(
      (res) => {
        this.authorFormGroup.reset();
        this.router.navigate(["complaints"]);
      },
      (err) => {
        console.log(err)
      }
    );
  }

}
