// Single source of truth for the site. Content comes from your CV.

// Turns a year and month into a decimal year (May 2023 becomes 2023.33), so charts can place bars
const at = (year: number, month: number): number => year + (month - 1) / 12;

export const PROFILE = {
  name: 'Abhinav Sharma',
  title: 'Full Stack & Frontend Software Engineer',
  headline:
    'Full stack and frontend engineer with 6+ years building Angular, React and TypeScript applications for enterprise and high-volume platforms. Now building Java and Spring Boot microservices with Kafka, PostgreSQL and Docker.',
  email: 'abhinav.sharma9@aol.com',
  linkedin: 'https://www.linkedin.com/in/abhinav-sharma-373b17a7',
  github: 'https://github.com/abhinav91a',
  stats: [
    { label: 'Years experience', value: '6+' },
    { label: 'Roles since 2016', value: '6' },
    { label: 'Frontend', value: 'Angular · React' },
    { label: 'Backend', value: 'Java 21 · Spring Boot' },
  ],
};

export const ROLES = [
  {
    title: 'Senior Software Engineer',
    company: 'Airtel International LLP (Airtel Africa)',
    shortName: 'Airtel Africa',
    location: 'Gurugram, India',
    period: 'Jan 2023 – May 2023',
    from: at(2023, 1),
    to: at(2023, 5),
    points: [
      'Designed a React micro-frontend architecture with Module Federation and Webpack, so each market deploys independently.',
      'Built a shared component library with WCAG- and ARIA-aligned components, and set up GitHub Actions pipelines for per-market builds.',
      'Improved performance in low-bandwidth markets with lazy loading and React.memo.',
    ],
  },
  {
    title: 'Technical Lead',
    company: 'Samin TekMindz India Pvt Limited (client: Clenergy EV)',
    shortName: 'Clenergy EV',
    location: 'Noida, India',
    period: 'Aug 2020 – Jan 2023',
    from: at(2020, 8),
    to: at(2023, 1),
    points: [
      'Architected the React, TypeScript and Redux front end for a large-scale EV management platform.',
      'Built high-volume AG Grid tables and live amCharts 5 time-series dashboards.',
      'Re-engineered Redux state management and component architecture, cutting application load time by 40%.',
      'Translated UK and EU compliance requirements into prioritised UI features in Agile/Scrum teams.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Edufront',
    shortName: 'Edufront',
    location: 'Delhi, India',
    period: 'Jan 2020 – Aug 2020',
    from: at(2020, 1),
    to: at(2020, 8),
    points: [
      'Migrated a legacy school management platform from React class components to hooks.',
      'Built shared component libraries in a Rush monorepo, cutting duplicate code by about 30%.',
      'Set up Vite and used Jotai for shared state in the migrated components.',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'Transformative Learning Solutions',
    shortName: 'Transformative Learning',
    location: 'Gurugram, India',
    period: 'Nov 2018 – Sep 2019',
    from: at(2018, 11),
    to: at(2019, 9),
    points: [
      'Built an in-house logistics management platform in Angular to handle thousands of packages, from tracking to delivery.',
      'Developed time and pricing modules for shipments, and reusable components for tracking and delivery screens.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Pennybase Technology Solutions',
    shortName: 'Pennybase',
    location: 'Gurugram, India',
    period: 'Oct 2017 – Sep 2018',
    from: at(2017, 10),
    to: at(2018, 9),
    points: [
      'Built Angular interfaces with Angular Material, Bootstrap and SCSS for enterprise and SME projects.',
    ],
  },
  {
    title: 'Web UI Developer',
    company: 'TIS India Business Consultants',
    shortName: 'TIS India',
    location: 'Noida, India',
    period: 'Sep 2016 – Sep 2017',
    from: at(2016, 9),
    to: at(2017, 9),
    points: [
      'Built Angular, Bootstrap and SCSS interfaces for client projects, including the Tour My India website.',
    ],
  },
];

export const PROJECTS = [
  {
    title: 'Trading Dashboard',
    shortName: 'Trading Dashboard',
    period: 'Nov 2026 – Present',
    from: at(2026, 11),
    to: at(2026, 12),
    summary:
      'Microservices platform that streams live US stock prices from Alpaca through Kafka to a React dashboard.',
    points: [
      'Six Spring Boot services, each with its own PostgreSQL database and Flyway migrations.',
      'Kafka consumers push live prices and triggered alerts to the browser over WebSocket.',
      'Price alerts with per-rule cooldowns, and portfolio average-cost accounting with unrealised P&L.',
      'JWT authentication, with each service verifying tokens itself so users see only their own data.',
    ],
    tech: ['Java 21', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'React', 'Docker'],
    link: 'https://github.com/abhinav91a/trading-dashboard',
  },
  {
    title: 'NextLogic',
    shortName: 'NextLogic',
    period: 'Apr 2026 – Present',
    from: at(2026, 4),
    to: at(2026, 12),
    summary:
      'Distributed job intelligence platform covering scraping, enrichment, ranking and personalised alerts.',
    points: [
      'Microservices in Java 21 and Spring Boot 3.2, with Spring Cloud Gateway and Eureka service discovery.',
      'Parallel job scraping with CompletableFuture.',
      'Kafka pipeline that moves listings through scraping, enrichment, storage and ranking.',
      'Automated job expiry and personalised job alerts based on saved searches.',
    ],
    tech: ['Java 21', 'Spring Boot 3.2', 'Spring Cloud Gateway', 'Kafka', 'PostgreSQL', 'MongoDB', 'Eureka', 'Traefik', 'Docker', 'Next.js', 'TypeScript'],
  },
  {
    title: 'FlashCart',
    shortName: 'FlashCart',
    period: 'Jan 2026 – Sep 2026',
    from: at(2026, 1),
    to: at(2026, 9),
    summary: 'Real-time flash sale and inventory engine built as five Spring Boot microservices.',
    points: [
      'Redis atomic inventory operations to prevent overselling under concurrent purchases.',
      'Kafka events keep orders processing when the notification service is down.',
      'Real-time order status updates pushed to clients over WebSockets.',
      'Full nine-container stack that starts with a single Docker Compose command.',
    ],
    tech: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'PostgreSQL', 'Docker', 'React', 'TypeScript', 'WebSockets'],
    link: 'https://github.com/abhinav91a/FlashCart',
  },
];

// Chart rows: roles oldest first (dark), then projects oldest first (blue)
export const TIMELINE = [
  ...[...ROLES].reverse().map((r) => ({ label: r.shortName, start: r.from, end: r.to, color: '#0e1513' })),
  ...[...PROJECTS].reverse().map((p) => ({ label: p.shortName, start: p.from, end: p.to, color: '#0f766e' })),
];

// Items listed per area in the CV, so the counts match the CV
export const SKILL_GROUPS = [
  {
    name: 'Frameworks & languages',
    items: ['Angular', 'Angular Material', 'RxJS', 'TypeScript', 'JavaScript', 'React', 'Redux', 'Next.js', 'HTML5', 'CSS3', 'SCSS'],
  },
  {
    name: 'Backend & microservices',
    items: ['Java 21', 'Spring Boot 3.2', 'Spring Cloud Gateway', 'Eureka', 'Spring AOP', 'JPA', 'Java concurrency (CompletableFuture)'],
  },
  {
    name: 'Data & messaging',
    items: ['Apache Kafka', 'ZooKeeper', 'PostgreSQL', 'MongoDB', 'Redis', 'Flyway'],
  },
  {
    name: 'Data grids & visualisation',
    items: ['AG Grid', 'amCharts 5', 'REST APIs', 'WebSockets'],
  },
  {
    name: 'Architecture',
    items: ['Micro-frontends (Module Federation)', 'Reusable component libraries', 'Frontend design patterns', 'State management', 'Performance optimisation', 'Responsive UI'],
  },
  {
    name: 'Testing & code quality',
    items: ['Jest', 'React Testing Library', 'Playwright', 'ESLint', 'Accessibility (WCAG / ARIA)', 'Code reviews', 'Unit and component testing'],
  },
  {
    name: 'Build & CI/CD',
    items: ['Webpack', 'Vite', 'GitHub Actions', 'CI/CD', 'Docker', 'Docker Compose', 'Traefik', 'Git'],
  },
  {
    name: 'Ways of working',
    items: ['Agile / Scrum', 'Cross-functional collaboration', 'Version control with Git', 'Consistent coding standards'],
  },
  {
    name: 'Additional',
    items: ['Rush monorepos', 'GraphQL', 'Jotai'],
  },
];
