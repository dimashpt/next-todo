import 'i18next';
import { resources } from '@/lib/i18n';

/**
 * Declares a module for 'i18next' library and defines the interface for CustomTypeOptions.
 * @module i18next
 */
declare module 'i18next' {
  interface CustomTypeOptions {
    /**
     * The resources for the custom type in the 'en' language.
     */
    resources: typeof resources.en;
  }
}
