import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ClientServiceService } from "src/app/service/client-service.service";
import { first } from "rxjs/operators";

export class FirstNoteData {
  constructor(public sanpAuditId: number, public firstNoteText: string) { }
}

@Component({
  selector: "app-create-first-note",
  templateUrl: "./create-first-note.component.html",
  styleUrls: ["./create-first-note.component.css"],
})
export class CreateFirstNoteComponent implements OnInit {
  firstNoteForm: FormGroup;
  snapAuditId: number;
  firstNoteId: number;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cleintService: ClientServiceService
  ) { }

  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params["id"];
    this.firstNoteId = this.route.snapshot.params["id2"];
    if (this.firstNoteId != -1) {
      this.cleintService
        .retrieveFirstNote(this.firstNoteId)
        .pipe(first())
        .subscribe((x) => {
          this.firstNoteForm.patchValue(x);
        });
    }

    this.firstNoteForm = this.formBuilder.group({
      firstNoteText: ["", Validators.required],
    });
  }

  get f() {
    return this.firstNoteForm.controls;
  }

  onSubmit() {
    
    this.submitted = true
    if (this.firstNoteForm.invalid) {
      return
    }
    let formData = {
      sanpAuditId: this.snapAuditId,
      firstNoteText: this.firstNoteForm.value.firstNoteText,
    };
    // this.buttonLoad = true;
    console.log(formData);
    if (this.firstNoteId != -1) {
      this.cleintService
        .updateFirstNote(formData, this.firstNoteId)
        .subscribe((data) => {
          console.log("updated");
        });
    }else{
      console.log('cki')
      this.cleintService.createFirstNote(formData)
      .subscribe(
        data => console.log('ctreated--->', data),
        err => console.log(err)
      )
    }
  }
}
