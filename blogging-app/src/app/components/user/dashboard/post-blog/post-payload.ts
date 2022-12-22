import { FileHandle } from "./file-handle.model";

export class PostPayload{
    id!: String;
    content!: String;
    title!: String;
    username!: String;
    postImages!: FileHandle[];   
  }