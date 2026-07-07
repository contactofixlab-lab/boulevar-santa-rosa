declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mobysuite-quote': {
        'real-estate'?: string;
        'project-id'?: string;
        'container'?: string;
        'template'?: string;
        'country-code'?: string;
        'show-real-estate-logo'?: string;
        'real-estate-logo-url'?: string;
        'show-project-logo'?: string;
        'primary-color'?: string;
        'secondary-color'?: string;
        'success-view-type'?: string;
        'hide-selected-assets'?: string;
        'use-secondary-image'?: string;
        [key: string]: any;
      };
    }
  }
}

export {};
