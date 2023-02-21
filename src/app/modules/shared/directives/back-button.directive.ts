import { Directive, HostListener } from '@angular/core'

@Directive({
  selector: '[appBackButton]'
})
export class BackButtonDirective {
  constructor(private window: Window) {}

  @HostListener('click')
  onClick() {
    this.window.history.back()
  }
}
