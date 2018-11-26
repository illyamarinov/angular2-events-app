import { map } from 'rxjs/operators';
import { Response } from '@angular/http';

export const getResponseBody = map((response: Response) => {
  return response.json();
});

export const getById = (id: number) => map((list: any[]) => {
  return list.find(listItem => +listItem.id === id);
});

export const getListMetadata = map((list: any[]) => {
  return list.map((item) => ({
    ...item.payload.val(),
    id: item.key
  }));
});

export const getObjectMetadata = map((object: any) => ({
  ...object.payload.val(),
  id: object.key
}));
