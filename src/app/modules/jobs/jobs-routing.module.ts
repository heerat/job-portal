import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { JobDetailComponent } from './components/job-detail/job-detail.component'
import { JobFormComponent } from './components/job-form/job-form.component'
import { JobListComponent } from './components/job-list/job-list.component'
import { JobsComponent } from './jobs.component'

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
    children: [
      { path: '', component: JobListComponent },
      { path: 'new', component: JobFormComponent },
      { path: 'edit/:id', component: JobFormComponent },
      { path: ':id', component: JobDetailComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule {}
