import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Job } from '../../model/jobs.model'
import { JobModalComponent } from './job-modal.component'

describe('JobModalComponent', () => {
  let component: JobModalComponent
  let fixture: ComponentFixture<JobModalComponent>
  let activeModalSpy: jasmine.SpyObj<NgbActiveModal>

  beforeEach(() => {
    const activeModalSpyObj = jasmine.createSpyObj('NgbActiveModal', [
      'close',
      'dismiss'
    ])

    TestBed.configureTestingModule({
      declarations: [JobModalComponent],
      providers: [{ provide: NgbActiveModal, useValue: activeModalSpyObj }]
    }).compileComponents()

    fixture = TestBed.createComponent(JobModalComponent)
    component = fixture.componentInstance

    activeModalSpy = TestBed.inject(
      NgbActiveModal
    ) as jasmine.SpyObj<NgbActiveModal>
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display job title in the modal body', () => {
    const job: Job = {
      id: 'b76d1bc9-bc38-47aa-91a3-0d8ce79a891a',
      title: 'Software Developer',
      number: '411-AKJ',
      numberOfOpenings: 1,
      notes: 'Frontend Developer(Angular)',
      isExperienceRequired: true,
      startDate: '2022-12-11',
      closeDate: '14-01-2023'
    }
    component.job = job
    fixture.detectChanges()

    const jobTitleElement = fixture.nativeElement.querySelector(
      '.modal-body span.text-primary'
    )
    expect(jobTitleElement.textContent).toContain(job.title)
  })

  it('should call modal.dismiss when clicking cancel', () => {
    const cancelButton = fixture.nativeElement.querySelector(
      '.modal-footer button.btn-outline-secondary'
    )
    cancelButton.click()
    expect(activeModalSpy.dismiss).toHaveBeenCalled()
  })

  it('should call modal.close when clicking ok', () => {
    const okButton = fixture.nativeElement.querySelector(
      '.modal-footer button.btn-danger'
    )
    okButton.click()
    expect(activeModalSpy.close).toHaveBeenCalled()
  })
})
