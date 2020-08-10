export class BlogComment {

    constructor(
        public id:number,
        public content:string,
        public articleId:number,
        public userId:number,
        public ctime:Date,
        public mtime:Date,
        public ciList:Array<string>
    ){}
}
