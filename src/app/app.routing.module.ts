// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { TableComponent } from './table/table.component';
// import { InputComponent } from './input/input.component';
// import { NoDataPageComponent } from './no-data-page/no-data-page.component';

// const routes: Routes = [
//     { path: '', component: TableComponent },
//     { path: 'add', component:InputComponent },
//     { path: 'detail/{id}', component: InputComponent },
//     { path: 'detail', component: InputComponent },
//     { path: '**', component: NoDataPageComponent }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { InputComponent } from './input/input.component';
import { NoDataPageComponent } from './no-data-page/no-data-page.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { LogoutComponent } from './pages/logout/logout.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: TableComponent, canActivate: [AuthGuard] },
    { path: 'add', component: InputComponent },
    { path: 'detail/:id', component: InputComponent },  // Corrected dynamic route
    { path: 'detail', component: InputComponent },
    { path: 'logout', component: LogoutComponent},
    { path: '**', component: NoDataPageComponent }  // Wildcard route for 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
