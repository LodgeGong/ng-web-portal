import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/LocalStorageService.servcie';
import { HttpService } from 'src/app/shared/http.service';
import { BlogComment } from 'src/app/shared/entity/blog-comment';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public errorMsg: string;
  public commentErrorMsg: string;
  public errorType = 0;
  public isEditContent:boolean = false;
  public isShowArticle:boolean = false; 
  public selectTitle:string="";
  public selectArticle:any;
  public isAuthor:boolean;
  public currentUser:object;
  public isAddComment:boolean = false;

  blogItem:any = {id:"",blogTitle:"",blogContent:"",tags:[],userId:""};

  articles:any;
  contents:any;

  commentItems:BlogComment[];
  public uploader: FileUploader = new FileUploader({
    url: "http://localhost:18080/article/uploadProfile",
    method: "POST",
    itemAlias: "profileImg"
  });

  constructor(
    private localStorageService:LocalStorageService,
    private httpService: HttpService,) { }

  ngOnInit() {
    this.initData();
  }

  selectedFileOnChanged(fileEvent){
    this.editorUploadImages();
  }

  public editorUploadImages():void{
    this.uploader.onBuildItemForm = function(fileItem,form){
        form.append('md5','testmd5');
    }
    this.uploader.queue[0].onSuccess = function(response,status,headers){
        if(status == 200){
            console.log(response);
            let res = JSON.parse(response)
            if (res.flag) {
              alert('上传成功');
            }
            this.uploader.clearQueue();
        }else{
           alert("上传图片失败")
        }
    };
    this.uploader.queue[0].upload();
}

  showBlog(article:any) {
    console.log(article);
    this.isEditContent=false;
    this.isShowArticle=true;
    this.selectTitle = article.title;
    this.selectArticle = article;
    this.contents = JSON.parse(article.content);
    let loginUser = this.localStorageService.getLoginInfo();
    this.currentUser = loginUser;
    if (loginUser.id === article.userId) { 
      this.isAuthor = true;
    }else{
      this.isAuthor = false;
    }
    //拿到所有文章评论
    this.httpService.get("http://localhost:18080/article/comment/findAll",{articleId:article.id}).subscribe(data => {
      console.log(data);
      if (data.flag) {
        this.commentItems = data.data;
        //清空评论
        this.commentErrorMsg='';
        this.isAddComment=false;
        for (let ci of this.commentItems) {
          let ciList = JSON.parse(ci.content);
          ci.ciList = ciList;
        }
      }
    });
  }


  newBlog(){
    this.isEditContent=true;
    this.isShowArticle=false;
    this.blogItem={blogTitle:"",blogContent:"",tags:[],userId:""};
    this.selectArticle=null;
    this.selectTitle=null;
  }

  editBlog(){
    this.isEditContent=true;
    this.isShowArticle=false;
    this.blogItem.blogTitle=this.selectTitle;
    let contentList = JSON.parse(this.selectArticle.content);
    
    let contentStr = "";
    for (let con of contentList) {
      contentStr += con + "\n";
    }
    this.blogItem.blogContent = contentStr;
  }

  submitBlog(){
    this.errorType = 0;
    this.errorMsg = '';
    //参数校验
    if (!this.checkBlogValue()) return;
    if (this.selectArticle) {
      console.log('update the blog!');
      this.blogItem.id = this.selectArticle.id;
    }
    let user = this.localStorageService.getLoginInfo();
    this.blogItem.userId = user.id;
    console.log(this.blogItem);
    this.httpService.post("http://localhost:18080/article/save",this.blogItem).subscribe(data => {
      console.log(data);
      if (data.flag) {
          this.isEditContent=false;
          this.blogItem={id:"",blogTitle:"",blogContent:"",tags:[],userId:""};
          this.errorMsg = '';
          this.errorType = 0;
          this.initData();
        }else{
          this.errorMsg = "保存失败！ "+data.message;
          this.errorType = 1;
        }
    });
    

  }

  checkBlogValue(){
    if (this.blogItem.blogTitle === '') {
      this.errorMsg = '博客标题不能为空';
      this.errorType = 1;
      return false;
    }
    if (this.blogItem.blogContent === '') {
      this.errorMsg = '博客内容不能为空';
      this.errorType = 1;
      return false;
    }
    return true;
  }

  initData(){
    this.httpService.get("http://localhost:18080/article/findall").subscribe(data => {
      console.log(data);
      if (data.flag) {
        this.articles = data.data;
        this.isEditContent=false;
        this.isShowArticle=false;
        this.selectArticle=null;
        this.selectTitle=null;
        this.contents=null;
        this.commentErrorMsg='';
        this.isAddComment=false;
      }
    });
  }

  deleteBlog(){
    let deleteId = this.selectArticle.id;
    if (!deleteId) {
      return;
    }
    if (!confirm("是否确认删除？")) {
      return;
    }
    this.httpService.post("http://localhost:18080/article/delete",{deleteId:deleteId}).subscribe(data => {
      console.log(data);
      if (data.flag) {
          alert("删除成功！")
          this.isEditContent=false;
          this.blogItem={id:"",blogTitle:"",blogContent:"",tags:[],userId:""};
          this.errorMsg = '';
          this.errorType = 0;
          this.initData();
        }else{
          this.errorMsg = "删除失败！ "+data.message;
          this.errorType = 1;
        }
    });
  }

  deleteComment(comment:BlogComment){
    if (!confirm("确认删除评论？")) {
      return;
    }
    this.httpService.post("http://localhost:18080/article/comment/delete",{commentId:comment.id}).subscribe(data => {
      console.log(data);
      if (data.flag) {
        this.httpService.get("http://localhost:18080/article/comment/findAll",{articleId:comment.articleId}).subscribe(data => {
          console.log(data);
          if (data.flag) {
            this.commentItems = data.data;
            //清空评论
            this.commentErrorMsg='';
            this.isAddComment=false;
            for (let ci of this.commentItems) {
              let ciList = JSON.parse(ci.content);
              ci.ciList = ciList;
            }
          }
        });
      }else{
        alert("删除失败");
      }
    });
  }

  subbmitComment(text:string){
    this.commentErrorMsg = '';
    if (text === '') {
      this.commentErrorMsg = '评论内容不能为空';
      this.errorType = 2;
      return;
    }
    let user = this.localStorageService.getLoginInfo();
    let commentObj = {
      userId:user.id,
      articleId:this.selectArticle.id,
      content:text
    }
        
    this.httpService.post("http://localhost:18080/article/comment/save",commentObj).subscribe(data => {
      console.log(data);
      if (data.flag) {
          alert('保存成功！');
          this.httpService.get("http://localhost:18080/article/comment/findAll",{articleId:this.selectArticle.id}).subscribe(data => {
            console.log(data);
            if (data.flag) {
              this.commentItems = data.data;
              //清空评论
              this.commentErrorMsg='';
              this.isAddComment=false;
              for (let ci of this.commentItems) {
                let ciList = JSON.parse(ci.content);
                ci.ciList = ciList;
              }
            }
          });
        }else{
          this.commentErrorMsg  = "评论发送失败！ "+data.message;
          this.errorType = 2;
        }
    });
  }
}
