export interface Company {
  email?: string;
  photos?: Array<string |File>;
  videos?: Array<string | File>;
  name?: string;
  logo?: string | File;
  phone?: string;
  contactName?: string;
  description?: string;
  facebook?: string;
  founded?: string;
  industry?: string;
  locations?: string;
  numberOfEmployees?: number;
  twitter?: string;
  pending?: boolean;
  hasSetupPassword?: boolean;
  hasLoadedProfile?: boolean;
}
