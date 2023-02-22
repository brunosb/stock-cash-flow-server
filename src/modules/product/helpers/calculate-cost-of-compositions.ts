import { Composition } from '../application/entities/composition';

export function calculateCostOfCompositions(
  compositions: Composition[],
): number {
  try {
    return (
      compositions?.reduce((cost, composition) => {
        const costCompositions =
          composition.rawMaterial.unitPrice *
          ((composition.measure / composition.make) * composition.use);

        return parseFloat((cost + costCompositions).toFixed(2));
      }, 0) || 0
    );
  } catch (error) {
    throw new Error(
      `Error to calculate cost in Product: ${(error as Error).message}`,
    );
  }
}
