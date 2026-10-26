import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';


import { AppLayout } from './shared/components/layout/app-layout/app-layout';
import { authGuard } from './core/guards/auth-guard';
import { PlanetList } from './features/planets/planet-list/planet-list';
import { PlanetForm } from './features/planets/planet-form/planet-form';
import { PlanetDetail } from './features/planets/planet-detail/planet-detail';
import { StarList } from './features/stars/star-list/star-list';
import { StarForm } from './features/stars/star-form/star-form';
import { StarDetail } from './features/stars/star-detail/star-detail';
import { GalaxyList } from './features/galaxies/galaxy-list/galaxy-list';
import { GalaxyForm } from './features/galaxies/galaxy-form/galaxy-form';
import { GalaxyDetail } from './features/galaxies/galaxy-detail/galaxy-detail';
import { SolarSystemList } from './features/solar-systems/solar-system-list/solar-system-list';
import { SolarSystemForm } from './features/solar-systems/solar-system-form/solar-system-form';
import { SolarSystemDetail } from './features/solar-systems/solar-system-detail/solar-system-detail';
import { UniverseList } from './features/universes/universe-list/universe-list';
import { UniverseForm } from './features/universes/universe-form/universe-form';
import { UniverseDetail } from './features/universes/universe-detail/universe-detail';
import { GalacticClusterList } from './features/galactic-cluster/galactic-cluster-list/galactic-cluster-list';
import { GalacticClusterForm } from './features/galactic-cluster/galactic-cluster-form/galactic-cluster-form';
import { GalacticClusterDetail } from './features/galactic-cluster/galactic-cluster-detail/galactic-cluster-detail';
import { GalacticSuperClusterList } from './features/galactic-supercluster/galactic-supercluster-list/galactic-supercluster-list';
import { GalacticSuperClusterForm } from './features/galactic-supercluster/galactic-supercluster-form/galactic-supercluster-form';
import { GalacticSuperClusterDetail } from './features/galactic-supercluster/galactic-supercluster-detail/galactic-supercluster-detail';
import { SupernovaList } from './features/supernova/supernova-list/supernova-list';
import { SupernovaForm } from './features/supernova/supernova-form/supernova-form';
import { SupernovaDetail } from './features/supernova/supernova-detail/supernova-detail';
import { BlackHoleService } from './core/services/black-hole/black-hole';
import { BlackHoleList } from './features/black-hole/black-hole-list/black-hole-list';
import { BlackHoleForm } from './features/black-hole/black-hole-form/black-hole-form';
import { BlackHoleDetail } from './features/black-hole/black-hole-detail/black-hole-detail';
import { SearchComponent } from './features/search/search';
import { UserList } from './features/admin/users/user-list/user-list';
import { roleGuard } from './core/guards/role-guard';
import { UserForm } from './features/admin/users/user-form/user-form';
import { Register } from './features/auth/register/register';

export const routes: Routes = [

  // Public routes
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },

  // Protected application
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
// ADMIN
    {
      path: 'admin/users',
      component: UserList,
      canActivate: [roleGuard],
      data: {
        roles: ['ROLE_ADMIN']
      }
    },
    {
  path: 'admin/users/create',
  component: UserForm,
  canActivate: [roleGuard],
  data: {
    roles: ['ROLE_ADMIN']
  }
},
{
  path: 'admin/users/:id/edit',
  component: UserForm,
  canActivate: [roleGuard],
  data: {
    roles: ['ROLE_ADMIN']
  }
},
      // SEARCH
      {
  path: 'search',
  component: SearchComponent
},

      {
        path: 'dashboard',
        component: Dashboard
      },

      // planet 
      {
      path: 'planets',
      component: PlanetList
    },
    {
      path: 'planets/create',
      component: PlanetForm
    },
    {
      path: 'planets/:id/edit',
      component: PlanetForm
    },
    {
     path: 'planets/:id',
    component: PlanetDetail
    },
    // STAR
    {
  path: 'stars',
  component: StarList
},
{
  path: 'stars/create',
  component: StarForm
},
{
  path: 'stars/:id/edit',
  component: StarForm
},
{
  path: 'stars/:id',
  component: StarDetail
},
// GALAXY
{
  path: 'galaxies',
  component: GalaxyList
},
{
  path: 'galaxies/create',
  component: GalaxyForm
},
{
  path: 'galaxies/:id/edit',
  component: GalaxyForm
},
{
  path: 'galaxies/:id',
  component: GalaxyDetail
}, 
//SOLAR SYSTEM
{
  path: 'solar-systems',
  component: SolarSystemList
},
{
  path: 'solar-systems/create',
  component: SolarSystemForm
},
{
  path: 'solar-systems/:id/edit',
  component: SolarSystemForm
},
{
  path: 'solar-systems/:id',
  component: SolarSystemDetail
},
// UNIVERSE
{
  path: 'universes',
  component: UniverseList
},
{
  path: 'universes/create',
  component: UniverseForm
},
{
  path: 'universes/:id/edit',
  component: UniverseForm
},
{
  path: 'universes/:id',
  component: UniverseDetail
},
// GALACTIC CLUSTER
{
  path: 'galactic-clusters',
  component: GalacticClusterList
},
{
  path: 'galactic-clusters/create',
  component: GalacticClusterForm
},
{
  path: 'galactic-clusters/:id/edit',
  component: GalacticClusterForm
},
{
  path: 'galactic-clusters/:id',
  component: GalacticClusterDetail
},
// SUPER GALACTIC CLUSTER

{
  path: 'galactic-superclusters',
  component: GalacticSuperClusterList
},
{
  path: 'galactic-superclusters/create',
  component: GalacticSuperClusterForm
},
{
  path: 'galactic-superclusters/:id/edit',
  component: GalacticSuperClusterForm
},
{
  path: 'galactic-superclusters/:id',
  component: GalacticSuperClusterDetail
},
// SUPER NOVA
{
  path: 'supernovae',
  component: SupernovaList
},
{
  path: 'supernovae/create',
  component: SupernovaForm
},
{
  path: 'supernovae/:id/edit',
  component: SupernovaForm
},
{
  path: 'supernovae/:id',
  component: SupernovaDetail
},
// BLACK-HOLES
{
  path: 'black-holes',
  component: BlackHoleList
},
{
  path: 'black-holes/create',
  component: BlackHoleForm
},
{
  path: 'black-holes/:id/edit',
  component: BlackHoleForm
},
{
  path: 'black-holes/:id',
  component: BlackHoleDetail
}

    ]
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];