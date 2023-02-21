import { TestBed, ComponentFixture } from '@angular/core/testing'
import { Component, DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { BackButtonDirective } from './back-button.directive'

@Component({
  template: '<button appBackButton>Go back</button>'
})
class TestComponent {}

describe('BackButtonDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let button: DebugElement
  let window: Window

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, BackButtonDirective],
      providers: [
        { provide: Window, useValue: { history: { back: () => {} } } }
      ]
    })

    fixture = TestBed.createComponent(TestComponent)
    button = fixture.debugElement.query(By.css('button'))
    window = TestBed.inject(Window)
  })

  it('should call history.back() when the button is clicked', () => {
    spyOn(window.history, 'back')
    button.triggerEventHandler('click', null)
    expect(window.history.back).toHaveBeenCalled()
  })
})
