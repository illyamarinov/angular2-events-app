import { map } from 'rxjs/operators';
import { Response } from '@angular/http';

export const getResponseBody = map((response: Response) => {
  return response.json();
});

export const getById = (id: number) => map((list: any[]) => {
  return list.find(listItem => +listItem.id === id);
});
