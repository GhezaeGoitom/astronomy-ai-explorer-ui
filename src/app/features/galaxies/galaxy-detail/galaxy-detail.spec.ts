import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalaxyDetail } from './galaxy-detail';

describe('GalaxyDetail', () => {
  let component: GalaxyDetail;
  let fixture: ComponentFixture<GalaxyDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalaxyDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(GalaxyDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
