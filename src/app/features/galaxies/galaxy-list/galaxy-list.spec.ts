import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalaxyList } from './galaxy-list';

describe('GalaxyList', () => {
  let component: GalaxyList;
  let fixture: ComponentFixture<GalaxyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalaxyList],
    }).compileComponents();

    fixture = TestBed.createComponent(GalaxyList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
