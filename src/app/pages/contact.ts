import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PROFILE } from '../data/portfolio.data';

const TOPICS = ['Full-stack role', 'Backend role', 'Freelance project', 'Something else'];

@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <section class="container-x grid gap-16 py-20 md:py-24 lg:grid-cols-5">
      <div class="lg:col-span-2">
        <p class="eyebrow">Contact</p>
        <h1 class="h1 mt-3">Let's talk</h1>
        <p class="lead mt-5">Open to backend and full-stack roles, and to freelance work on Angular, React and Spring Boot systems.</p>

        <ul class="mt-12 divide-y divide-line border-y border-line">
          <li>
            <a [href]="'mailto:' + profile.email" class="group flex items-center justify-between py-5">
              <span>
                <span class="block font-mono text-xs uppercase tracking-wider text-muted">Email</span>
                <span class="mt-1 block font-semibold text-ink group-hover:text-brand">{{ profile.email }}</span>
              </span>
              <span aria-hidden="true" class="text-muted transition group-hover:translate-x-1 group-hover:text-brand">→</span>
            </a>
          </li>
          <li>
            <a [href]="profile.linkedin" target="_blank" rel="noopener" class="group flex items-center justify-between py-5">
              <span>
                <span class="block font-mono text-xs uppercase tracking-wider text-muted">LinkedIn</span>
                <span class="mt-1 block font-semibold text-ink group-hover:text-brand">abhinav-sharma</span>
              </span>
              <span aria-hidden="true" class="text-muted group-hover:text-brand">↗</span>
            </a>
          </li>
          <li>
            <a [href]="profile.github" target="_blank" rel="noopener" class="group flex items-center justify-between py-5">
              <span>
                <span class="block font-mono text-xs uppercase tracking-wider text-muted">GitHub</span>
                <span class="mt-1 block font-semibold text-ink group-hover:text-brand">abhinav91a</span>
              </span>
              <span aria-hidden="true" class="text-muted group-hover:text-brand">↗</span>
            </a>
          </li>
        </ul>

        <a href="/Abhinav_Sharma_CV.pdf" download class="btn-line mt-10">Download CV (PDF)</a>
      </div>

      <form [formGroup]="form" (ngSubmit)="send()" novalidate
            class="rounded-3xl border border-line bg-white p-8 md:p-10 lg:col-span-3">
        <div class="grid gap-5 md:grid-cols-2">
          <mat-form-field appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" autocomplete="name" />
            @if (form.controls.name.touched && form.controls.name.invalid) {
              <mat-error>Please enter your name</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" autocomplete="email" />
            @if (form.controls.email.touched && form.controls.email.invalid) {
              <mat-error>Enter a valid email address</mat-error>
            }
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>What is this about?</mat-label>
          <mat-select formControlName="topic">
            @for (topic of topics; track topic) {
              <mat-option [value]="topic">{{ topic }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Message</mat-label>
          <textarea matInput rows="6" formControlName="message"></textarea>
          @if (form.controls.message.touched && form.controls.message.invalid) {
            <mat-error>Please write at least 20 characters</mat-error>
          }
        </mat-form-field>

        <button type="submit" class="btn-ink mt-2 w-full">Send message</button>

        <p class="mt-4 text-center text-xs text-muted">
          This opens your email app with the message filled in. Nothing is stored on this site.
        </p>

        @if (sent()) {
          <p role="status" class="mt-4 rounded-xl bg-brand-soft p-3 text-sm text-brand">
            Your email app should open now. If it doesn't, email {{ profile.email }} directly.
          </p>
        }
      </form>
    </section>
  `,
})
export class ContactPage {
  readonly profile = PROFILE;
  readonly topics = TOPICS;
  readonly sent = signal(false);

  private readonly fb = inject(FormBuilder);
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    topic: [TOPICS[0], Validators.required],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  send(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email, topic, message } = this.form.getRawValue();
    const subject = encodeURIComponent(`${topic} | ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
    window.location.href = `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
    this.sent.set(true);
  }
}
