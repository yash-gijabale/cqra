import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-checklist-allocation',
  templateUrl: './project-checklist-allocation.component.html',
  styleUrls: ['./project-checklist-allocation.component.css']
})
export class ProjectChecklistAllocationComponent implements OnInit {

  configureForm : FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configureForm = this.formBuilder.group({
      tardeId: ['', Validators.required],
      subgroupId: ['', Validators.required],
      checklistId: ['', Validators.required],
    })
  }

  get f() { return this.configureForm.controls; }

}
