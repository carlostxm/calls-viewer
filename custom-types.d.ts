import '@types/react';

// Tractor components use React.FC without defining children which causes TS errors
declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}
