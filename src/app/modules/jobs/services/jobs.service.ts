import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Job } from 'src/app/modules/jobs/model/jobs.model'

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private baseUrl = 'http://127.0.0.1:3000'

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/jobs`)
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/jobs/${id}`)
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.baseUrl}/jobs`, job)
  }

  updateJob(job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.baseUrl}/jobs/${job.id}`, job)
  }

  deleteJob(jobId: string): Observable<Job> {
    return this.http.delete<Job>(`${this.baseUrl}/jobs/${jobId}`)
  }
}
