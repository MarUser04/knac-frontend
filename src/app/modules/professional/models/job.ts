export interface Job {
  company?: any;
  created?: string;
  _id?: string;
  title?: string;
  location?: string;
  description?: string;
  perks?: string;
  image?: string | File;
  user?: string;
  isApplied?: boolean;
}
