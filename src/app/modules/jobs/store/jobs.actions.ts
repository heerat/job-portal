import { createAction, props } from '@ngrx/store'
import { Job } from '../model/jobs.model'

export const setJobs = createAction(
  '[Jobs Page] Set Jobs',
  props<{ jobs: Job[] }>()
)
