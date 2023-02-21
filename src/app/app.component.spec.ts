import { TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { RouterOutlet } from '@angular/router'
import { AppComponent } from './app.component'
import { By } from '@angular/platform-browser'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should have router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const debugElement = fixture.debugElement.queryAll(
      By.directive(RouterOutlet)
    )
    expect(debugElement.length).toBe(1)
  })
})
