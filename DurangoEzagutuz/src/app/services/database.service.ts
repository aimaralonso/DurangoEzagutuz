import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Location } from '../classes/location';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private storage!: SQLiteObject;
  locationsList = new BehaviorSubject<Location[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter
  ) {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: 'Durango_Ezagutuz.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getData();
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  getData() {
    this.httpClient
      .get('assets/dump.sql', { responseType: 'text' })
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_) => {
            this.getLocations();
            this.isDbReady.next(true);
          })
          .catch((error) => console.error(error));
      });
  }

  async getLocations() {
    try {
      const res = await this.storage.executeSql('SELECT * FROM Locations', []);
      let items: Location[] = [];
      console.log(res);
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            position: res.rows.item(i).position,
            name: res.rows.item(i).name,
            description: res.rows.item(i).description,
            explanation: res.rows.item(i).explanation,
            lat: res.rows.item(i).lat,
            lon: res.rows.item(i).lon,
            img: res.rows.item(i).img,
            audio: res.rows.item(i).audio,
            video: res.rows.item(i).video,
            time: res.rows.item(i).time,
            activity: res.rows.item(i).activity,
          });
        }
      }
      this.locationsList.next(items);
    } catch (error) {
      console.error('errorea getLocations', error);
    }
  }
  fetchLocations(): Observable<Location[]> {
    return this.locationsList.asObservable();
  }

  // Nuevo método para obtener una ubicación específica por su id
  async getLocationById(id: number): Promise<Location | null> {
    try {
      const res = await this.storage.executeSql(
        'SELECT * FROM Locations WHERE id = ?',
        [id]
      );
      if (res.rows.length > 0) {
        const location = res.rows.item(0);
        return {
          id: location.id,
          position: location.position,
          name: location.name,
          description: location.description,
          explanation: location.explanation,
          lat: location.lat,
          lon: location.lon,
          img: location.img,
          audio: location.audio,
          video: location.video,
          time: location.time,
          activity: location.activity,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('errorea getLocationById', error);
      return null;
    }
  }

  // Nuevo método para devolver la ubicación específica como un Observable
  fetchLocationById(id: number): Observable<Location | null> {
    const locationSubject = new BehaviorSubject<Location | null>(null);

    this.getLocationById(id).then((location) => {
      locationSubject.next(location);
    });

    return locationSubject.asObservable();
  }
}
