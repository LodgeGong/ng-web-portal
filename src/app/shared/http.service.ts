
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class HttpService {

    public _root: string = '';

    constructor(private http: HttpClient) {
      
    }

    public get(url: string, data?: any, root?: string): Observable<any> {
        if (!root) root = this._root;
        let params = new HttpParams();
        let timestamp = Date.parse(new Date().toString()).toString();


      if (!!data) {
        if (!!data.forEach) {
            data.forEach((v: any, k: any) => {
            params=params.set(k, v);
          });
        } else {
          for (let k in data) {
            params=params.set(k, data[k]);
          }
        }
      }
      // let random = Math.floor(Math.random() * 1e4).toString();
      // let sign = `${timestamp}${random}`;
      // params = params.set('random', sign);
      return this.http.get(root+url, { params: params });
    }

    public post(url: string, data?: any, root?: string): Observable<any> {
        if (!root) root = this._root;
        let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let body = new HttpParams();
        if (!!data) {
            if (!!data.forEach) {
                data.forEach((v: any, k: any) => {
                    body =body.set(k, v);
                });
            } else {
                for (let k in data) {
                   body = body.set(k, data[k]);
                }
            }
        }
        return this.http.post(root+url, body, { headers:headers });
    }

    public requestBuffer(url: string): Observable<HttpResponse<ArrayBuffer>> {
        return this.http.get(url,{responseType: 'arraybuffer', observe: 'response'});
    }


  public postJson(url: string, data?: any, root?: string): Observable<any> {
    if (root == null) root = this._root;
    const body = JSON.stringify(data);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(root + url, body, {headers : headers });
  }

  

}
