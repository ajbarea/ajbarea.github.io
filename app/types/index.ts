// Contact Information
export interface ContactInfo {
  email: string
  phone: string
  location?: string
  github: string
  linkedin?: string
  youtube: string
}

// Social Links
export interface SocialLink {
  platform: 'github' | 'linkedin' | 'youtube' | 'email' | 'twitter'
  url: string
  icon: string
  label: string
}

// Profile
export interface Profile {
  name: string
  pronouns?: string
  title: string
  roles: string[] // For typewriter animation
  summary: string
  profileImage: string
  contact: ContactInfo
  socialLinks: SocialLink[]
  researchInterests?: string[]
}

// Education
export interface Education {
  degree: string
  field: string
  institution: string
  location: string
  graduationDate: string
  gpa: number
  maxGpa: number
  relevantCoursework?: string[]
  capstoneResearch?: {
    title: string
    advisor: string
    focus: string[]
  }
}

// Professional Experience
export interface ProfessionalExperience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | 'Present'
  type: 'full-time' | 'contract' | 'internship'
  department?: string
  bullets: string[]
  isCurrent: boolean
}

// Research Experience
export interface ResearchExperience {
  id: string
  title: string
  institution: string
  advisor?: string
  project?: string
  startDate: string
  endDate: string | 'Present'
  bullets: string[]
  isCurrent: boolean
}

// Teaching Experience
export interface TeachingExperience {
  id: string
  title: string
  course: string
  institution: string
  startDate: string
  endDate: string
  bullets: string[]
}

// Honor or Award
export interface HonorAward {
  title: string
  year: number
  documentUrl?: string
}

// Publication
export interface Publication {
  id: string
  authors: string[]
  title: string
  venue: string
  year: number
  status: 'published' | 'under-review' | 'accepted'
  doi?: string
  url?: string
}

// Presentation
export interface Presentation {
  id: string
  title: string
  venue: string
  date: string
  type: 'talk' | 'tutorial' | 'poster'
  url?: string
}

// Skill
export interface Skill {
  name: string
  category: 'languages' | 'cloud-devops' | 'ai-ml' | 'tools'
  icon?: string
  docUrl?: string
}

// Skill Category for display
export interface SkillCategory {
  id: string
  label: string
  skills: Skill[]
}

// Project
export type ProjectType = 'ai-ml' | 'full-stack' | 'robotics' | 'cloud'

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  types: ProjectType[]
  thumbnailUrl?: string
  demoUrl?: string
  githubUrl?: string
  youtubeUrl?: string
  featured?: boolean
}

// Timeline Entry (union type for home page)
export type TimelineEntryType = 'education' | 'professional' | 'research' | 'teaching' | 'award'

export interface TimelineEntry {
  id: string
  type: TimelineEntryType
  title: string
  subtitle: string
  organization: string
  timeframe: string
  description: string
  skills?: string[]
  icon: string
  isCurrent: boolean
  sortDate: string // ISO date for sorting
}

// Gallery Image
export interface GalleryImage {
  id: string
  cloudinaryId: string
  width: number
  height: number
  alt: string
  caption?: string
  location?: string
}

// Blog Article
export interface Article {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string // Raw markdown
  readingTime: number // minutes
  tags?: string[]
  coverImage?: string
}

// Resume View Mode
export type ResumeViewMode = 'industry' | 'research'

// Theme
export type Theme = 'light' | 'dark' | 'system'
