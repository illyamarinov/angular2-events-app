import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { getListMetadata, getObjectMetadata } from '@app-core/services/service-utils';

export class APIHelper {

  constructor(public db: AngularFireDatabase) {}

  getList<T>(path: string): Observable<T[]> {
    return this.db.list(path)
      .snapshotChanges()
      .pipe(getListMetadata);
  }

  getObject<T>(path: string): Observable<T> {
    return this.db.object(path)
      .snapshotChanges()
      .pipe(getObjectMetadata);
  }
}
