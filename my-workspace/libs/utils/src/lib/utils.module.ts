import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Config } from './config/config';

@NgModule({
  imports: [CommonModule],
})
export class UtilsModule {
  static forRoot(config: Config): ModuleWithProviders<UtilsModule> {
    return {
      ngModule: UtilsModule,
      providers: [{ provide: Config, useValue: config }],
    };
  }
}
