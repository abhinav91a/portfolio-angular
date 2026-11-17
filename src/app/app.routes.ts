import { Routes } from '@angular/router';
import { PROFILE } from './data/portfolio.data';

const SITE = PROFILE.name;

export const routes: Routes = [
  {
    path: '',
    title: `${SITE} | Full Stack & Frontend Engineer`,
    loadComponent: () => import('./pages/home').then((m) => m.HomePage),
  },
  {
    path: 'experience',
    title: `Experience | ${SITE}`,
    loadComponent: () => import('./pages/experience').then((m) => m.ExperiencePage),
  },
  {
    path: 'projects',
    title: `Projects | ${SITE}`,
    loadComponent: () => import('./pages/projects').then((m) => m.ProjectsPage),
  },
  {
    // No title function here. ProjectDetailPage sets its own title.
    path: 'projects/:slug',
    loadComponent: () => import('./pages/project-detail').then((m) => m.ProjectDetailPage),
  },
  {
    path: 'research',
    title: `Research | ${SITE}`,
    loadComponent: () => import('./components/research/research').then((m) => m.ResearchComponent),
  },
  {
    path: 'skills',
    title: `Skills | ${SITE}`,
    loadComponent: () => import('./pages/skills').then((m) => m.SkillsPage),
  },
  {
    path: 'contact',
    title: `Contact | ${SITE}`,
    loadComponent: () => import('./pages/contact').then((m) => m.ContactPage),
  },
  {
    path: '**',
    title: `Page not found | ${SITE}`,
    loadComponent: () => import('./pages/not-found').then((m) => m.NotFoundPage),
  },
];
