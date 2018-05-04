import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceCodeRoutingModule } from './finance-code-routing.module';
import { FinanceCenterMasterComponent } from './finance-center-master/finance-center-master.component';
import { UnitOfPayRatesComponent } from './unit-of-pay-rates/unit-of-pay-rates.component';
import { TaxCodesComponent } from './tax-codes/tax-codes.component';
import { TaxCountryProvisionsComponent } from './tax-country-provisions/tax-country-provisions.component';
import { TaxTypesComponent } from './tax-types/tax-types.component';
import { TaxCodeTypesComponent } from './tax-code-types/tax-code-types.component';
import { ProfitCenterComponent } from './profit-center/profit-center.component';
import { FinanceCodeComponent } from './finance-code.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    FinanceCodeRoutingModule, SharedModule
  ],
  declarations: [FinanceCenterMasterComponent, UnitOfPayRatesComponent, TaxCodesComponent, TaxCountryProvisionsComponent, TaxTypesComponent, TaxCodeTypesComponent, ProfitCenterComponent, FinanceCodeComponent]
})
export class FinanceCodeModule { }
