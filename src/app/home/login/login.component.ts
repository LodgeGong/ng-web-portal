import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { LocalStorageService } from 'src/app/shared/LocalStorageService.servcie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public result: string;
  public errorType = 0;
  public isRegist:boolean = false;

  public loginInfo: any = { 'username': '', 'password': '','mobile':'','verification':''};
  public imageCodeObejct: any = { 'hasImageCode': false, 'imageCodeUrl': 'http://localhost:18080/passport/refreshVerifCode', 'imageToken': '' };
  
  @ViewChild('userNameInput') userNameInput;
  @ViewChild('passwordInput') passwordInput;
  @ViewChild('submitButton') submitButton;

  constructor(
    private httpService: HttpService,
    private localStorageService:LocalStorageService,
    private router: Router
    ) { }

  ngOnInit() {
    this.httpService.get("http://localhost:18080/passport/preLogin").subscribe(res => {
      if (res.flag) {
        this.imageCodeObejct.hasImageCode = res.data.needVerification;
        this.imageCodeObejct.imageToken = res.data.token;
        if (this.imageCodeObejct.hasImageCode) {
          this.refreshVerifCode();
        }
      }
    });
  }


  checkValue() {
    if (this.loginInfo.username === '') {
      this.result = '用戶名不能为空';
      this.errorType = 2;
      this.userNameInput.nativeElement.focus();
      return false;
    }
    
    if (this.loginInfo.password === '') {
      this.result = '密码不能为空';
      this.errorType = 3;
      this.passwordInput.nativeElement.focus();
      return false;
    }

    if (this.loginInfo.verification === '') {
      this.result = '验证码不能为空';
      this.errorType = 7;
      this.passwordInput.nativeElement.focus();
      return false;
    }
    
    return true;
  }

  checkRegistValue() {
    if (this.loginInfo.username === '') {
      this.result = '用戶名不能为空';
      this.errorType = 4;
      return false;
    }
    
    if (this.loginInfo.password === '') {
      this.result = '密码不能为空';
      this.errorType = 5;
      return false;
    }

    if (this.loginInfo.mobile === '') {
      this.result = '手机号不能为空';
      this.errorType = 6;
      return false;
    }
    
    return true;
  }

  submit() {
    if (!this.checkValue()) return;
    if (this.imageCodeObejct.hasImageCode) {
      this.loginInfo.token = this.imageCodeObejct.imageToken;
    }
    this.httpService.post("http://localhost:18080/passport/login",this.loginInfo).subscribe(data => {
      if (data.flag) {
        let userInfo = data.data;
        this.localStorageService.setLoginInfo(userInfo);
        this.router.navigate(['/home']);
      }else{
        this.result = '登录失败，请检查用户名密码！';
        this.errorType = 1;
      }
    });
  }

  regist() {
    if (!this.checkRegistValue()) return;
    this.httpService.post("http://localhost:18080/passport/regist",this.loginInfo).subscribe(data => {
      if (data.flag) {
        this.isRegist = false;
      }
    });
  }

  toggle() {
    if (this.isRegist) {
      this.isRegist = false;
    }else{
      this.isRegist = true;
    }
  }

  refreshVerifCode() {
    this.imageCodeObejct.imageCodeUrl = 'http://localhost:18080/passport/refreshVerifCode?token=' + this.imageCodeObejct.imageToken + '&random=' + new Date().getTime();
  }
}
