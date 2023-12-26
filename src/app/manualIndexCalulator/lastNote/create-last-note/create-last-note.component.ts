import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ClientServiceService } from "src/app/service/client-service.service";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-create-last-note',
  templateUrl: './create-last-note.component.html',
  styleUrls: ['./create-last-note.component.css']
})
export class CreateLastNoteComponent implements OnInit {
  lastNoteFrom: FormGroup;
  snapAuditId: number;
  lastNoteId: number;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cleintService: ClientServiceService
  ) { }
  ngOnInit() {
    this.snapAuditId = this.route.snapshot.params["id"];
    this.lastNoteId = this.route.snapshot.params["id2"];

    if (this.lastNoteId != -1) {
      this.cleintService.retriveLastNote(this.lastNoteId)
        .pipe(first())
        .subscribe(data => {
          this.lastNoteFrom.patchValue(data)
          console.log(data)
        },
          err => console.log(err))
    }

    this.lastNoteFrom = this.formBuilder.group({
      lastMoteText: ['', Validators.required]
    })
  }

  get f() {
    return this.lastNoteFrom.controls;
  }

  onSubmit() {
    this.submitted = true
    if (this.lastNoteFrom.invalid) {
      return
    }
    let formData = {
      snapAuditId: this.snapAuditId,
      lastMoteText: this.lastNoteFrom.value.lastMoteText,
    };
    console.log(formData)
    if (this.lastNoteId != -1) {
      this.cleintService.updateLastNote(formData, this.lastNoteId)
      .subscribe(data => console.log('updated', data))

    } else {
      this.cleintService.createLastNote(formData)
        .subscribe(data => {
          console.log('last note -->', data)
        })
    }
  }
}
