import { ViewProps } from 'react-native';

/**
 * Properties for the OmhCallout component.
 */
export type OmhCalloutComponentProps = ViewProps & {
  /**
   * If true, the default frame is kept.
   * If false the default frame is overridden.
   */
  keepDefaultFrame?: boolean;
};
