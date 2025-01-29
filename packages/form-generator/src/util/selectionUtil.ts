import type {
  FormPlan,
  FormPlanSelector,
} from '../types';


function selectorMatchesPlan(
  selector: FormPlanSelector,
  plan: FormPlan
): boolean {
  if (selector.length === 1) {
    return selector[0] === plan.section;
  }
  return selector[0] === plan.section && selector[1](plan as any);
}

export function firstSelectorMatching(
  plan: FormPlan,
  selectors: FormPlanSelector[]
): number {
  return selectors.findIndex((selector) => selectorMatchesPlan(selector, plan));
}
