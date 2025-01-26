import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { of } from 'rxjs'; // Import for mocking observables

describe('AppComponent', () => {
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // Include AppComponent as a standalone component
        HttpClientTestingModule, // Import HttpClientTestingModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLoggedIn$: of(true), // Mock logged-in state
            username$: of('Test User'), // Mock username
            logout: jasmine.createSpy('logout'), // Mock logout method
          },
        },
      ],
    }).compileComponents();

    httpController = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Hello' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toContain('Hello,');
  });

  it('should render the static title when logged in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Trigger change detection

    const compiled = fixture.nativeElement as HTMLElement;

    // Debugging: log the rendered HTML to confirm rendering
    console.log(compiled.innerHTML);

    // Assert the static text
    const rightSideText = compiled.querySelector('.right-side h2')?.textContent?.trim();
    expect(rightSideText).toBe('Welcome to Products App!');
  });

  afterEach(() => {
    httpController.verify(); // Verify that all expected HTTP requests were made
  });
});
