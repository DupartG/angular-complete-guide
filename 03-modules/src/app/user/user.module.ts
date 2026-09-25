import { NgModule } from '@angular/core';
import { User } from './user';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [User],
  imports: [SharedModule],
  exports: [User],
})
export class UserModule {}
