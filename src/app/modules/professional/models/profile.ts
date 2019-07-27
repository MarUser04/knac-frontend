import { Track } from '@app/shared/models/track';
import { Skill } from '@app/modules/professional/models/skill';

export interface Profile {
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  websiteUrl?: string;
  description?: string;
  profilePicture?: File | string;
  resume?: File | string;
  track?: Track;
  pending?: boolean;
  skills?: Skill[];
}
