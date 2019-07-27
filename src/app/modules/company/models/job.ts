export interface Job {
  created?: string;
  _id?: string;
  title?: string;
  location?: string;
  description?: string;
  perks?: string;
  image?: string | File;
  user?: string;
  type?: string;
  track?: any;
}
