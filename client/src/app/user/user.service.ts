import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http , Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import 'rxjs/Rx';


@Injectable()    
export class UserService{
      private serviceUrl = 'http://localhost:8080/api/user/';  // URL to web API
      private counter : number = 0;
    http :Http;

    //static $inject = ['$scope', '$http', '$templateCache'];
    constructor (http:Http){
        this.http = http;
    }

    public add(name : string){
       var anUser = new User(this.counter++,name);
        return this.http.post(this.serviceUrl,anUser)
                    .map(this.extractData)
                    .catch(this.handleError); 
    }

    public remove(id : number){
        return this.http.delete(this.serviceUrl + id)
                    .map(this.extractData)
                    .catch(this.handleError); 
    }

     public list(){
        return this.http.get(this.serviceUrl)
                    .map(this.extractData)
                    .catch(this.handleError); 
    }

     private extractData(res: Response) {
        let body = res.json();

        return body || { };
    }

    private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}