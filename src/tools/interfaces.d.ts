export interface IPokemon {
  id: number;
  name: string;
  primaryType: Type;
  secondaryType: Type;
  moves: IMove[];
  stats: IStats;
  sprites: ISprites;
  status: "fit" | "fainted";
}

export type Type =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export interface IMove {
  name: string;
  damage: number;
  accuracy: number;
  type: Type;
  pp: number;
  priority: boolean;
}

export interface IStats {
  id?: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface ISprites {
  front_sprite_url: string;
  back_sprite_url: string;
}

export interface IType {
  normal_multiplier: number;
  fire_multiplier: number;
  water_multiplier: number;
  electric_multiplier: number;
  grass_multiplier: number;
  ice_multiplier: number;
  fighting_multiplier: number;
  poison_multiplier: number;
  ground_multiplier: number;
  flying_multiplier: number;
  psychic_multiplier: number;
  bug_multiplier: number;
  rock_multiplier: number;
  ghost_multiplier: number;
  dragon_multiplier: number;
  dark_multiplier: number;
  steel_multiplier: number;
  fairy_multiplier: number;
}

export interface ITypes {
  normal: IType;
  fire: IType;
  water: IType;
  electric: IType;
  grass: IType;
  ice: IType;
  fighting: IType;
  poison: IType;
  ground: IType;
  flying: IType;
  psychic: IType;
  bug: IType;
  rock: IType;
  ghost: IType;
  dragon: IType;
  dark: IType;
  steel: IType;
  fairy: IType;
}

export type Role = "player" | "opponent";

export interface IAttackParams {
  attacker: IPokemon;
  defender: IPokemon;
  moveName: string;
  turn: Role;
  types: ITypes;
}

export interface ITurnOrderParams {
  playerPokemon: IPokemon;
  opponentPokemon: IPokemon;
  playerMoveName: string;
  opponentMoveName: string;
}

export type ITurnOrder = Role[];

export interface IFetchPokemonParams {
  playerPartyIds: number[];
  opponentPartyIds: number[];
}

export interface ISelectPokemonParams {
  id: number;
  trainer: Role;
}

export interface ISelectMoveParams {
  moveName: string;
  trainer: Role;
}

export interface IAction {
  type: string;
}

export interface ILoadedAction<T> extends IAction {
  payload?: T;
}
