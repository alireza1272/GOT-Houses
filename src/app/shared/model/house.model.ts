import {CharacterEntityModel} from './character.model';

export interface HouseEntityModel {
  slug: string | null;
  name: string | null;
  members?: (CharacterEntityModel)[] | null;
}
