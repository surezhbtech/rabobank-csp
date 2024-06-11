import { ReportComponent } from './report.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { createHttpFactory, Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { StatementProcessorService } from '../services/statement-processor.service';
import { PROCESSED_XML_DATA } from '../../../mocks/statement';

describe('ReportComponent', () => {
  let spectator: Spectator<ReportComponent>;
  createHttpFactory(StatementProcessorService);
  const createComponent = createComponentFactory({
    component: ReportComponent,
    providers: [provideHttpClient(withFetch()), provideHttpClientTesting()],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should create table and populate data', () => {
    spectator.component.dataSource = PROCESSED_XML_DATA;
    spectator.detectChanges();
    const tableRows = spectator.queryAll('tr');
    const headerRow = tableRows[0];
    expect(headerRow.innerHTML).toContainText('Reference No.Account NumberStart BalanceMutationEnd BalanceDescriptionError Description');
    expect(tableRows[1]).toContainText('164702NL46ABNA062580541781.895.9987.88Flowers for Rik Dekker');
  });
});
