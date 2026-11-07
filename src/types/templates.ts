export type TemplateCategory = 'website' | 'webapp';

export type TemplateId =
  | 'blog-content'
  | 'ecommerce'
  | 'portfolio'
  | 'corporate-business'
  | 'landing-page'
  | 'educational-wiki'
  | 'saas'
  | 'social-media'
  | 'portal'
  | 'project-management'
  | 'elearning';

export interface ArchitectureLayer {
  layer: string;
  technology: string;
  responsibility: string;
}

export interface SecurityConsideration {
  threat: string;
  mitigation: string;
}

export interface TeachingMetadata {
  id: TemplateId;
  title: string;
  category: TemplateCategory;
  tagline: string;
  summary: string;
  difficulty: 'Intermediate' | 'Intermediate-Advanced' | 'Advanced';
  renderPattern: 'SSR / SSG' | 'CSR (SPA)' | 'Hybrid (ISR / RSC)' | 'PWA / Edge';
  stateArchitecture: string;
  keyConcepts: string[];
  techStack: string[];
  coreEngineeringChallenges: string[];
  securityConsiderations: SecurityConsideration[];
  architectureLayers: ArchitectureLayer[];
  studentExercises: {
    title: string;
    level: 'Warmup' | 'Core Challenge' | 'Advanced / Capstone';
    prompt: string;
  }[];
  codeSnippet: string;
  tags: string[];
}
