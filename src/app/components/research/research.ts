import { Component } from '@angular/core';
import { RESEARCH } from '../../data/research.data';

@Component({
  selector: 'app-research',
  template: `
    <section class="bg-ink text-white">
      <div class="container-x py-20 md:py-24">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">Research</p>
        <h1 class="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">{{ research.title }}</h1>
        <p class="mt-3 text-sm text-white/55">{{ research.subtitle }} · {{ research.period }}</p>
        <p class="mt-8 max-w-3xl text-lg leading-relaxed text-white/75">{{ research.solution }}</p>

        <dl class="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          @for (result of research.results; track result.label) {
            <div class="bg-ink p-7">
              <dt class="text-sm text-white/60">{{ result.label }}</dt>
              <dd class="mt-3 text-4xl font-extrabold tracking-tight text-accent">{{ result.value }}</dd>
            </div>
          }
        </dl>
      </div>
    </section>

    <section class="container-x grid gap-16 py-20 lg:grid-cols-2">
      <div class="space-y-12">
        <div>
          <h2 class="eyebrow">Problem</h2>
          <p class="mt-4 text-lg leading-relaxed text-muted">{{ research.problem }}</p>
        </div>
        <div>
          <h2 class="eyebrow">Key innovation</h2>
          <p class="mt-4 text-lg leading-relaxed text-muted">{{ research.innovation }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          @for (tech of research.tech; track tech) {
            <span class="pill">{{ tech }}</span>
          }
        </div>
        <a [href]="research.link" target="_blank" rel="noopener" class="btn-ink">View code on GitHub ↗</a>
      </div>

      <div>
        <h2 class="eyebrow">References</h2>
        <ol class="mt-4 list-decimal space-y-4 pl-5 text-sm leading-relaxed text-muted">
          @for (reference of research.references; track reference) {
            <li>{{ reference }}</li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class ResearchComponent {
  readonly research = RESEARCH;
}
