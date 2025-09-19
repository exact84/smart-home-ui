import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceItem, SensorItem } from '@models/index';
import { Observable } from 'rxjs';
import { BASE_API_URL } from 'app/constants/base-url';

@Injectable({ providedIn: 'root' })
export class ItemListService {
  http = inject(HttpClient);

  getAllItemList(): Observable<(DeviceItem | SensorItem)[]> {
    return this.http.get<(DeviceItem | SensorItem)[]>(`${BASE_API_URL}devices`);
  }

  updateItemState(
    id: string,
    state: boolean,
  ): Observable<DeviceItem | SensorItem> {
    return this.http.patch<DeviceItem | SensorItem>(
      `${BASE_API_URL}devices/${id}`,
      {
        state,
      },
    );
  }
}
