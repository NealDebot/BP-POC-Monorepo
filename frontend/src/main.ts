import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import Clarity from '@microsoft/clarity';

Clarity.init("wf7gcwe0ny")
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
