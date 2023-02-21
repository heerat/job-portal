import { Component, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Job } from '../../model/jobs.model'

@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: []
})
export class JobModalComponent {
  @Input() job!: Job
  constructor(public modal: NgbActiveModal) {}
}
