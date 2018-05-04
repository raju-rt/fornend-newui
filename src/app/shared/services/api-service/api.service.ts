import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {

  // baseUrll = 'http://192.168.1.22:3000';
  baseUrll = 'http://183.82.118.54:9080/pot/app';
  constructor(private _http: Http) { }
  random() {
    return Math.round(new Date().getTime() / 1000);
  }
  PostService(body, Url, paramsObj?) {
    let request = '';
    if (body !== '') {
      request = JSON.stringify(body);
    }
    let params: URLSearchParams = new URLSearchParams();
    for (var key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        var element = paramsObj[key];

        params.set(key, element.split(' ').join('+'));
      }
    }
    let buster: any = this.random();
    let parm: any = params;
    if (paramsObj) {
      buster = buster + "&";
    }
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;application/json;charset=UTF-8');
    headers.append('pragma', 'no-cache');
    let token = localStorage.getItem('token');
    if (token !== undefined) {
      headers.append('pottoken', localStorage.getItem('token'));
    }
    return this._http.post(this.baseUrll + Url + "?cacheBuster=" + buster + params, request, { headers: headers })
      .map((res: Response) => res.json())
      //  .retry()
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  GetService(url, prams) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', localStorage.getItem('token'));
    // headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get(this.baseUrll + url + prams + "?cacheBuster=" + this.random(), { headers: headers })
      .map((response: Response) => response.json())
      .catch((error) => {
        return 'seomething gone wrong';
      });
  }

}



