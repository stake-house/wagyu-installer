import React from 'react';
import { Footer } from '../Footer';

type Props = {
  isSystemReady: boolean;
  isRocketPoolInstalled: boolean;
};

export const SystemCheckFooter = ({
  isSystemReady,
  isRocketPoolInstalled,
}: Props) => {
  if (isSystemReady) {
    return (
      <Footer
        backLink={'/'}
        backLabel={'Back'}
        nextLink={'/installing'}
        nextLabel={'Install'}
      />
    );
  } else if (isRocketPoolInstalled) {
    return (
      <Footer
        backLink={'/'}
        backLabel={'Back'}
        nextLink={'/status'}
        nextLabel={'Status'}
      />
    );
  } else {
    return (
      <Footer backLink={'/'} backLabel={'Back'} nextLink={''} nextLabel={''} />
    );
  }
};
