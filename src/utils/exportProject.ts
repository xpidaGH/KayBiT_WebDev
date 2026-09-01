import JSZip from 'jszip';
import sdk, { Project } from '@stackblitz/sdk';
import { TeachingMetadata, TemplateId } from '../types/templates';

// Load raw template files via Vite raw import
const rawWebsites = import.meta.glob<string>('../templates/websites/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const rawWebapps = import.meta.glob<string>('../templates/webapps/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export interface ExportFileEntry {
  path: string;
  content: string;
  description: string;
  isBinary?: boolean;
}

export interface GeneratedExportBundle {
  filename: string;
  files: ExportFileEntry[];
  generateZipBlob: () => Promise<Blob>;
}

// Map template ID to the raw component file path
const TEMPLATE_RAW_FILE_MAP: Record<TemplateId, string> = {
  'blog-content': '../templates/websites/BlogContentTemplate.tsx',
  'ecommerce': '../templates/websites/EcommerceTemplate.tsx',
  'portfolio': '../templates/websites/PortfolioTemplate.tsx',
  'corporate-business': '../templates/websites/CorporateBusinessTemplate.tsx',
  'landing-page': '../templates/websites/LandingPageTemplate.tsx',
  'educational-wiki': '../templates/websites/EducationalWikiTemplate.tsx',
  'saas': '../templates/webapps/SaasDashboardTemplate.tsx',
  'social-media': '../templates/webapps/SocialMediaTemplate.tsx',
  'portal': '../templates/webapps/PortalTemplate.tsx',
  'project-management': '../templates/webapps/ProjectManagementTemplate.tsx',
  'elearning': '../templates/webapps/ElearningPlatformTemplate.tsx',
};

const TEMPLATE_COMPONENT_NAME_MAP: Record<TemplateId, string> = {
  'blog-content': 'BlogContentTemplate',
  'ecommerce': 'EcommerceTemplate',
  'portfolio': 'PortfolioTemplate',
  'corporate-business': 'CorporateBusinessTemplate',
  'landing-page': 'LandingPageTemplate',
  'educational-wiki': 'EducationalWikiTemplate',
  'saas': 'SaasDashboardTemplate',
  'social-media': 'SocialMediaTemplate',
  'portal': 'PortalTemplate',
  'project-management': 'ProjectManagementTemplate',
  'elearning': 'ElearningPlatformTemplate',
};

export function generateSetupScript(
  template: TeachingMetadata,
  pkgMgr: PackageManager = 'npm'
): string {
  const installCmd =
    pkgMgr === 'npm'
      ? 'npm install'
      : pkgMgr === 'pnpm'
      ? 'pnpm install'
      : pkgMgr === 'yarn'
      ? 'yarn install'
      : 'bun install';

  const devCmd =
    pkgMgr === 'npm'
      ? 'npm run dev'
      : pkgMgr === 'pnpm'
      ? 'pnpm run dev'
      : pkgMgr === 'yarn'
      ? 'yarn dev'
      : 'bun run dev';

  const lintCmd =
    pkgMgr === 'npm'
      ? 'npm run lint'
      : pkgMgr === 'pnpm'
      ? 'pnpm run lint'
      : pkgMgr === 'yarn'
      ? 'yarn lint'
      : 'bun run lint';

  return `#!/usr/bin/env bash
# ==============================================================================
# WebDev Archetype Lab - Student Project Setup Script
# Template: ${template.title}
# Archetype: ${template.category.toUpperCase()} | Render Pattern: ${template.renderPattern}
# Difficulty: ${template.difficulty}
# ==============================================================================

set -e

# Terminal Colors
BOLD="\\033[1m"
GREEN="\\033[0;32m"
BLUE="\\033[0;34m"
CYAN="\\033[0;36m"
YELLOW="\\033[1;33m"
RED="\\033[0;31m"
MAGENTA="\\033[0;35m"
RESET="\\033[0m"

echo -e "\${CYAN}\${BOLD}"
echo "================================================================================"
echo " 🎓 WebDev Archetype Lab: ${template.title}"
echo "    Archetype: ${template.category.toUpperCase()} | Rendering: ${template.renderPattern}"
echo "    Difficulty: ${template.difficulty}"
echo "================================================================================"
echo -e "\${RESET}"

# Step 1: Check Node.js Version
echo -e "\${BLUE}▶ [1/4] Checking Node.js runtime environment...\${RESET}"
if ! command -v node &> /dev/null; then
    echo -e "\${RED}✘ Error: Node.js is not installed!\${RESET}"
    echo "Please download and install Node.js (v18.0.0 or higher) from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "\${GREEN}✔ Detected Node.js version: \${NODE_VERSION}\${RESET}"

# Step 2: Validate Package Manager
echo -e "\n\${BLUE}▶ [2/4] Verifying package manager (${pkgMgr})...\${RESET}"
PKG_MGR="${pkgMgr}"

if ! command -v $PKG_MGR &> /dev/null; then
    echo -e "\${YELLOW}! Warning: '$PKG_MGR' is not installed on this machine.\${RESET}"
    echo -e "\${YELLOW}  Falling back to standard 'npm'.\${RESET}"
    PKG_MGR="npm"
fi

echo -e "\${GREEN}✔ Active package manager: \${PKG_MGR}\${RESET}"

# Step 3: Install Dependencies
echo -e "\n\${BLUE}▶ [3/4] Installing project dependencies...\${RESET}"
echo -e "\${MAGENTA}Running: ${installCmd}\${RESET}"
${installCmd}
echo -e "\${GREEN}✔ Dependencies installed successfully!\${RESET}"

# Step 4: Validate TypeScript Build & Types
echo -e "\n\${BLUE}▶ [4/4] Validating TypeScript compiler...\${RESET}"
echo -e "\${MAGENTA}Running: ${lintCmd}\${RESET}"
${lintCmd} || echo -e "\${YELLOW}! Note: TypeScript check completed with warnings.\${RESET}"

echo -e "\n\${GREEN}\${BOLD}================================================================================\${RESET}"
echo -e "\${GREEN}\${BOLD} 🎉 Setup Complete! The project is ready for local experimentation.\${RESET}"
echo -e "\${GREEN}\${BOLD}================================================================================\${RESET}"
echo -e "\nTo start your local development server at any time, run:"
echo -e "  \${CYAN}\${BOLD}${devCmd}\${RESET}\n"
echo -e "Then open \${BOLD}http://localhost:3000\${RESET} in your browser to view your live archetype.\n"

# Prompt to launch immediately if interactive
if [ -t 0 ]; then
  read -p "Would you like to start the development server now? [Y/n]: " -n 1 -r
  echo
  if [[ \$REPLY =~ ^[Yy]$ ]] || [[ -z \$REPLY ]]; then
      echo -e "\n\${CYAN}Starting dev server with ${devCmd}...\${RESET}\n"
      ${devCmd}
  fi
fi
`;
}

export function generatePackageJson(template: TeachingMetadata): string {
  const cleanId = template.id.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  return JSON.stringify(
    {
      name: `webdev-archetype-${cleanId}`,
      private: true,
      version: '1.0.0',
      description: `${template.title} - Web Development Archetype & Teaching Reference`,
      type: 'module',
      scripts: {
        dev: 'vite --port=3000 --host=0.0.0.0',
        build: 'tsc && vite build',
        preview: 'vite preview',
        lint: 'tsc --noEmit',
      },
      dependencies: {
        react: '^19.0.1',
        'react-dom': '^19.0.1',
        'lucide-react': '^0.546.0',
        motion: '^12.23.24',
      },
      devDependencies: {
        '@types/node': '^22.14.0',
        '@types/react': '^19.0.10',
        '@types/react-dom': '^19.0.4',
        '@vitejs/plugin-react': '^5.0.4',
        '@tailwindcss/vite': '^4.1.14',
        tailwindcss: '^4.1.14',
        typescript: '~5.8.2',
        vite: '^6.2.3',
      },
    },
    null,
    2
  );
}

export function generateViteConfig(): string {
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
});
`;
}

export function generateTsConfig(): string {
  return JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: false,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: false,
        noUnusedParameters: false,
        noFallthroughCasesInSwitch: true,
      },
      include: ['src'],
    },
    null,
    2
  );
}

export function generateIndexHtml(template: TeachingMetadata): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${template.title} | WebDev Archetype Lab</title>
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased min-h-screen selection:bg-indigo-500 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

export function generateIndexCss(): string {
  return `@import "tailwindcss";

@layer base {
  body {
    @apply antialiased text-slate-100 bg-slate-950;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
}

/* Custom clean scrollbars */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #090d16;
}
::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
`;
}

export function generateMainTsx(): string {
  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
}

export function generateStandaloneAppTsx(template: TeachingMetadata): string {
  const componentName = TEMPLATE_COMPONENT_NAME_MAP[template.id] || 'TemplateView';
  return `import React, { useState } from 'react';
import { ${componentName} } from './components/${componentName}';
import { Sparkles, Terminal, BookOpen, Layers, Shield, HelpCircle, ExternalLink } from 'lucide-react';

export default function App() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Student Archetype Header Banner */}
      {showBanner && (
        <header className="bg-slate-900/90 border-b border-indigo-500/20 backdrop-blur-md px-4 py-3 sticky top-0 z-50 text-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0 shadow-sm shadow-indigo-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">${template.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-500/30 text-indigo-300 font-mono text-[10px] font-semibold uppercase">
                    ${template.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
                    ${template.renderPattern}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] hidden sm:block">
                  Student Local Sandbox • Edit <code className="text-indigo-300 bg-slate-800 px-1 rounded">/src/components/${componentName}.tsx</code> to complete exercises.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
                Difficulty: <strong className="text-white">${template.difficulty}</strong>
              </span>
              <button
                onClick={() => setShowBanner(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition text-[11px]"
              >
                Hide Banner
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Interactive Archetype Component */}
      <main className="flex-1 flex flex-col">
        <${componentName} />
      </main>
    </div>
  );
}
`;
}

export function generateReadme(template: TeachingMetadata): string {
  return `# 🎓 ${template.title} — WebDev Archetype Lab

> **Archetype Category:** ${template.category.toUpperCase()}  
> **Rendering Pattern:** ${template.renderPattern}  
> **Difficulty Level:** ${template.difficulty}  
> **State Architecture:** ${template.stateArchitecture}

---

## 📖 Pedagogical Summary

${template.summary}

**Tagline:** *${template.tagline}*

---

## ⚡ Quick Start (Local Setup)

### Automated Setup (Recommended)
Make \`setup.sh\` executable and run it:
\`\`\`bash
chmod +x setup.sh
./setup.sh
\`\`\`

### Manual Setup
\`\`\`bash
# 1. Install dependencies
npm install

# 2. Start local Vite development server
npm run dev

# 3. Open in browser
http://localhost:3000
\`\`\`

---

## 🏛️ Architecture Layers

| Layer | Technology | Responsibility |
| :--- | :--- | :--- |
${template.architectureLayers
  .map((layer) => `| **${layer.layer}** | \`${layer.technology}\` | ${layer.responsibility} |`)
  .join('\n')}

---

## 💡 Core Engineering Challenges

${template.coreEngineeringChallenges.map((ch, i) => `${i + 1}. **${ch}**`).join('\n')}

---

## 🛡️ Security Considerations & Mitigations

${template.securityConsiderations
  .map(
    (sec, i) =>
      `### ${i + 1}. Threat: ${sec.threat}\n**Mitigation Strategy:** ${sec.mitigation}\n`
  )
  .join('\n')}

---

## 🧪 Student Learning Exercises

${template.studentExercises
  .map(
    (ex, i) =>
      `### Exercise ${i + 1} [${ex.level}]: ${ex.title}\n**Challenge Prompt:**\n${ex.prompt}\n`
  )
  .join('\n')}

---

## 📂 Project Structure

\`\`\`text
├── index.html                  # HTML entry point
├── package.json                # Project scripts & dependencies
├── setup.sh                    # Automated shell setup & runtime check
├── tsconfig.json               # TypeScript compiler config
├── vite.config.ts              # Vite & Tailwind CSS plugins
├── README.md                   # Archetype curriculum & exercise documentation
└── src/
    ├── App.tsx                 # Archetype sandbox frame
    ├── main.tsx                # React DOM mount point
    ├── index.css               # Tailwind CSS v4 styling rules
    └── components/
        └── ${TEMPLATE_COMPONENT_NAME_MAP[template.id] || 'TemplateView'}.tsx   # Primary interactive template
\`\`\`

---
*Generated by WebDev Archetype Lab • Teaching Reference Curriculum*
`;
}

export function generateGitignore(): string {
  return `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`;
}

/**
 * Resolves the raw source code of the active template component
 */
export function getRawTemplateSource(templateId: TemplateId): string {
  const filePath = TEMPLATE_RAW_FILE_MAP[templateId];
  if (filePath && rawWebsites[filePath]) {
    return rawWebsites[filePath];
  }
  if (filePath && rawWebapps[filePath]) {
    return rawWebapps[filePath];
  }

  // Fallback if not loaded
  return `// ${templateId} source code\nimport React from 'react';\n\nexport function TemplateView() {\n  return <div className="p-8 text-center">Template component</div>;\n}\n`;
}

/**
 * Creates the complete export bundle object with all files and ZIP generator
 */
export function createExportBundle(
  template: TeachingMetadata,
  pkgMgr: PackageManager = 'npm'
): GeneratedExportBundle {
  const componentName = TEMPLATE_COMPONENT_NAME_MAP[template.id] || 'TemplateView';
  const rawComponentSource = getRawTemplateSource(template.id);
  const cleanId = template.id.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
  const zipFilename = `webdev-archetype-${cleanId}.zip`;

  const files: ExportFileEntry[] = [
    {
      path: 'setup.sh',
      content: generateSetupScript(template, pkgMgr),
      description: 'Automated bash build script with Node runtime check & dependency installer',
    },
    {
      path: 'package.json',
      content: generatePackageJson(template),
      description: 'Project manifest with Vite, React 19, TypeScript, and Tailwind CSS',
    },
    {
      path: 'vite.config.ts',
      content: generateViteConfig(),
      description: 'Vite build configuration with React and Tailwind v4 plugins',
    },
    {
      path: 'tsconfig.json',
      content: generateTsConfig(),
      description: 'TypeScript compiler configuration with modern bundler resolution',
    },
    {
      path: 'index.html',
      content: generateIndexHtml(template),
      description: 'HTML5 entry point with responsive viewport and title',
    },
    {
      path: 'README.md',
      content: generateReadme(template),
      description: 'Archetype documentation, architecture layers, security mitigations, and exercises',
    },
    {
      path: '.gitignore',
      content: generateGitignore(),
      description: 'Git ignore rules for node_modules and build artifacts',
    },
    {
      path: 'src/main.tsx',
      content: generateMainTsx(),
      description: 'React DOM root bootstrap',
    },
    {
      path: 'src/index.css',
      content: generateIndexCss(),
      description: 'Tailwind CSS v4 stylesheet and custom scrollbar theme',
    },
    {
      path: 'src/App.tsx',
      content: generateStandaloneAppTsx(template),
      description: 'Standalone sandbox wrapper with student info header banner',
    },
    {
      path: `src/components/${componentName}.tsx`,
      content: rawComponentSource,
      description: `Complete interactive ${template.title} source code`,
    },
  ];

  const generateZipBlob = async (): Promise<Blob> => {
    const zip = new JSZip();

    // The root folder inside the ZIP (e.g. webdev-archetype-blog-content/)
    const rootFolder = zip.folder(`webdev-archetype-${cleanId}`) || zip;

    for (const file of files) {
      rootFolder.file(file.path, file.content);
    }

    return await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9,
      },
    });
  };

  return {
    filename: zipFilename,
    files,
    generateZipBlob,
  };
}

/**
 * Triggers the browser download of the generated zip blob
 */
export async function downloadExportBundle(
  template: TeachingMetadata,
  pkgMgr: PackageManager = 'npm'
): Promise<string> {
  const bundle = createExportBundle(template, pkgMgr);
  const blob = await bundle.generateZipBlob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = bundle.filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  return bundle.filename;
}

/**
 * Builds the StackBlitz Project payload using the bundle's file manifest
 */
export function getStackBlitzProject(template: TeachingMetadata): Project {
  const bundle = createExportBundle(template, 'npm');
  const files: Record<string, string> = {};

  for (const file of bundle.files) {
    files[file.path] = file.content;
  }

  return {
    title: `${template.title} | WebDev Archetype Lab`,
    description: `${template.summary.slice(0, 180)}... [${template.category.toUpperCase()} Archetype]`,
    template: 'node',
    files,
  };
}

/**
 * Opens the current scaffold in StackBlitz WebContainer IDE in a new tab
 */
export function openInStackBlitz(template: TeachingMetadata) {
  const project = getStackBlitzProject(template);
  const componentName = TEMPLATE_COMPONENT_NAME_MAP[template.id] || 'TemplateView';
  
  sdk.openProject(project, {
    newWindow: true,
    openFile: `src/components/${componentName}.tsx`,
  });
}

