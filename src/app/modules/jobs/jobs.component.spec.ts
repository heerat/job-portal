import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { JobsComponent } from './jobs.component'

describe('JobsComponent', () => {
  let component: JobsComponent
  let fixture: ComponentFixture<JobsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobsComponent],
      imports: [RouterTestingModule]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should have a router outlet', () => {
    const compiled = fixture.nativeElement
    const routerOutlet = compiled.querySelector('router-outlet')
    expect(routerOutlet).toBeTruthy()
  })
})
