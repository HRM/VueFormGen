import type {
  ComponentCollectionConfig,
  FormGenComponentEntry,
  SectionType,
} from '../types';

export function componentCollection<T extends SectionType[]>(
  components: ComponentCollectionConfig<T>
): FormGenComponentEntry[] {
  return components;
}
