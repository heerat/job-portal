import { TestBed } from '@angular/core/testing'
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { JobsService } from './jobs.service'
import { Job } from '../model/jobs.model'
import { environment } from 'src/environment/environment'

describe('JobsService', () => {
  const baseUrl = environment.baseUrl
  let service: JobsService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobsService]
    })

    service = TestBed.inject(JobsService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should get list of jobs', () => {
    const mockJobs = [
      {
        id: 'b76d1bc9-bc38-47aa-91a3-0d8ce79a891a',
        title: 'Software Developer',
        number: '411-AKJ',
        numberOfOpenings: 1,
        notes: 'Frontend Developer(Angular)',
        isExperienceRequired: true,
        startDate: '2022-12-11',
        closeDate: '14-01-2023'
      }
    ]

    service.getJobs().subscribe(jobs => {
      expect(jobs).toEqual(<Job[]>mockJobs)
    })

    const request = httpMock.expectOne(`${baseUrl}/jobs`)
    expect(request.request.method).toBe('GET')
    request.flush(mockJobs)
  })

  it('should get a job by id', () => {
    const mockJob = {
      id: 'b76d1bc9-bc38-47aa-91a3-0d8ce79a891a',
      title: 'Software Developer',
      number: '411-AKJ',
      numberOfOpenings: 1,
      notes: 'Frontend Developer(Angular)',
      isExperienceRequired: true,
      startDate: '2022-12-11',
      closeDate: '14-01-2023'
    }
    const jobId = '1'

    service.getJobById(jobId).subscribe(job => {
      expect(job).toEqual(mockJob)
    })

    const request = httpMock.expectOne(`${baseUrl}/jobs/${jobId}`)
    expect(request.request.method).toBe('GET')
    request.flush(mockJob)
  })

  it('should create a job', () => {
    const mockJob = {
      id: 'b76d1bc9-bc38-47aa-91a3-0d8ce79a891a',
      title: 'Software Developer',
      number: '411-AKJ',
      numberOfOpenings: 1,
      notes: 'Frontend Developer(Angular)',
      isExperienceRequired: true,
      startDate: '2022-12-11',
      closeDate: '14-01-2023'
    }

    service.createJob(mockJob).subscribe(job => {
      expect(job).toEqual(mockJob)
    })

    const request = httpMock.expectOne(`${baseUrl}/jobs`)
    expect(request.request.method).toBe('POST')
    request.flush(mockJob)
  })

  it('should update a job', () => {
    const mockJob = {
      id: 'b76d1bc9-bc38-47aa-91a3-0d8ce79a891a',
      title: 'Software Developer',
      number: '411-AKJ',
      numberOfOpenings: 1,
      notes: 'Frontend Developer(Angular)',
      isExperienceRequired: true,
      startDate: '2022-12-11',
      closeDate: '14-01-2023'
    }

    service.updateJob(mockJob).subscribe(job => {
      expect(job).toEqual(mockJob)
    })

    const request = httpMock.expectOne(`${baseUrl}/jobs/${mockJob.id}`)
    expect(request.request.method).toBe('PUT')
    request.flush(mockJob)
  })

  it('should delete a job', () => {
    const mockJob = {
      id: 'b76d1bc9-bc38-47aa-91a3-0d8ce79a891a',
      title: 'Software Developer',
      number: '411-AKJ',
      numberOfOpenings: 1,
      notes: 'Frontend Developer(Angular)',
      isExperienceRequired: true,
      startDate: '2022-12-11',
      closeDate: '14-01-2023'
    }

    const jobId = '1'

    service.deleteJob(jobId).subscribe(job => {
      expect(job).toEqual(mockJob)
    })

    const request = httpMock.expectOne(`${baseUrl}/jobs/${jobId}`)
    expect(request.request.method).toBe('DELETE')
    request.flush(mockJob)
  })
})
