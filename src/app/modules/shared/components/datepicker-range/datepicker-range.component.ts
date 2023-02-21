import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms'
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap'
import { convertNgbDateRangeToString } from 'src/app/utils/string'
import { DateRange } from '../../model/datepicker-range.model'

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DatepickerRangeComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DatepickerRangeComponent
    }
  ]
})
export class DatepickerRangeComponent
  implements ControlValueAccessor, Validator, OnChanges
{
  @Input()
  date!: DateRange | null
  selectedRange!: DateRange
  hoveredDate: NgbDate | null = null

  fromDate: NgbDate | null
  toDate: NgbDate | null

  onChange = (selectedRange: DateRange) => {}

  onTouched = () => {}

  touched = false

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const date = today.getDate()

    const toDate = new Date(year, month, date + 10)
    this.fromDate = new NgbDate(year, month + 1, date)
    this.toDate = new NgbDate(
      toDate.getFullYear(),
      toDate.getMonth() + 1,
      toDate.getDate()
    )
    this.onChange(convertNgbDateRangeToString(this.fromDate, this.toDate))
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentFromDate = changes['date']?.currentValue?.fromDate
    const previousFromDate = changes['date']?.previousValue?.fromDate
    const currentToDate = changes['date']?.currentValue?.toDate
    const previousToDate = changes['date']?.previousValue?.toDate
    if (currentFromDate && currentFromDate !== previousFromDate) {
      const [year, month, date] = currentFromDate.split('-')
      this.fromDate = new NgbDate(+year, +month, +date)
    }
    if (currentToDate && currentToDate !== previousToDate) {
      const [year, month, date] = currentToDate.split('-')
      this.toDate = new NgbDate(+year, +month, +date)
    }
    if (
      this.fromDate &&
      this.toDate &&
      currentFromDate !== previousFromDate &&
      currentToDate !== previousToDate
    ) {
      this.onChange(convertNgbDateRangeToString(this.fromDate, this.toDate))
    }
  }

  writeValue(selectedRange: DateRange) {
    this.selectedRange = selectedRange
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched()
      this.touched = true
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const selectedRange = control.value
    if (!selectedRange.fromDate || !selectedRange.toDate) {
      return {
        required: true
      }
    }
    return null
  }

  onDateSelection(date: NgbDate) {
    this.markAsTouched()
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date

      this.onChange(convertNgbDateRangeToString(this.fromDate, this.toDate))
    } else {
      this.toDate = null
      this.fromDate = date
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    )
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate)
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    )
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input)
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue
  }
}
