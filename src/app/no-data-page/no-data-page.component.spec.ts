import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataPageComponent } from './no-data-page.component';

describe('NoDataPageComponent', () => {
  let component: NoDataPageComponent;
  let fixture: ComponentFixture<NoDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDataPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
