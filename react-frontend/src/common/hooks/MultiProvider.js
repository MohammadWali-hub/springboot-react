import React from 'react';

export const MultiProvider = (props) => {
  let content = props.children || null;

  /* Error/Validation */
  if (!props.providers) {
    // eslint-disable-next-line no-throw-literal
    throw 'MultiProvider: Missing providers prop';
  }

  if (!props.children) {
    // eslint-disable-next-line no-throw-literal
    throw 'MultiProvider: Missing children';
  }

  // Turn object into an array
  // const numberOfProviders = props.providers.size;
  const numberOfProviders = props.providers.length;

  if (!numberOfProviders) {
    // Providers prop is empty, r
    return content;
  }

  [...(props.providers ?? [])].reverse().forEach((provider) => {
    content = React.cloneElement(provider, null, content);
  });

  return content;
};
