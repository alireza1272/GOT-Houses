import {CharacterEntityModel} from './character.model';

export interface QuoteEntityModel {
  sentence: string;
  character: CharacterEntityModel;
}
