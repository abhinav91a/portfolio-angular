import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  template: `
    <section class="container-x py-32 text-center">
      <p class="font-mono text-sm text-brand">404</p>
      <h1 class="h1 mt-4">Page not found</h1>
      <p class="lead mx-auto mt-5 max-w-md">The page you're looking for doesn't exist or has moved.</p>
      <a routerLink="/" class="btn-ink mt-10">Back to home</a>
    </section>
  `,
})
export class NotFoundPage {}
