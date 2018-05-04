import { CountryStateProvienceComponent } from './country-state-provience/country-state-provience.component';
import { WarehouseStockyardlistComponent } from './warehouse-stockyardlist/warehouse-stockyardlist.component';
import { ServiceClassificationComponent } from './service-classification/service-classification.component';
import { ProcurementCategoryComponent } from './procurement-category/procurement-category.component';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { EmpWageComponent } from './emp-wage/emp-wage.component';
import { MeasuringUnitsComponent } from './measuring-units/measuring-units.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierCreateComponent } from './supplier-create/supplier-create.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { MeasuringCreateComponent } from './measuring-create/measuring-create.component';
import { MeasuringEditComponent } from './measuring-edit/measuring-edit.component';
import { WeatherClassificationComponent } from './weather-classification/weather-classification.component';
import { WeatherCreateComponent } from './weather-classification/weather-create/weather-create.component';
import { EmployeeClassificationComponent } from './employee-classification/employee-classification.component';
import { PlantClassificationComponent } from './plant-classification/plant-classification.component';
import { CostcodeComponent } from './costcode/costcode.component';
import { MaterialclassificationComponent } from './materialclassification/materialclassification.component';
import { EmployeeCreateComponent } from './employee-classification/employee-create/employee-create.component';
import { AssetMaintenanceCategoryComponent } from './asset-maintenance-category/asset-maintenance-category.component';
import { AssetscategoryComponent } from './assetscategory/assetscategory.component';
import { PlantservicehistoryComponent } from './plantservicehistory/plantservicehistory.component';
import { SharedModule } from './../../shared/shared.module';

const routes: Routes = [
  { path: '', component: SupplierCreateComponent },
  { path: 'supplier-list', component: SupplierListComponent },
  { path: 'supplier-create', component: SupplierCreateComponent },
  { path: 'measuring-units', component: MeasuringUnitsComponent },
  { path: 'measuring-create', component: MeasuringCreateComponent },
  { path: 'measuring-edit/?:id', component: MeasuringEditComponent },
  { path: 'weather-classification', component: WeatherClassificationComponent },
  { path: 'weather-create', component: WeatherCreateComponent },
  { path: 'employee-classification', component: EmployeeClassificationComponent },
  { path: 'employee-create', component: EmployeeCreateComponent },
  { path: 'plant-classification', component: PlantClassificationComponent },
  { path: 'costcode-classification', component: CostcodeComponent },
  { path: 'material-classification', component: MaterialclassificationComponent },
  { path: 'emp-wage', component: EmpWageComponent },
  { path: 'leavetype', component: LeavetypeComponent },
  { path: 'procurement-category', component: ProcurementCategoryComponent },
  { path: 'service-classification', component: ServiceClassificationComponent },
  { path: 'supplier-list', component: SupplierListComponent },
  { path: 'WarehouseStockyardlist', component: WarehouseStockyardlistComponent },
  { path: 'country-state-provience', component: CountryStateProvienceComponent },
  { path: 'asset-maintain', component: AssetMaintenanceCategoryComponent },
  { path: 'assetscategory', component: AssetscategoryComponent },
  { path: 'plantservicehistory', component: PlantservicehistoryComponent },
  { path: 'finance', loadChildren: './finance-code/finance-code.module#FinanceCodeModule' },

];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class CentralLibraryRoutingModule { }
