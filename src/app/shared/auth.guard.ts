import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from './LocalStorageService.servcie';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private localStorageService: LocalStorageService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        let url = state.url;
        //登录注册跳过
        if (url == '/home/login' || url == '/home/regist') {
            return true;
        }        
        let user = this.localStorageService.getLoginInfo();
        console.log("lodge-------"+JSON.stringify(user));
        
        if (user && !(Object.keys(user).length == 0)) {
            // 已登录所以返回true
            return true;
        }
        // 未登录，所以跳转到登录页并且返回url
        this.router.navigate(['/home/login']);
        return false;
    }

    
    
}