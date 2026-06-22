import { Routes } from '@angular/router';
import { HomeComponent } from '../principal/pages/home/home.component';
import { LoginComponent } from '../principal/pages/login/login.component';
import { ProjetosComponent } from '../principal/pages/projetos/projetos.component';
import { PageNotFoundComponent } from '../principal/pages/page-not-found/page-not-found.component';
import { SplashComponent } from '../principal/pages/splash/splash.component';
import { AberturaComponent } from '../principal/pages/abertura/abertura.component';
import { UnidadesComponent } from '../principal/pages/unidades/unidades.component';


export const routes: Routes = [
    { path: '',   redirectTo: 'splash', pathMatch: 'full' },
    { path: 'splash', component: SplashComponent},
    { path: 'login', component: LoginComponent},
    { path: 'access', component: AberturaComponent,
            children:[
                {path: 'objectives', component: ProjetosComponent },
                {path: 'advantages', component: ProjetosComponent },
                {path: 'features', component: ProjetosComponent },
                {path: 'releases', component: ProjetosComponent },
                {path: 'questions', component: ProjetosComponent },
                {path: 'contact', component: ProjetosComponent },
    ]},
    { path: 'home', component: HomeComponent,
        children:[
            {path: 'organizations', component: UnidadesComponent },
            {path: 'projects', component: ProjetosComponent },
            {path: 'users', component: ProjetosComponent },
            {path: 'settings', component: ProjetosComponent },
    ]},
    { path: '**', component: PageNotFoundComponent }
];
