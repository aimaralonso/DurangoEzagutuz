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
}
