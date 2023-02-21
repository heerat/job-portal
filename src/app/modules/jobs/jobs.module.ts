import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { JobsComponent } from './jobs.component'
import { JobListComponent } from './components/job-list/job-list.component'
import { JobFormComponent } from './components/job-form/job-form.component'
import { JobDetailComponent } from './components/job-detail/job-detail.component'
import { JobModalComponent } from './components/job-modal/job-modal.component'
import { JobsRoutingModule } from './jobs-routing.module'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { jobsReducer } from './store/jobs.state'
import { JobsEffects } from './store/jobs.effects'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    JobsComponent,
    JobListComponent,
    JobFormComponent,
    JobDetailComponent,
    JobModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JobsRoutingModule,
    StoreModule.forFeature('jobs', jobsReducer),
    EffectsModule.forFeature(JobsEffects),
    SharedModule
  ],
  providers: [{ provide: Window, useValue: window }]
})
export class JobsModule {}
