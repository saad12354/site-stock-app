export interface PipeData {
  size: string;
  quantity: number;
  type: 'Soft' | 'Hard';
  unit: 'ft' | 'm';
  selected: boolean;
}

export interface InsulationData {
  size: string;
  volume: number;
  length: number;
  unit: 'ft' | 'm';
  selected: boolean;
}

export interface FittingData {
  size: string;
  elbowQty: number;
  couplingQty: number;
  selected: boolean;
}

export interface NutData {
  size: string;
  quantity: number;
  selected: boolean;
}

export interface WireData {
  size: string;
  length: number;
  cores: number;
  selected: boolean;
}

export interface InventoryFormData {
  siteName: string;
  siteLocation: string;
  pipes: PipeData[];
  insulation: InsulationData[];
  fittings: FittingData[];
  nuts: NutData[];
  flaringTool: boolean;
  brazingRods: number;
  butaneSize: 'Small' | 'Big' | '';
  butaneQty: number;
  drainHeaterLength: number;
  hatlonLength: number;
  hatlonUnit: 'ft' | 'm' | '';
  monsoonTapeLength: number;
  monsoonTapeQty: number;
  wireTapeLength: number;
  wireTapeQty: number;
  cableTies: number;
  cableTray: number;
  casingPatti: number;
  clamPatti: number;
  wires: WireData[];
  oxygenCylinders: number;
  nitrogenCylinders: number;
  acGas: string;
}

export const PIPE_SIZES = ['1/4', '3/8', '1/2', '5/8', '3/4', '7/8', '1 1/8', '1 3/8', '1 5/8'];
export const FITTING_SIZES = ['1/4', '3/8', '1/2', '5/8', '3/4'];
export const NUT_SIZES = ['1/4', '3/8', '1/2', '5/8', '3/4'];
export const WIRE_SIZES = ['0.5', '1', '1.5', '2.5', '4.0', '6.0'];