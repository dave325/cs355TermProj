import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Phase2Component } from './phase2/phase2.component';
import { Phase3Component } from './phase3/phase3.component';
import { Phase4Component } from './phase4/phase4.component';
import { Phase5Component } from './phase5/phase5.component';
import { BrowserComponent } from './browser/browser.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ZybooksComponent } from './zybooks/zybooks.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    data:{state: ""}
  },
  {
    path:"phase2",
    component:Phase2Component,
    data:{state: "phase2"}
  },
  {
    path:"phase3",
    component:Phase3Component,
    data:{state: "phase3"}
  },
  {
    path:"phase4",
    component:Phase4Component,
    data:{state: "phase4"}
  },
  {
    path:"phase5",
    component:Phase5Component,
    data:{state: "phase5"}
  },
  {
    path:"browser",
    component:BrowserComponent,
    data:{state: "browser"}
  },
  {
    path:"contatUs",
    component:ContactUsComponent,
    data:{state: "contactUs"}
  },
  {
    path:"zybooks",
    component:ZybooksComponent
  },
  {
    path:"admin",
    component:AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
