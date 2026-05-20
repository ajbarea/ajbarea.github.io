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
  profileImage: string
  contact: ContactInfo
  socialLinks: SocialLink[]
}

// Education
export interface Education {
  degree: string
  field: string
  institution: string
  location: string
  graduationDate: string
  gpa?: number
  maxGpa?: number
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
  documentUrl?: string // Local download
  externalUrl?: string // External link
}

// Publication
export interface Publication {
  id: string
  authors: string[]
  venue: string
  year: number
  status: 'published' | 'under-review' | 'accepted'
  doi?: string
  url?: string
  keywords?: string[]
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
export type ProjectType = 'ai-ml' | 'federated-learning' | 'full-stack' | 'robotics'

export interface Project {
  id: string
  title: string
  technologies: string[]
  types: ProjectType[]
  thumbnailUrl?: string
  demoUrl?: string
  docsUrl?: string
  githubUrl?: string
  youtubeUrl?: string
  featured?: boolean
}

// Activity Highlight (curated entry for home page section)
export interface ActivityHighlight {
  id: string
  kind: 'publication' | 'hackathon' | 'conference'
  title: string
  meta: string
  description: string
  result?: string
  url?: string
}

// Conference (presented work)
export interface Conference {
  id: string
  name: string
  fullName?: string
  venue: string
  date: string
  format: 'poster' | 'oral' | 'workshop-paper' | 'talk' | 'demo'
  posterNumber?: string
  writeupUrl?: string
  posterUrl?: string
  eventUrl?: string
}

// Workshop (attended training, research talks, etc.)
export interface Workshop {
  id: string
  name: string
  organizer: string
  date: string
  format: 'in-person' | 'virtual' | 'hybrid'
  kind: 'training' | 'workshop' | 'research-talk'
  topic: string
  facilitator?: string
  url?: string
}

// Hackathon
export interface Hackathon {
  id: string
  name: string
  organizer: string
  date: string // e.g. "Feb 2026"
  durationHours?: number
  type: 'solo' | 'team'
  technologies: string[]
  links: {
    event?: string
    repo?: string
    demo?: string
    docs?: string
    linkedin?: string
    video?: string
  }
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
  isIncoming?: boolean
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

// Resume View Mode
export type ResumeViewMode = 'industry' | 'research'

// Theme
export type Theme = 'light' | 'dark' | 'system'
