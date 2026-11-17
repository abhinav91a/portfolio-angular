import { Component } from '@angular/core';
import { SKILL_GROUPS } from '../data/portfolio.data';

@Component({
  template: `
    <section class="container-x py-20 md:py-24">
      <div class="max-w-2xl">
        <p class="eyebrow">Skills</p>
        <h1 class="h1 mt-3">Technical toolkit</h1>
        <p class="lead mt-5">Grouped by area, matching the skills listed on my CV.</p>
      </div>

      <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        @for (group of groups; track group.name; let i = $index) {
          <div class="card fade-up" [style.animation-delay.ms]="i * 60">
            <div class="flex items-start justify-between gap-4">
              <h2 class="font-bold text-ink">{{ group.name }}</h2>
              <span class="font-mono text-xs text-brand">{{ group.items.length }}</span>
            </div>
            <ul class="mt-5 flex flex-wrap gap-2">
              @for (item of group.items; track item) {
                <li class="pill">{{ item }}</li>
              }
            </ul>
          </div>
        }
      </div>
    </section>
  `,
})
export class SkillsPage {
  readonly groups = SKILL_GROUPS;
}
