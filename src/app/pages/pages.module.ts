import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { OaModule } from '../theme/oa-them/oa.module';

import { Pages } from './pages.component';
import {AuthGuard} from "../theme/oa-them/guards/auth/auth.guard";
import {MessageService} from "../services/core/messageComponent.service";

@NgModule({
  imports: [CommonModule, NgaModule, OaModule,routing],
  declarations: [Pages],
  providers: [AuthGuard,MessageService]
})
export class PagesModule {
}
