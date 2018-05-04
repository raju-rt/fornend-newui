import { StatusPipe } from './../../shared/pipes/status.pipe';
import { CountryStateProvienceComponent } from './country-state-provience/country-state-provience.component';
import { WarehouseStockyardlistComponent } from './warehouse-stockyardlist/warehouse-stockyardlist.component';
import { ServiceClassificationComponent } from './service-classification/service-classification.component';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { EmpWageComponent } from './emp-wage/emp-wage.component';
import { WeatherCreateComponent } from './weather-classification/weather-create/weather-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CentralLibraryRoutingModule } from './central-library-routing.module';
import { SupplierCreateComponent } from './supplier-create/supplier-create.component';
import { MeasuringUnitsComponent } from './measuring-units/measuring-units.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { MeasuringCreateComponent } from './measuring-create/measuring-create.component';
import { MeasuringEditComponent } from './measuring-edit/measuring-edit.component';
import { WeatherClassificationComponent } from './weather-classification/weather-classification.component';
import { EmployeeClassificationComponent } from './employee-classification/employee-classification.component';
import { PlantClassificationComponent } from './plant-classification/plant-classification.component';
import { CostcodeComponent } from './costcode/costcode.component';
import { MaterialclassificationComponent } from './materialclassification/materialclassification.component';
import { EmployeeCreateComponent } from './employee-classification/employee-create/employee-create.component';
import { ProcurementCategoryComponent } from './procurement-category/procurement-category.component';
import { AssetMaintenanceCategoryComponent } from './asset-maintenance-category/asset-maintenance-category.component';
import { AssetscategoryComponent } from './assetscategory/assetscategory.component';
import { PlantservicehistoryComponent } from './plantservicehistory/plantservicehistory.component';


@NgModule({
  imports: [
    CommonModule,
    CentralLibraryRoutingModule,
    FormsModule, ReactiveFormsModule,
    SharedModule.forRoot()
  ],
  declarations: [SupplierCreateComponent, MeasuringUnitsComponent, SupplierListComponent, MeasuringCreateComponent, MeasuringEditComponent, WeatherClassificationComponent, EmployeeClassificationComponent, PlantClassificationComponent, CostcodeComponent, MaterialclassificationComponent, WeatherCreateComponent, EmployeeCreateComponent, EmpWageComponent, LeavetypeComponent, ProcurementCategoryComponent, ServiceClassificationComponent, SupplierListComponent, WarehouseStockyardlistComponent, CountryStateProvienceComponent, AssetMaintenanceCategoryComponent, AssetscategoryComponent, PlantservicehistoryComponent]
})
export class CentralLibraryModule { }
