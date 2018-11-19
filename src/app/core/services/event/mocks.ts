import { Event } from '@app-core/models/event.model';

export const mockEvents: Event[] = [1, 2, 3, 4, 5].map((_, index) => ({
  id: `${index + 1}`,
  title: `Event ${index + 1}`,
  creatorName: `User ${index}`,
  listOfParticipants: 5,
  description: `Description ${index}`,
  expireTime: 24
}));
