import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarList } from './star-list';

describe('StarList', () => {
  let component: StarList;
  let fixture: ComponentFixture<StarList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarList],
    }).compileComponents();

    fixture = TestBed.createComponent(StarList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
