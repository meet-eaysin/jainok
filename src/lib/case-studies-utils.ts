import fs from "fs";
import matter from "gray-matter";
import path from "path";

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  results: string[];
  image?: string;
  featured?: boolean;
  slug: string;
  content: string;
}

const caseStudiesDirectory = path.join(process.cwd(), "src/data/case-studies");

export function getAllCaseStudies(): CaseStudy[] {
  // Check if case studies directory exists
  if (!fs.existsSync(caseStudiesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(caseStudiesDirectory);
  const allCaseStudiesData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(caseStudiesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: slug,
        slug,
        title: data.title || "",
        company: data.company || "",
        duration: data.duration || "",
        description: data.description || "",
        challenge: data.challenge || "",
        solution: data.solution || "",
        technologies: Array.isArray(data.technologies) ? data.technologies : [],
        results: Array.isArray(data.results) ? data.results : [],
        image: data.image || "",
        featured: data.featured || false,
        content: content || "",
      } as CaseStudy;
    });

  // Sort case studies by featured status (featured first), then by title
  return allCaseStudiesData.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.title.localeCompare(b.title);
  });
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const caseStudies = getAllCaseStudies();
  return caseStudies.find((study) => study.slug === slug) || null;
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  const caseStudies = getAllCaseStudies();
  return caseStudies.filter((study) => study.featured);
}
