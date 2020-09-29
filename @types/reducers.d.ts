interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface IPostState {
  isLoading: boolean,
  items: IPost[],
  selectedPost: IPost | null,
  error: string,
  pageNumber: 1,
  posts: IPost[],
  postsInStore: IPost[];
}
