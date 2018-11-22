import { User } from './user.model';

export class Event {
  id: string;
  title: string;
  owner_id: string;
  owner: {
    name: string;
  };
  participant_ids: string[];
  participants?: User[];
  description: string;
  expireTime: number;
  img_url?: string;
  comments?: any[];
}
