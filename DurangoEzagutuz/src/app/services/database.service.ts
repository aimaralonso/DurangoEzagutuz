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
  quizList = new BehaviorSubject<any[]>([]);
  matchPairsList = new BehaviorSubject<any[]>([]);
  matchImgsList = new BehaviorSubject<any[]>([]);
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
            this.getQuiz();
            this.getMatchPairs();
            this.getMatchImgs();
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

    async getQuiz() {
    try {
      const res = await this.storage.executeSql('SELECT * FROM Quiz', []);
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            sentence: res.rows.item(i).sentence,
            img: res.rows.item(i).img,
            answer: res.rows.item(i).answer,
          });
        }
      }
      this.quizList.next(items);
    } catch (error) {
      console.error('Error en getQuiz', error);
    }
  }

  fetchQuiz(): Observable<any[]> {
    return this.quizList.asObservable();
  }

  async getMatchPairs() {
    try {
      const res = await this.storage.executeSql('SELECT * FROM Match_pair', []);
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
            image: res.rows.item(i).img,
          });
        }
      }
      this.matchPairsList.next(items);
    } catch (error) {
      console.error('Error en getMatchPairs', error);
    }
  }

  fetchMatchPairs(): Observable<any[]> {
    return this.matchPairsList.asObservable();
  }

  async getMatchImgs() {
    try {
      const res = await this.storage.executeSql('SELECT * FROM Match_img', []);
      let items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            img_before: res.rows.item(i).img_before,
            img_after: res.rows.item(i).img_after,
          });
        }
      }
      this.matchImgsList.next(items);
    } catch (error) {
      console.error('Error en getMatchImgs', error);
    }
  }

  fetchMatchImgs(): Observable<any[]> {
    return this.matchImgsList.asObservable();
  }
}
