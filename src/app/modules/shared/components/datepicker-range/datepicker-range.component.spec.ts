import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import {
  NgbDate,
  NgbDatepickerModule,
  NgbModule
} from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { DatepickerRangeComponent } from './datepicker-range.component'

describe('DatepickerRangeComponent', () => {
  let component: DatepickerRangeComponent
  let fixture: ComponentFixture<DatepickerRangeComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, FormsModule],
      declarations: [DatepickerRangeComponent],
      providers: [NgbDatepickerModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerRangeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have null date on initialization', () => {
    expect(component.date).toBeUndefined()
  })

  it('should update the date range when the input changes', () => {
    fixture.detectChanges()
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const date = today.getDate()
    const to = new Date(today.setDate(today.getDate() + 10))
    const toYear = to.getFullYear()
    const toMonth = to.getMonth()
    const toDate = to.getDate()
    expect(component.fromDate).toEqual(new NgbDate(year, month + 1, date))
    expect(component.toDate).toEqual(new NgbDate(toYear, toMonth + 1, toDate))
  })

  it('should be invalid when date range is not selected', () => {
    const control: any = { value: { fromDate: null, toDate: null } }
    const errors = component.validate(control)
    expect(errors).toEqual({ required: true })
  })

  it('should be valid when date range is selected', () => {
    const control: any = {
      value: { fromDate: '2022-02-18', toDate: '2022-02-19' }
    }
    const errors = component.validate(control)
    expect(errors).toBeNull()
  })
})
