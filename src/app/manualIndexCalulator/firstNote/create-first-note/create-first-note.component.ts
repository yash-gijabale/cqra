import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ClientServiceService } from "src/app/service/client-service.service";
import { first } from "rxjs/operators";

export class FirstNoteData {
  constructor(public sanpAuditId: number, public firstNoteText: string) {}
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
  isLoad: boolean;
  loader: string;
  buttonLoad: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cleintService: ClientServiceService
  ) {}

  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params["id"];
    this.firstNoteId = this.route.snapshot.params["id2"];
    if (this.firstNoteId != -1) {
      this.isLoad = true;
      this.loader = "Retriving Data............";
      this.cleintService
        .retrieveFirstNote(this.firstNoteId)
        .pipe(first())
        .subscribe((x) => {
          this.firstNoteForm.patchValue(x);
          this.isLoad = false;
          this.loader = "";
        });
    }

    this.firstNoteForm = this.formBuilder.group({
      sanpAuditId: ["", Validators.required],
      firstNoteText: ["", Validators.required],
    });
  }

  get f() {
    return this.firstNoteForm.controls;
  }

  onSubmit() {
    let formData = {
      sanpAuditId: this.snapAuditId,
      firstNoteText: this.firstNoteForm.value.firstNoteText,
    };
    this.buttonLoad = true;
    console.log(formData);
    if (this.firstNoteId != -1) {
      this.cleintService
        .updateFirstNote(formData, this.firstNoteId)
        .subscribe((data) => {
          this.buttonLoad = false;
          console.log("updated");
        });
    }
  }
}
