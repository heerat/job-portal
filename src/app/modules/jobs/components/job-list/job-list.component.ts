import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { Subject, takeUntil } from 'rxjs'
import { Job } from 'src/app/modules/jobs/model/jobs.model'
import { JobsService } from '../../services/jobs.service'
import { AppState } from '../../store/jobs.state'
import { JobModalComponent } from '../job-modal/job-modal.component'

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: []
})
export class JobListComponent implements OnInit, OnDestroy {
  jobs!: Job[]
  private ngUnsubscribe = new Subject()

  constructor(
    private jobsService: JobsService,
    private _modalService: NgbModal,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.getJobs()
    this.store
      .select('jobs')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(({ jobs }) => (this.jobs = jobs))
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(null)
    this.ngUnsubscribe.complete()
  }

  getJobs() {
    this.store.dispatch({ type: '[Jobs Page] Load Jobs' })
  }

  async open(job: Job) {
    const modal = this._modalService.open(JobModalComponent)
    try {
      modal.componentInstance.job = job
      await modal.result
      this.jobsService.deleteJob(job.id).subscribe(() => this.getJobs())
    } catch (error) {
      modal.close()
    }
  }
}
