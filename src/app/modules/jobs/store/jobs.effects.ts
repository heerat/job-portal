import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, mergeMap } from 'rxjs/operators'
import { JobsService } from '../services/jobs.service'
import { setJobs } from './jobs.actions'

@Injectable()
export class JobsEffects {
  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Jobs Page] Load Jobs'),
      mergeMap(() =>
        this.jobsService.getJobs().pipe(map(jobs => setJobs({ jobs })))
      )
    )
  )

  constructor(private actions$: Actions, private jobsService: JobsService) {}
}
