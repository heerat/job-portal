import { createReducer, on, Action } from '@ngrx/store'
import { Job } from '../model/jobs.model'
import { setJobs } from './jobs.actions'

export interface JobsState {
  jobs: Job[]
}

export interface AppState {
  jobs: JobsState
}

export const initialState: JobsState = {
  jobs: []
}

export const jobsReducer = createReducer(
  initialState,
  on(setJobs, (state, { jobs }) => ({ ...state, jobs }))
)

export function reducer(state: JobsState | undefined, action: Action) {
  return jobsReducer(state, action)
}
