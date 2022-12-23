export interface Post {
    id?:number,
    name:string, 
    title:string,
    postedOn:string,
    message:string,
    restrictedTo:string[]
}