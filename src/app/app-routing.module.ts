import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  {
    path: 'jobs',
    loadChildren: () =>
      import('./modules/jobs/jobs.module').then(module => module.JobsModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
