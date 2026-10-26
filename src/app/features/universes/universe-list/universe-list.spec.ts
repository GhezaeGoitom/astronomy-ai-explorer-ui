import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniverseList } from './universe-list';

describe('UniverseList', () => {
  let component: UniverseList;
  let fixture: ComponentFixture<UniverseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniverseList],
    }).compileComponents();

    fixture = TestBed.createComponent(UniverseList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
