import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DatepickerRangeComponent } from './components/datepicker-range/datepicker-range.component'
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'
import { BackButtonDirective } from './directives/back-button.directive'

@NgModule({
  declarations: [DatepickerRangeComponent, BackButtonDirective],
  imports: [CommonModule, NgbDatepickerModule],
  exports: [DatepickerRangeComponent, BackButtonDirective]
})
export class SharedModule {}
