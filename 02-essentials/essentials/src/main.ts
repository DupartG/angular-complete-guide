import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err)); // load the root component. Most app must launch only one app component

