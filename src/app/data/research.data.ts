// MSc research project. Source: project write-up and repository.
export const RESEARCH = {
  title: 'Ontology Alignment with LogMapBio+',
  subtitle: "Research project",
  period: '2024 – 2025',
  problem:
    'Large biomedical ontologies (DOID, NCIT, FMA) use different vocabularies. Lexical matching misses thousands of valid concept mappings, which leaves gaps in interoperability between medical data systems.',
  solution:
    'A two-phase alignment pipeline. LogMapBio produces the initial mappings, and SBERT transformer models validate them semantically, catching mappings that string matching misses.',
  innovation:
    'A "Merged Strategy" that combines lexical and semantic approaches, outperforming either method used alone.',
  results: [
    { value: '92.48%', label: 'maximum recall' },
    { value: '826+', label: 'correct mappings recovered that lexical methods missed' },
    { value: '70%', label: 'reduction in processing time from parallel execution' },
    { value: '38 min', label: 'total runtime across 24,000+ entities' },
  ],
  tech: ['Java', 'LogMapBio', 'SBERT', 'Python', 'SPARQL', 'BioPortal API'],
  link: 'https://github.com/abhinav91a/Individual-Research-Project',
  references: [
    'Jiménez-Ruiz, E. (2025) LogMap: An Ontology Alignment and Alignment Repair System, Source code [Online]. Available at: https://github.com/ernestojimenezruiz/logmap-matcher (Accessed: 8 December 2025).',
    'Reimers, N. and Gurevych, I. (2025) Sentence-BERT (Sentence Transformers) Library, Source code [Online]. Available at: https://www.sbert.net/ (Accessed: 8 December 2025).',
    'LogMap matcher, July 2021 release (dependency). Available at: https://github.com/ernestojimenezruiz/logmap-matcher/releases/tag/logmap-matcher-july-2021',
  ],
};
