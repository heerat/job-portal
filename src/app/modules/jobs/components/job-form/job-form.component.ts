import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject, Subscription } from 'rxjs'
import { DateRange } from 'src/app/modules/shared/model/datepicker-range.model'
import { v4 as uuid } from 'uuid'
import { Job } from '../../model/jobs.model'
import { JobsService } from '../../services/jobs.service'

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: []
})
export class JobFormComponent implements OnInit, OnDestroy {
  createJobForm: FormGroup
  submitted = false
  isEdit = false
  dateRange = new BehaviorSubject<DateRange | null>(null)
  jobSubscription: Subscription | undefined

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private jobsService: JobsService
  ) {
    this.createJobForm = this.formBuilder.group({
      id: [],
      title: ['', [Validators.required]],
      number: ['', [Validators.required]],
      date: ['', [Validators.required]],
      numberOfOpenings: [0, [Validators.required]],
      notes: [''],
      isExperienceRequired: [false]
    })
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.isEdit = true
      this.jobSubscription = this.jobsService.getJobById(id).subscribe(
        (job: Job) => {
          for (let item in job) {
            this.createJobForm.controls[item as keyof Job]?.setValue(
              job[item as keyof Job]
            )
          }
          const { startDate: fromDate, closeDate: toDate } = job
          this.dateRange.next({
            fromDate,
            toDate
          })
          this.createJobForm.controls['date']?.setValue(this.dateRange)
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

  validateField(field: string) {
    return (
      this.submitted && this.createJobForm.controls[field].errors?.['required']
    )
  }

  onSubmit() {
    this.submitted = true
    if (this.createJobForm.valid) {
      const {
        date: { fromDate: startDate, toDate: closeDate },
        ...restFields
      } = this.createJobForm.value
      const job = { ...restFields, startDate, closeDate }
      if (this.isEdit) {
        this.jobsService.updateJob(job).subscribe(() => {
          this.router.navigate(['/jobs'])
        })
      } else {
        const id = uuid()
        this.jobsService.createJob({ id, ...job }).subscribe(() => {
          this.router.navigate(['/jobs'])
        })
      }
    }
  }
}
