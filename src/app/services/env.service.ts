import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export  class EnvService {

    API_URL = 'http://localhost:8000/api/';

    constructor() {

    }

    public getAPIURL(){
      return this.API_URL;
    }
}
