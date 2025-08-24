import { z } from 'zod';

// Validation schemas for each data type
const pipeSchema = z.object({
  size: z.string(),
  quantity: z.number()
    .min(0, 'Quantity must be at least 0')
    .max(1000, 'Quantity cannot exceed 1000'),
  type: z.enum(['Soft', 'Hard']),
  unit: z.enum(['ft', 'm']),
  selected: z.boolean(),
});

const drainPipeSchema = z.object({
  type: z.enum(['CPVC', 'PVC', 'UPVC']),
  elbowQty: z.number()
    .min(0, 'Elbow quantity must be at least 0')
    .max(1000, 'Elbow quantity cannot exceed 1000'),
  couplingQty: z.number()
    .min(0, 'Coupling quantity must be at least 0')
    .max(1000, 'Coupling quantity cannot exceed 1000'),
  solventQty: z.number()
    .min(0, 'Solvent quantity must be at least 0')
    .max(10000, 'Solvent quantity cannot exceed 10000'),
  unit: z.enum(['ft', 'm']),
  selected: z.boolean(),
});

const insulationSchema = z.object({
  size: z.string(),
  volume: z.number()
    .min(0, 'Volume must be at least 0')
    .max(1000, 'Volume cannot exceed 1000'),
  length: z.number()
    .min(0, 'Length must be at least 0')
    .max(10000, 'Length cannot exceed 10000'),
  unit: z.enum(['ft', 'm']),
  selected: z.boolean(),
});

const fittingSchema = z.object({
  size: z.string(),
  elbowQty: z.number()
    .min(0, 'Elbow quantity must be at least 0')
    .max(1000, 'Elbow quantity cannot exceed 1000'),
  couplingQty: z.number()
    .min(0, 'Coupling quantity must be at least 0')
    .max(1000, 'Coupling quantity cannot exceed 1000'),
  elbowFeet: z.boolean(),
  couplingFeet: z.boolean(),
  selected: z.boolean(),
});

const nutSchema = z.object({
  size: z.string(),
  quantity: z.number()
    .min(0, 'Quantity must be at least 0')
    .max(1000, 'Quantity cannot exceed 1000'),
  selected: z.boolean(),
});

const wireSchema = z.object({
  size: z.string(),
  length: z.number()
    .min(0, 'Length must be at least 0')
    .max(10000, 'Length cannot exceed 10000'),
  cores: z.number()
    .min(1, 'Cores must be at least 1')
    .max(8, 'Cores cannot exceed 8'),
  selected: z.boolean(),
});

// Main inventory form schema
export const inventoryFormSchema = z.object({
  siteName: z.string()
    .min(1, 'Site name is required')
    .max(100, 'Site name cannot exceed 100 characters'),
  siteLocation: z.string()
    .min(1, 'Site location is required')
    .max(200, 'Site location cannot exceed 200 characters'),
  pipes: z.array(pipeSchema),
  drainPipes: z.array(drainPipeSchema),
  insulation: z.array(insulationSchema),
  fittings: z.array(fittingSchema),
  nuts: z.array(nutSchema),
  flaringTool: z.boolean(),
  brazingRods: z.number()
    .min(0, 'Brazing rods must be at least 0')
    .max(100, 'Brazing rods cannot exceed 100'),
  butaneSize: z.enum(['Small', 'Big', '']).optional(),
  butaneQty: z.number()
    .min(0, 'Butane quantity must be at least 0')
    .max(100, 'Butane quantity cannot exceed 100'),
  drainHeaterLength: z.number()
    .min(0, 'Drain heater length must be at least 0')
    .max(1000, 'Drain heater length cannot exceed 1000'),
  hatlonLength: z.number()
    .min(0, 'Hatlon length must be at least 0')
    .max(1000, 'Hatlon length cannot exceed 1000'),
  hatlonUnit: z.enum(['ft', 'm', '']).optional(),
  monsoonTapeLength: z.number()
    .min(0, 'Monsoon tape length must be at least 0')
    .max(1000, 'Monsoon tape length cannot exceed 1000'),
  monsoonTapeQty: z.number()
    .min(0, 'Monsoon tape quantity must be at least 0')
    .max(100, 'Monsoon tape quantity cannot exceed 100'),
  teflonTapeQty: z.number()
    .min(0, 'Teflon tape quantity must be at least 0')
    .max(100, 'Teflon tape quantity cannot exceed 100'),
  tarfeltLength: z.number()
    .min(0, 'Tarfelt length must be at least 0')
    .max(1000, 'Tarfelt length cannot exceed 1000'),
  tarfeltQty: z.number()
    .min(0, 'Tarfelt quantity must be at least 0')
    .max(100, 'Tarfelt quantity cannot exceed 100'),
  liquidPuffQty: z.number()
    .min(0, 'Liquid puff quantity must be at least 0')
    .max(1000, 'Liquid puff quantity cannot exceed 1000'),
  wireTapeLength: z.number()
    .min(0, 'Wire tape length must be at least 0')
    .max(1000, 'Wire tape length cannot exceed 1000'),
  wireTapeQty: z.number()
    .min(0, 'Wire tape quantity must be at least 0')
    .max(100, 'Wire tape quantity cannot exceed 100'),
  cableTies: z.number()
    .min(0, 'Cable ties must be at least 0')
    .max(1000, 'Cable ties cannot exceed 1000'),
  cableTray: z.number()
    .min(0, 'Cable tray must be at least 0')
    .max(1000, 'Cable tray cannot exceed 1000'),
  casingPatti: z.number()
    .min(0, 'Casing patti must be at least 0')
    .max(1000, 'Casing patti cannot exceed 1000'),
  clamPatti: z.number()
    .min(0, 'Clam patti must be at least 0')
    .max(1000, 'Clam patti cannot exceed 1000'),
  asbestosRopeQty: z.number()
    .min(0, 'Asbestos rope quantity must be at least 0')
    .max(1000, 'Asbestos rope quantity cannot exceed 1000'),
  asbestosRopeMeter: z.boolean(),
  expansionWall: z.number()
    .min(0, 'Expansion wall must be at least 0')
    .max(1000, 'Expansion wall cannot exceed 1000'),
  wires: z.array(wireSchema),
  oxygenCylinders: z.number()
    .min(0, 'Oxygen cylinders must be at least 0')
    .max(100, 'Oxygen cylinders cannot exceed 100'),
  nitrogenCylinders: z.number()
    .min(0, 'Nitrogen cylinders must be at least 0')
    .max(100, 'Nitrogen cylinders cannot exceed 100'),
  acGas: z.string()
    .max(50, 'AC gas type cannot exceed 50 characters'),
});

export type InventoryFormValues = z.infer<typeof inventoryFormSchema>;