export interface PreviewView {
  label: string;
  url: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  alt?: string;
  description?: string;
}

export interface ProductPreview {
  slug: string;
  name: string;
  status: string;
  summary: string;
  mode: 'live' | 'walkthrough';
  views: PreviewView[];
}

export const productPreviews: ProductPreview[] = [
  {
    slug: 'hunt',
    name: 'HUNT',
    status: 'Early access',
    summary: 'AI personas for invoice follow-ups. A workspace for the balance, the conversation, and the human decision.',
    mode: 'live',
    views: [
      { label: 'Website', url: 'https://www.gogethunt.com/' },
      { label: 'Interactive demo', url: 'https://demo.gogethunt.com/dashboard/personas' },
    ],
  },
  {
    slug: 'staffly',
    name: 'Staffly',
    status: 'Live MVP',
    summary: 'AI-assisted staffing, led by people. From a request to reviewed offers, shifts, hours, and clear next steps.',
    mode: 'walkthrough',
    views: [
      {
        label: 'The website',
        url: 'https://staffly-navy-psi.vercel.app/',
        image: '/previews/staffly/staffly-home.webp',
        imageWidth: 1280,
        imageHeight: 720,
        alt: 'Staffly public website with its blue identity and people-first staffing introduction.',
        description: 'A multilingual introduction to staffing for Stockholm’s warehouse and logistics teams.',
      },
      {
        label: 'The workspace',
        url: 'https://staffly-navy-psi.vercel.app/demo',
        image: '/previews/staffly/staffly-workspace.webp',
        imageWidth: 1280,
        imageHeight: 800,
        alt: 'Staffly demo workspace showing fictional staffing requests and operational activity.',
        description: 'Requests, reviewed offers, shifts, and hours in one workspace. This view uses fictional demo data.',
      },
      {
        label: 'Meet Matly',
        url: 'https://staffly-navy-psi.vercel.app/demo?tab=assistant',
        image: '/previews/staffly/staffly-matly.webp',
        imageWidth: 1440,
        imageHeight: 1000,
        alt: 'Matly assistant in the Staffly demo, preparing a draft for human review.',
        description: 'Azure-powered assistance turns a conversation into an editable draft. People review the next step.',
      },
    ],
  },
  {
    slug: 'chakra47',
    name: 'Chakra47',
    status: 'In development',
    summary: 'Apps for the physical world. An application and management layer with capabilities, permissions, and control kept local.',
    mode: 'live',
    views: [
      { label: 'Website', url: 'https://www.chakra47.com/' },
      { label: 'Architecture', url: 'https://www.chakra47.com/#architecture' },
      { label: 'Roadmap', url: 'https://www.chakra47.com/#roadmap' },
    ],
  },
];
