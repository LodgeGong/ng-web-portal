import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService{
    constructor(){

    }

  getLoginInfo():any{
    return JSON.parse(localStorage.getItem("loginUser") || '{}') || null
  }

  setLoginInfo(value: any):any{
     localStorage.setItem("loginUser", JSON.stringify(value));
    return true;
  }
    public get(key:any):any{
        return JSON.parse(localStorage.getItem(key));
    }

    public set(key:string,value:any):void{
        localStorage.setItem(key,JSON.stringify(value));
    }

    public remove(key:string):void{
        localStorage.removeItem(key);
    }

}
