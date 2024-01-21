import {HouseEntityModel} from './house.model';

export interface CharacterEntityModel {
  name: string;
  slug: string;
  house?: HouseEntityModel | null;
  quotes?: (string)[] | null;
}
