import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigService } from './core/config/config.service';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SecurityModule } from './security/security.module';

export function configServiceFactory(config: ConfigService) {
    return () => config.load();
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SecurityModule,
        HttpClientModule,
        LayoutModule,
        CoreModule,
        ReactiveFormsModule,
    ],
    providers: [
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: configServiceFactory,
            deps: [ConfigService],
            multi: true
        },
    ],
    exports: [SecurityModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
