export interface IPostBaseDto {
    title: string;
    content: string;
  }
  
  export interface ICreatePost {
    dto: IPostBaseDto & { authorId: string };
  }
  
  export interface IChangePost {
    id: string;
    dto: IPostBaseDto; 
  }
  