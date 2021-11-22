import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class User {
  readonly fullName: string;
  readonly phone: string;
  readonly email?: string;
  constructor(init: ModelInit<User>);
}

export declare class Item {
  readonly id: string;
  readonly price: string;
  readonly count: string;
  readonly desc: string;
  readonly model: string;
  constructor(init: ModelInit<Item>);
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Order {
  readonly id: string;
  readonly user: User;
  readonly items?: (Item | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}