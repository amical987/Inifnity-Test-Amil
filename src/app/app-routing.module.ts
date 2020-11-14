import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guard/auth-guard.service';

const routes: Routes = [
    {
        path: "landing",
        data: { title: "landing" },
        canActivate: [AuthGuard],
        loadChildren: () =>
            import("./landing/landing.module").then(mod => mod.LandingModule)
    },
    {
        path: "content",
        data: { title: "Content Editor" },
        canActivate: [AuthGuard],
        loadChildren: () =>
            import("./content/content.module").then(mod => mod.ContentModule)
    },
    {
        path: 'user-management',
        data: { title: "user-management" },
        canActivate: [AuthGuard],
        loadChildren: () => import("./user-management/user-management.module").then(d => d.UserManagementModule)
    },
    {
        path: "settings",
        data: { title: "Settings" },
        canActivate: [AuthGuard],
        loadChildren: () => import("./settings/settings.module").then(mod => mod.SettingsModule)
    },
    {
        path: 'data-template',
        data: { title: "Data Template" },
        canActivate: [AuthGuard],
        loadChildren: () => import('./data-template/data-templates.module').then(d => d.DataTemplatesModule)
    },
    {
        path: 'site',
        data: { title: "Site" },
        canActivate: [AuthGuard],
        loadChildren: () => import('./site/site.module').then(d => d.SiteModule)
    },
    {
        path: 'workflow',
        data: { title: "Workflow" },
        canActivate: [AuthGuard],
        loadChildren: () => import('./workflow/workflow.module').then(d => d.WorkflowModule)
    },
    {
        path: 'locale',
        data: { title: "Locale" },
        canActivate: [AuthGuard],
        loadChildren: () => import('./locale/locale.module').then(d => d.LocaleModule)
    },
    {
        path: 'media',
        data: { title: "Media" },
        canActivate: [AuthGuard],
        loadChildren: () => import('./media/media.module').then(d => d.MediaModule)
    },
    {
        path: "home",
        data: { title: "home" },
        canActivate: [AuthGuard],
        loadChildren: () =>
            import("./home/home.module").then(mod => mod.HomeModule)
    },
    {
        path: "authenticate",
        data: { title: "authentification" },
        loadChildren: () =>
            import("./security/security.module").then(mod => mod.SecurityModule)
    },
    {
        path: "errors",
        data: { title: "error page" },
        loadChildren: () =>
            import("./error-pages/error-pages.module").then(
                mod => mod.ErrorPagesModule
            )
    },
    { path: "", redirectTo: "landing", pathMatch: "full" },
    { path: "**", redirectTo: "/errors/404", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
