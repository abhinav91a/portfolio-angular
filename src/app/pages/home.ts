import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CareerChartsComponent } from '../components/career-charts/career-charts';
import { PROFILE, PROJECTS } from '../data/portfolio.data';
import { slugOf } from '../data/slug';

// Real code from the trading dashboard: each price is published keyed by its symbol
const KAFKA_SNIPPET = `String symbol = String.valueOf(trade.get("S"));
BigDecimal price = new BigDecimal(String.valueOf(trade.get("p")))
        .setScale(2, RoundingMode.HALF_UP);
kafkaTemplate.send(TOPIC, symbol, new PriceTick(symbol, price, timestamp));`;

const IMPACT = [
  {
    value: '40%',
    label: 'faster application load time',
    detail: 'Re-engineered Redux state and component architecture for a large EV management platform.',
    source: 'Clenergy EV',
  },
  {
    value: '30%',
    label: 'less duplicate code',
    detail: 'Shared component libraries in a Rush monorepo, reused across student, teacher and admin portals.',
    source: 'Edufront',
  },
  {
    value: '70%',
    label: 'lower processing time',
    detail: 'Parallel execution in an ontology alignment pipeline covering more than 24,000 entities.',
    source: 'Research project',
  },
];

@Component({
  imports: [RouterLink, CareerChartsComponent],
  template: `
    <section class="hero-glow">
      <div class="container-x grid items-center gap-16 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div class="fade-up">
          <span class="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-muted">
            <span class="h-2 w-2 rounded-full bg-brand"></span>
            Available for backend and full-stack roles
          </span>
          <h1 class="mt-7 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl">{{ profile.name }}</h1>
          <p class="mt-5 text-xl font-semibold text-brand">{{ profile.title }}</p>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-muted">{{ profile.headline }}</p>
          <div class="mt-10 flex flex-wrap gap-3">
            <a routerLink="/projects" class="btn-ink">View projects →</a>
            <a href="/Abhinav_Sharma_CV.pdf" download class="btn-line">Download CV</a>
            <a [href]="profile.github" target="_blank" rel="noopener" class="btn-line">GitHub</a>
          </div>
        </div>

        <div class="fade-up" style="animation-delay: 150ms">
          <div class="overflow-hidden rounded-3xl bg-ink shadow-2xl">
            <div class="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
              <span class="h-2.5 w-2.5 rounded-full bg-white/20"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-white/20"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-white/20"></span>
              <span class="ml-3 font-mono text-xs text-white/50">AlpacaPriceStream.java</span>
            </div>
            <pre class="overflow-x-auto p-6 font-mono text-[13px] leading-7 text-white/85"><code>{{ snippet }}</code></pre>
          </div>
          <p class="mt-4 text-sm text-muted">Each price is keyed by its symbol, so updates for one stock stay in order across Kafka partitions.</p>
        </div>
      </div>
    </section>

    <section class="border-y border-line bg-white">
      <dl class="container-x grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
        @for (stat of profile.stats; track stat.label) {
          <div>
            <dt class="font-mono text-xs uppercase tracking-wider text-muted">{{ stat.label }}</dt>
            <dd class="mt-2 text-xl font-bold text-ink md:text-2xl">{{ stat.value }}</dd>
          </div>
        }
      </dl>
    </section>

    <section class="container-x py-24">
      <p class="eyebrow">Measured impact</p>
      <h2 class="h2 mt-3 max-w-2xl">Results I can point to</h2>
      <div class="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        @for (item of impact; track item.label) {
          <div class="bg-white p-8">
            <p class="text-6xl font-extrabold tracking-tight text-brand">{{ item.value }}</p>
            <p class="mt-4 text-lg font-semibold">{{ item.label }}</p>
            <p class="mt-3 text-sm leading-relaxed text-muted">{{ item.detail }}</p>
            <p class="mt-8 font-mono text-xs uppercase tracking-wider text-muted">{{ item.source }}</p>
          </div>
        }
      </div>
    </section>

    @if (featured; as p) {
      <section class="container-x pb-24">
        <a [routerLink]="['/projects', slug(p.title)]"
           class="group grid gap-8 rounded-3xl bg-ink p-8 text-white md:grid-cols-[1.2fr_1fr] md:p-12">
          <div>
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">Featured project</p>
            <h2 class="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{{ p.title }}</h2>
            <p class="mt-4 text-white/70">{{ p.summary }}</p>
            <p class="mt-8 inline-block font-semibold text-accent transition group-hover:translate-x-1">Read the case study →</p>
          </div>
          <div class="flex flex-wrap content-end gap-2">
            @for (tech of p.tech; track tech) {
              <span class="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80">{{ tech }}</span>
            }
          </div>
        </a>
      </section>
    }

    <section class="container-x pb-24">
      <p class="eyebrow">Career</p>
      <h2 class="h2 mt-3">Roles and projects over time</h2>
      <p class="mt-3 max-w-2xl text-muted">Hover a bar for dates. Skill counts match the areas listed on my CV.</p>
      <div class="mt-10"><app-career-charts /></div>
    </section>

    <section class="container-x pb-24">
      <div class="rounded-3xl bg-brand px-8 py-16 text-center text-white md:px-16">
        <h2 class="text-3xl font-extrabold tracking-tight md:text-4xl">Let's build something useful</h2>
        <p class="mx-auto mt-4 max-w-xl text-white/80">Open to backend and full-stack roles, and to freelance work on Angular, React and Spring Boot systems.</p>
        <div class="mt-9 flex flex-wrap justify-center gap-3">
          <a routerLink="/contact" class="btn-brand">Get in touch</a>
          <a [href]="'mailto:' + profile.email" class="btn-light">Email me</a>
        </div>
      </div>
    </section>
  `,
})
export class HomePage {
  readonly profile = PROFILE;
  readonly impact = IMPACT;
  readonly snippet = KAFKA_SNIPPET;
  readonly featured = PROJECTS.find((p) => p.title === 'Trading Dashboard');
  readonly slug = slugOf;
}
