import { NgModule } from "@angular/core";
import { App } from "./app";
import { Header } from "./header/header";
import { BrowserModule } from "@angular/platform-browser";
import { TaskModule } from "./tasks/tasks.module";
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@NgModule({
    declarations: [App, Header],
    bootstrap: [App],
    imports: [BrowserModule, SharedModule, UserModule, TaskModule]
})
export class AppModule {

}