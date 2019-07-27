export interface Blog {
  author?: number;
  categories?: any[];
  comment_status?: string;
  content?: any;
  date?: string;
  date_gmt?: string;
  excerpt?: Object;
  featured_media?: number;
  format?: string;
  guid?: Object;
  id?: number;
  link?: string;
  meta?: any[];
  modified?: string;
  modified_gmt?: string;
  ping_status?: string;
  slug?: string;
  status?: string;
  sticky?: boolean;
  tags?: any[];
  template?: string;
  title?: any;
  type?: string;
  _embedded?: any;
  image?: string;
  writer?: string;
}
