import { NgbDate } from '@ng-bootstrap/ng-bootstrap'
import { convertNgbDateRangeToString } from './string'

describe('convertNgbDateRangeToString', () => {
  it('should convert NgbDate range to string range', () => {
    const from = new NgbDate(2022, 2, 18)
    const to = new NgbDate(2022, 2, 19)
    const expected = { fromDate: '2022-02-18', toDate: '19-02-2022' }

    expect(convertNgbDateRangeToString(from, to)).toEqual(expected)
  })
})
