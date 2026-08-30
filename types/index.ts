export type PublicationStatus = "draft" | "published" | "hidden" | "archived";

export type ExperienceType = "work" | "internship" | "organization" | "volunteer" | "education" | "freelance" | "other";

export type SkillLevel = "beginner" | "elementary" | "intermediate" | "advanced" | "expert";

// ===================== PROFILE =====================
export interface Profile {
  id: string;
  full_name: string | null;
  headline: string | null;
  university: string | null;
  major: string | null;
  student_status: string | null;
  location: string | null;
  gpa: number | null;
  gpa_scale: number | null;
  show_gpa: boolean;
  short_bio: string | null;
  detailed_bio: string | null;
  availability_status: string | null;
  profile_photo_url: string | null;
  hero_photo_url: string | null;
  cv_url: string | null;
  created_at: string;
  updated_at: string;
}

// ===================== HERO =====================
export interface Hero {
  id: string;
  eyebrow_text: string | null;
  full_name: string | null;
  headline: string | null;
  subheadline: string | null;
  short_intro: string | null;
  university: string | null;
  major: string | null;
  gpa: number | null;
  show_gpa: boolean;
  availability: string | null;
  hero_photo_url: string | null;
  primary_cta_text: string | null;
  primary_cta_url: string | null;
  secondary_cta_text: string | null;
  secondary_cta_url: string | null;
  show_download_cv: boolean;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

// ===================== ABOUT =====================
export interface About {
  id: string;
  section_label: string | null;
  section_title: string | null;
  description: string | null;
  photo_url: string | null;
  additional_info: string | null;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ===================== SKILL CATEGORIES =====================
export interface SkillCategory {
  id: string;
  name: string;
  description: string | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

// ===================== SKILLS =====================
export interface Skill {
  id: string;
  name: string;
  category_id: string | null;
  icon: string | null;
  description: string | null;
  level: SkillLevel | null;
  sort_order: number;
  status: PublicationStatus;
  created_at: string;
  updated_at: string;
  category?: SkillCategory;
}

// ===================== PROJECTS =====================
export interface Project {
  id: string;
  name: string;
  slug: string;
  short_summary: string | null;
  full_description: string | null;
  background: string | null;
  problem: string | null;
  solution: string | null;
  my_role: string | null;
  category: string | null;
  project_status: string | null;
  start_date: string | null;
  end_date: string | null;
  key_features: string[];
  challenges: string | null;
  outcome: string | null;
  demo_url: string | null;
  repo_url: string | null;
  thumbnail_url: string | null;
  is_featured: boolean;
  status: PublicationStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  technologies?: ProjectTechnology[];
  images?: ProjectImage[];
}

export interface ProjectTechnology {
  id: string;
  project_id: string;
  name: string;
  sort_order: number;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string | null;
  caption: string | null;
  sort_order: number;
}

export type ProjectInput = Omit<Partial<Project>, "technologies"> & {
  technologies?: string[];
};

// ===================== EXPERIENCES =====================
export interface Experience {
  id: string;
  position: string;
  organization: string;
  type: ExperienceType;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  short_description: string | null;
  achievements: string[];
  related_tech: string[];
  logo_url: string | null;
  main_photo_url: string | null;
  org_url: string | null;
  status: PublicationStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  responsibilities?: ExperienceResponsibility[];
  images?: ExperienceImage[];
}

export interface ExperienceResponsibility {
  id: string;
  experience_id: string;
  text: string;
  sort_order: number;
}

export interface ExperienceImage {
  id: string;
  experience_id: string;
  image_url: string;
  alt_text: string | null;
  caption: string | null;
  sort_order: number;
}

export type ExperienceInput = Omit<Partial<Experience>, "responsibilities"> & {
  responsibilities?: string[];
};

// ===================== CERTIFICATES =====================
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  credential_id: string | null;
  show_credential_id: boolean;
  issue_date: string | null;
  expiration_date: string | null;
  does_not_expire: boolean;
  description: string | null;
  related_skills: string[];
  credential_url: string | null;
  thumbnail_url: string | null;
  image_url: string | null;
  pdf_url: string | null;
  allow_download: boolean;
  status: PublicationStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ===================== CONTACTS =====================
export interface Contact {
  id: string;
  platform: string;
  display_label: string;
  value: string;
  url: string | null;
  icon: string | null;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ===================== MEDIA =====================
export interface Media {
  id: string;
  filename: string;
  original_filename: string;
  storage_path: string;
  public_url: string | null;
  mime_type: string;
  file_size: number;
  alt_text: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  created_at: string;
  updated_at: string;
}

// ===================== SITE SETTINGS =====================
export interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  site_title: string;
  site_description: string;
  seo_description: string;
  seo_image_url: string;
  favicon_url: string;
  copyright_text: string;
  show_cv_button: boolean;
  contact_section_enabled: boolean;
  maintenance_mode: boolean;
  social_preview_url: string;
}

// ===================== DASHBOARD STATS =====================
export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalExperiences: number;
  totalSkills: number;
  totalCertificates: number;
  totalMedia: number;
  lastUpdated: string | null;
}
