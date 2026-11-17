import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { PROFILE, PROJECTS } from '../data/portfolio.data';
import { slugOf } from '../data/slug';

@Component({
  imports: [RouterLink],
  template: `
    @if (project(); as p) {
      <article class="container-x py-20 md:py-24">
        <div class="mx-auto max-w-3xl">
          <a routerLink="/projects" class="text-sm font-semibold text-brand hover:underline">← All projects</a>
          <p class="mt-10 font-mono text-xs uppercase tracking-wider text-muted">{{ p.period }}</p>
          <h1 class="h1 mt-3">{{ p.title }}</h1>
          <p class="lead mt-6">{{ p.summary }}</p>

          <div class="mt-14 border-t border-line pt-10">
            <h2 class="text-xl font-bold text-ink">What I built</h2>
            <ul class="mt-6 space-y-4 text-muted">
              @for (point of p.points; track point) {
                <li class="flex gap-3"><span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"></span><span>{{ point }}</span></li>
              }
            </ul>
          </div>

          <div class="mt-12 border-t border-line pt-10">
            <h2 class="text-xl font-bold text-ink">Technology</h2>
            <div class="mt-5 flex flex-wrap gap-2">
              @for (tech of p.tech; track tech) {
                <span class="pill">{{ tech }}</span>
              }
            </div>
          </div>

          @if (p.link) {
            <a [href]="p.link" target="_blank" rel="noopener" class="btn-ink mt-12">View code on GitHub ↗</a>
          }
        </div>
      </article>
    } @else {
      <section class="container-x py-32 text-center">
        <h1 class="h1">Project not found</h1>
        <a routerLink="/projects" class="btn-line mt-10">Back to projects</a>
      </section>
    }
  `,
})
export class ProjectDetailPage {
  // Bound from the :slug route parameter
  readonly slug = input.required<string>();
  readonly project = computed(() => PROJECTS.find((p) => slugOf(p.title) === this.slug()));

  private readonly titleService = inject(Title);

  constructor() {
    effect(() => {
      const p = this.project();
      this.titleService.setTitle(p ? `${p.title} | ${PROFILE.name}` : `Project not found | ${PROFILE.name}`);
    });
  }
}
