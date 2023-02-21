import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { Job } from '../../model/jobs.model'
import { JobsService } from '../../services/jobs.service'

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: []
})
export class JobDetailComponent implements OnInit, OnDestroy {
  jobDetails!: Job
  jobSubscription: Subscription | undefined
  constructor(
    private route: ActivatedRoute,
    private jobsService: JobsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.jobSubscription = this.jobsService.getJobById(id).subscribe(
        (job: Job) => {
          this.jobDetails = job
        },
        error => {
          console.error(error)
        }
      )
    }
  }

  ngOnDestroy() {
    if (this.jobSubscription) {
      this.jobSubscription.unsubscribe()
    }
  }
}
