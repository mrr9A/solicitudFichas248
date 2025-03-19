import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'cbtis248Ficha',
        children: [
            {
                path: 'menu',
                loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'home',
                loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent)
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
                path: 'revision',
                loadComponent: ()  => import('./Admin/revison-doc/revison-doc.component').then(m => m.RevisonDocComponent)
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
