import { NgbDate } from '@ng-bootstrap/ng-bootstrap'

const padStartNumber = <Type>(
  value: Type,
  length: number = 2,
  padChar: string = '0'
): string => String(value).padStart(length, padChar)

const convertNgbDateRangeToString = (from: NgbDate, to: NgbDate) => {
  const { year: fromYear, month: fromMonth, day: fromDay } = from
  const { year: toYear, month: toMonth, day: toDay } = to
  const fromDate = `${fromYear}-${padStartNumber(fromMonth)}-${padStartNumber(
    fromDay
  )}`
  const toDate = `${toDay}-${padStartNumber(toMonth)}-${padStartNumber(toYear)}`

  return { fromDate, toDate }
}

export { convertNgbDateRangeToString }
