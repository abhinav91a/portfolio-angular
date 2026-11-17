import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROJECTS } from './data/portfolio.data';
import { slugOf } from './data/slug';

export const serverRoutes: ServerRoute[] = [
  {
    // One prerendered HTML page per project, generated from the project list
    path: 'projects/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return PROJECTS.map((p) => ({ slug: slugOf(p.title) }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
