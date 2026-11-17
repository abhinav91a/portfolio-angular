import { Component } from '@angular/core';
import { ROLES } from '../data/portfolio.data';

@Component({
  template: `
    <section class="container-x py-20 md:py-24">
      <p class="eyebrow">Experience</p>
      <h1 class="h1 mt-3">Where I've worked</h1>
      <p class="lead mt-5 max-w-2xl">Six roles building web applications, from Angular interfaces in 2016 to React micro-frontends and Java microservices today.</p>

      <ol class="mt-16 divide-y divide-line border-y border-line">
        @for (role of roles; track role.company; let i = $index) {
          <li class="fade-up grid gap-6 py-10 md:grid-cols-12" [style.animation-delay.ms]="i * 70">
            <div class="md:col-span-4">
              <p class="font-mono text-xs uppercase tracking-wider text-muted">{{ role.period }}</p>
              <p class="mt-2 text-sm text-muted">{{ role.location }}</p>
            </div>
            <div class="md:col-span-8">
              <h2 class="text-xl font-bold text-ink">{{ role.title }}</h2>
              <p class="mt-1 font-semibold text-brand">{{ role.company }}</p>
              <ul class="mt-5 space-y-3 text-muted">
                @for (point of role.points; track point) {
                  <li class="flex gap-3"><span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"></span><span>{{ point }}</span></li>
                }
              </ul>
            </div>
          </li>
        }
      </ol>
    </section>
  `,
})
export class ExperiencePage {
  readonly roles = ROLES;
}
