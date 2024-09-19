import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { InputComponent } from './input/input.component';
import { NoDataPageComponent } from './no-data-page/no-data-page.component';

const routes: Routes = [
    { path: '', component: TableComponent },
    { path: 'add', component:InputComponent },
    { path: 'detail/{id}', component: InputComponent },
    { path: 'detail', component: InputComponent },
    { path: '**', component: NoDataPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }