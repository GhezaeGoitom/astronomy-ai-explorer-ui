import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupernovaList } from './supernova-list';

describe('SupernovaList', () => {
  let component: SupernovaList;
  let fixture: ComponentFixture<SupernovaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupernovaList],
    }).compileComponents();

    fixture = TestBed.createComponent(SupernovaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
