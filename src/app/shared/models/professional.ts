import { Track } from "@app/shared/models/track";

export interface Professional {
  name?: string;
  lastName?: string;
  websiteUrl?: string;
  description?: string;
  profilePicture?: File | string;
  user?: string;
  track?: Track;
}
