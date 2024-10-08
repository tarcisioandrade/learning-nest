import { randomUUID } from 'crypto';

export abstract class Entity<T> {
  public readonly _id: string;
  public readonly props: T;

  constructor(props: T, id?: string) {
    this._id = id || randomUUID();
    this.props = props;
  }

  toJSON(): Required<{ id: string } & T> {
    return {
      id: this._id,
      ...this.props,
    } as Required<{ id: string } & T>;
  }

  abstract validate(props: T): void;
}
