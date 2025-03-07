import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cbtis248Ficha',
        children: [
            {
                path: 'home',
                loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'homePostulantes',
                loadComponent: ()  => import('./postulantes/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'homeAdmin',
                loadComponent: ()  => import('./Admin/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'solicitud',
                loadComponent: ()  => import('./postulantes/registro/registro.component').then(m => m.RegistroComponent)
            },

            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'cbtis248Ficha'
    }
];
