import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceCenterMasterComponent } from './finance-center-master/finance-center-master.component';
import { ProfitCenterComponent } from './profit-center/profit-center.component';
import { TaxCodeTypesComponent } from './tax-code-types/tax-code-types.component';
import { TaxCodesComponent } from './tax-codes/tax-codes.component';
import { TaxCountryProvisionsComponent } from './tax-country-provisions/tax-country-provisions.component';
import { TaxTypesComponent } from './tax-types/tax-types.component';
import { UnitOfPayRatesComponent } from './unit-of-pay-rates/unit-of-pay-rates.component';


const routes: Routes = [
  { path: '', redirectTo: 'finance-center' },
  { path: 'finance-center', component: FinanceCenterMasterComponent },
  { path: 'profit-center', component: ProfitCenterComponent },
  { path: 'tax-code-types', component: TaxCodeTypesComponent },
  { path: 'tax-codes', component: TaxCodesComponent },
  { path: 'tax-country-provisions', component: TaxCountryProvisionsComponent },
  { path: 'tax-types', component: TaxTypesComponent },
  { path: 'unit-pay-rates', component: UnitOfPayRatesComponent }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceCodeRoutingModule { }
