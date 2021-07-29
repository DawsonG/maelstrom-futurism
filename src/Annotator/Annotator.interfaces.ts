export type TSelection = {
  start: number;
  end: number;
};

export interface ILabel {
  name: string;
  color: string;
}

export interface IEntity {
  start: number;
  end: number;
  value: string;
  label: ILabel;
}

export interface IAnnotator {
  name: string;
  label?: string;
  value?: string;
  isEditable?: boolean;
  defaultEntities?: Array<IEntity>;
  entityLabels: Array<ILabel>;
}
