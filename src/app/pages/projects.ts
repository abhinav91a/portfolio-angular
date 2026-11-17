import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../data/portfolio.data';
import { slugOf } from '../data/slug';

// Category per project. The CV doesn't group projects this way, so it lives here.
const CATEGORY: Record<string, string> = {
  'Trading Dashboard': 'Full stack',
  NextLogic: 'Backend',
  FlashCart: 'Full stack',
};

const FEATURED_TITLE = 'Trading Dashboard';
const FILTERS = ['All', 'Backend', 'Full stack'];

@Component({
  imports: [RouterLink],
  template: `
    <section class="container-x py-20">
      <p class="text-sm font-semibold uppercase tracking-widest text-blue-600">Projects</p>
      <h1 class="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">Selected work</h1>
      <p class="mt-4 max-w-2xl text-lg text-slate-600">Backend systems, real-time data and full-stack products.</p>

      <nav class="mt-8 flex flex-wrap gap-2" aria-label="Filter projects">
        @for (option of filters; track option) {
          <a [routerLink]="[]"
             [queryParams]="{ category: option === 'All' ? null : option }"
             queryParamsHandling="merge"
             class="rounded-full border px-4 py-1.5 text-sm font-medium transition"
             [class.border-slate-900]="active() === option"
             [class.bg-slate-900]="active() === option"
             [class.text-white]="active() === option"
             [class.border-slate-300]="active() !== option"
             [class.text-slate-600]="active() !== option"
             [attr.aria-current]="active() === option ? 'page' : null">
            {{ option }}
          </a>
        }
      </nav>

      <p class="mt-6 text-sm text-slate-500">Showing {{ visible().length }} of {{ total }} projects</p>

      @if (featured(); as p) {
        <article class="surface fade-up mt-6 p-8 md:p-10">
          <p class="text-xs font-semibold uppercase tracking-wider text-blue-600">Featured · {{ p.period }}</p>
          <h2 class="mt-2 text-3xl font-extrabold tracking-tight">{{ p.title }}</h2>
          <p class="mt-3 max-w-3xl text-lg text-slate-600">{{ p.summary }}</p>

          <div class="mt-10 overflow-x-auto rounded-2xl bg-slate-50 p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Architecture</p>
            <div class="mt-5 flex min-w-max items-center gap-3 text-sm font-medium">
              <span class="rounded-lg border border-slate-200 bg-white px-3 py-2">Alpaca API</span>
              <span class="text-slate-400">→</span>
              <span class="rounded-lg bg-slate-900 px-3 py-2 text-white">market-data</span>
              <span class="text-slate-400">→</span>
              <span class="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-blue-700">Kafka</span>
              <span class="text-slate-400">→</span>
              <div class="flex flex-col gap-2">
                <span class="rounded-lg bg-white px-3 py-1.5 ring-1 ring-slate-200">portfolio</span>
                <span class="rounded-lg bg-white px-3 py-1.5 ring-1 ring-slate-200">alert</span>
                <span class="rounded-lg bg-white px-3 py-1.5 ring-1 ring-slate-200">api-gateway</span>
              </div>
              <span class="text-slate-400">→</span>
              <span class="rounded-lg bg-linear-to-br from-blue-600 to-violet-600 px-3 py-2 text-white">React dashboard</span>
            </div>
          </div>

          <div class="mt-8 grid gap-8 md:grid-cols-2">
            <ul class="space-y-3 text-slate-600">
              @for (point of p.points; track point) {
                <li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span><span>{{ point }}</span></li>
              }
            </ul>
            <div class="flex flex-col justify-between gap-6">
              <div class="flex flex-wrap content-start gap-2">
                @for (tech of p.tech; track tech) {
                  <span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{{ tech }}</span>
                }
              </div>
              <div class="flex flex-wrap gap-6">
                <a [routerLink]="['/projects', slug(p.title)]" class="font-semibold text-blue-600 hover:underline">Case study →</a>
                @if (p.link) {
                  <a [href]="p.link" target="_blank" rel="noopener" class="font-semibold text-slate-700 hover:underline">GitHub ↗</a>
                }
              </div>
            </div>
          </div>
        </article>
      }

      <div class="mt-6 grid gap-6 md:grid-cols-2">
        @for (project of others(); track project.title; let i = $index) {
          <a [routerLink]="['/projects', slug(project.title)]"
             class="surface group fade-up block p-6"
             [style.animation-delay.ms]="i * 70">
            <p class="text-xs font-semibold uppercase tracking-wider text-blue-600">{{ project.period }}</p>
            <h2 class="mt-2 text-xl font-bold text-slate-900 group-hover:text-blue-600">{{ project.title }}</h2>
            <p class="mt-2 text-slate-600">{{ project.summary }}</p>
            <div class="mt-5 flex flex-wrap gap-2">
              @for (tech of project.tech.slice(0, 5); track tech) {
                <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{{ tech }}</span>
              }
            </div>
            <p class="mt-5 text-sm font-semibold text-slate-900 group-hover:text-blue-600">View case study →</p>
          </a>
        }
      </div>
    </section>
  `,
})
export class ProjectsPage {
  // The router can pass undefined when the URL has no ?category, so fall back to All
  readonly category = input<string | null | undefined>(undefined);
  readonly active = computed(() => this.category() || 'All');
  readonly filters = FILTERS;
  readonly total = PROJECTS.length;
  readonly slug = slugOf;

  readonly visible = computed(() =>
    PROJECTS.filter((p) => this.active() === 'All' || CATEGORY[p.title] === this.active()),
  );
  readonly featured = computed(() => this.visible().find((p) => p.title === FEATURED_TITLE));
  readonly others = computed(() => this.visible().filter((p) => p.title !== FEATURED_TITLE));
}
