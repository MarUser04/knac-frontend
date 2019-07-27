export interface Assessment {
  name?: string;
  durationInMinutes?: number;
  question?: string;
  isFile?: boolean;
  created?: string;
  _id?: string;
  track?: any;
  type?: string;
  template?: string;
  templates?: string;
  pending?: any;
  isCompleted?: boolean;
  expiration?: string;
  answers?: number;
  assessment?: any;
  submission?: any;
}
