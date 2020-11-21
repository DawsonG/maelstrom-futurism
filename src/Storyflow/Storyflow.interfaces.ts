export interface IStory {
  id: string;
  type?: string;
  title?: string;
  content?: any;
  physicalXY: Array<number>;
}

export interface IConnection {
  source: string;
  target: string;
  direction: string;
}

export interface IStoryMap {
  [key: string]: IStory;
}

export interface IStoryflow {
  stories: IStoryMap;
  connections: Array<IConnection>;
}
