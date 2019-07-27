export interface Assessment {
  isFile?: boolean;
  created?: string;
  _id?: string;
  name?: string;
  durationInMinutes?: number;
  question?: string;
  track?: object;
  user?: string;
  assessmentSubmissions?: Array<any>;
}
