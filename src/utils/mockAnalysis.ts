export interface Candidate {
  name: string;
  email: string;
  phone: string;
  location: string;
  score: number;
  rank: number;
  skills: string[];
  experience: string;
  education: string;
  strengths: string[];
  weaknesses: string[];
}

const mockCandidates: Omit<Candidate, 'rank'>[] = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    score: 92,
    skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL", "Docker"],
    experience: "5+ years in Full Stack Development",
    education: "MS Computer Science, Stanford University",
    strengths: [
      "Strong technical architecture experience",
      "Excellent problem-solving skills",
      "Leadership experience with team of 8 developers",
      "Perfect match for required tech stack"
    ],
    weaknesses: [
      "Limited experience with machine learning",
      "No mention of DevOps practices"
    ]
  },
  {
    name: "Michael Chen",
    email: "m.chen@techmail.com",
    phone: "+1 (555) 234-5678",
    location: "Austin, TX",
    score: 88,
    skills: ["JavaScript", "React", "Python", "PostgreSQL", "Redis", "Kubernetes"],
    experience: "4 years in Software Development",
    education: "BS Computer Engineering, UT Austin",
    strengths: [
      "Strong database optimization skills",
      "Experience with microservices architecture",
      "Excellent communication skills",
      "Active open source contributor"
    ],
    weaknesses: [
      "Limited experience with TypeScript",
      "No cloud platform certifications"
    ]
  },
  {
    name: "Emily Rodriguez",
    email: "emily.r.dev@gmail.com",
    phone: "+1 (555) 345-6789",
    location: "New York, NY",
    score: 85,
    skills: ["Vue.js", "Node.js", "MongoDB", "Express", "Jest", "Git"],
    experience: "3.5 years in Frontend Development",
    education: "BS Information Systems, NYU",
    strengths: [
      "Excellent UI/UX design sense",
      "Strong testing and quality assurance",
      "Experience with agile methodologies",
      "Multilingual capabilities"
    ],
    weaknesses: [
      "Limited backend development experience",
      "No experience with cloud deployment"
    ]
  },
  {
    name: "David Kumar",
    email: "david.kumar@devpro.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    score: 82,
    skills: ["Java", "Spring Boot", "Angular", "MySQL", "Jenkins", "JIRA"],
    experience: "6 years in Enterprise Development",
    education: "MS Software Engineering, University of Washington",
    strengths: [
      "Extensive enterprise software experience",
      "Strong knowledge of software architecture",
      "Experience with large-scale systems",
      "Excellent documentation skills"
    ],
    weaknesses: [
      "Limited experience with modern JavaScript frameworks",
      "No experience with containerization technologies"
    ]
  },
  {
    name: "Jessica Thompson",
    email: "j.thompson@codemail.io",
    phone: "+1 (555) 567-8901",
    location: "Denver, CO",
    score: 79,
    skills: ["React", "Node.js", "Python", "Docker", "AWS Lambda", "GraphQL"],
    experience: "2.5 years in Full Stack Development",
    education: "BS Computer Science, Colorado State University",
    strengths: [
      "Quick learner with new technologies",
      "Strong problem-solving abilities",
      "Experience with serverless architecture",
      "Good understanding of security practices"
    ],
    weaknesses: [
      "Relatively junior experience level",
      "Limited experience with database optimization"
    ]
  },
  {
    name: "Robert Wilson",
    email: "rob.wilson@techdev.org",
    phone: "+1 (555) 678-9012",
    location: "Chicago, IL",
    score: 75,
    skills: ["PHP", "Laravel", "MySQL", "HTML/CSS", "jQuery", "Git"],
    experience: "4 years in Web Development",
    education: "AS Computer Programming, Community College of Chicago",
    strengths: [
      "Solid web development fundamentals",
      "Experience with content management systems",
      "Good client communication skills",
      "Reliable and consistent work quality"
    ],
    weaknesses: [
      "Limited modern framework experience",
      "No experience with cloud platforms"
    ]
  },
  {
    name: "Amanda Foster",
    email: "amanda.foster@innovate.com",
    phone: "+1 (555) 789-0123",
    location: "Boston, MA",
    score: 71,
    skills: ["C#", ".NET", "SQL Server", "Azure", "Entity Framework", "WPF"],
    experience: "3 years in .NET Development",
    education: "BS Information Technology, MIT",
    strengths: [
      "Strong Microsoft technology stack knowledge",
      "Experience with enterprise applications",
      "Good analytical and debugging skills",
      "Familiarity with cloud services"
    ],
    weaknesses: [
      "Limited experience with web technologies",
      "No experience with modern JavaScript frameworks"
    ]
  },
  {
    name: "James Martinez",
    email: "j.martinez@webdev.net",
    phone: "+1 (555) 890-1234",
    location: "Miami, FL",
    score: 68,
    skills: ["WordPress", "PHP", "HTML/CSS", "JavaScript", "MySQL", "Photoshop"],
    experience: "2 years in Web Development",
    education: "Certificate in Web Development, Miami-Dade College",
    strengths: [
      "Strong front-end design skills",
      "Experience with content management",
      "Good understanding of SEO practices",
      "Bilingual English/Spanish"
    ],
    weaknesses: [
      "Limited programming experience",
      "No experience with modern development frameworks"
    ]
  }
];

export const simulateAnalysis = (
  jobDescription: File[],
  resumes: File[]
): Promise<Candidate[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Shuffle and take as many candidates as resumes uploaded
      const shuffled = [...mockCandidates]
        .sort(() => Math.random() - 0.5)
        .slice(0, resumes.length)
        .sort((a, b) => b.score - a.score)
        .map((candidate, index) => ({
          ...candidate,
          rank: index + 1
        }));
      
      resolve(shuffled);
    }, 3000);
  });
};