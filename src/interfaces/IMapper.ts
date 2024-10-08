export interface IMapper<T> {
  toResponse(props: T): ReturnType<any>;
  toPersist?(props: T): ReturnType<any>;
}
