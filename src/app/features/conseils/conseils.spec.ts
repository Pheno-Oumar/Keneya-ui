import { ConseilsComponent } from './conseils';

// Provide minimal declarations so TypeScript won't error if test runner types are not installed
declare function describe(desc: string, fn: () => void): void;
declare function beforeEach(fn: () => void | Promise<void>): void;
declare function it(desc: string, fn: () => void | Promise<void>): void;
declare function expect(actual: any): { toBeTruthy(): void };

describe('ConseilsComponent', () => {
  let component: ConseilsComponent;

  beforeEach(() => {
    // instantiate component directly to avoid TestBed dependency in this spec file
    component = new ConseilsComponent({} as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});