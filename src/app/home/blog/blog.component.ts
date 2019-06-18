import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  titles:string[]=['吴军谷歌方法论感想','吴军硅谷来信随笔','格斗技能复课'];

  constructor() { }

  ngOnInit() {
  }

}
