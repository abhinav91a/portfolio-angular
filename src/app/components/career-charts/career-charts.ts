import { AfterViewInit, Component, ElementRef, OnDestroy, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';
import { SKILL_GROUPS, TIMELINE } from '../../data/portfolio.data';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MUTED = '#66706b';
const GRID = '#ece9e2';
const DOUGHNUT = ['#0e1513', '#134e4a', '#0f766e', '#14b8a6', '#5eead4', '#f59e0b', '#b45309', '#d6d3d1', '#78716c'];

// Converts a decimal year (2023.33) back to "May 2023" for tooltips
function formatMonth(value: number): string {
  const year = Math.floor(value);
  const month = Math.min(11, Math.round((value - year) * 12));
  return `${MONTHS[month]} ${year}`;
}

@Component({
  selector: 'app-career-charts',
  template: `
    <div class="grid gap-6 lg:grid-cols-3">
      <div class="rounded-3xl border border-line bg-white p-6 md:p-8 lg:col-span-2">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h3 class="font-bold text-ink">Career timeline</h3>
          <div class="flex items-center gap-5 text-xs text-muted">
            <span class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-sm bg-ink"></span>Roles</span>
            <span class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-sm bg-brand"></span>Projects</span>
          </div>
        </div>
        <div class="relative mt-6 h-96"><canvas #timeline></canvas></div>
      </div>
      <div class="rounded-3xl border border-line bg-white p-6 md:p-8">
        <h3 class="font-bold text-ink">Skills by area</h3>
        <p class="mt-1 text-sm text-muted">Skills listed per area on my CV.</p>
        <div class="relative mt-6 h-96"><canvas #skills></canvas></div>
      </div>
    </div>
  `,
})
export class CareerChartsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('timeline') timelineCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('skills') skillsCanvas!: ElementRef<HTMLCanvasElement>;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private charts: Chart[] = [];

  ngAfterViewInit(): void {
    // Chart.js needs a real canvas, so charts are created only in the browser
    if (!this.isBrowser) {
      return;
    }

    this.charts.push(
      new Chart(this.timelineCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: TIMELINE.map((item) => item.label),
          datasets: [
            {
              data: TIMELINE.map((item): [number, number] => [item.start, item.end]),
              backgroundColor: TIMELINE.map((item) => item.color),
              borderRadius: 8,
              barThickness: 14,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0e1513',
              padding: 10,
              callbacks: {
                label: (ctx) => {
                  const [start, end] = ctx.raw as [number, number];
                  return `${formatMonth(start)} to ${formatMonth(end)}`;
                },
              },
            },
          },
          scales: {
            x: { min: 2016, max: 2027, ticks: { stepSize: 1, color: MUTED }, grid: { color: GRID } },
            y: { grid: { display: false }, ticks: { color: '#0e1513' } },
          },
        },
      }),
    );

    this.charts.push(
      new Chart(this.skillsCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: SKILL_GROUPS.map((group) => group.name),
          datasets: [
            {
              data: SKILL_GROUPS.map((group) => group.items.length),
              backgroundColor: DOUGHNUT,
              borderColor: '#ffffff',
              borderWidth: 2,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          cutout: '64%',
          plugins: {
            legend: { position: 'bottom', labels: { color: MUTED, boxWidth: 10, padding: 14 } },
          },
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.charts.forEach((chart) => chart.destroy());
  }
}
