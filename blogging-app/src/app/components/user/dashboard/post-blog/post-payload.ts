import { FileHandle } from './file-handle.model';

export class PostPayload {
  id!: string;
  content!: string;
  title!: string;
  username!: string;
  postImages!: FileHandle[];
}
