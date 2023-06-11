import React, {createContext} from 'react';
import {createRoot} from 'react-dom/client';
import ThemeContext from './shared/ThemeContext';
import {Provider} from 'react-redux';

// Create a new context
export const RouterContext = createContext();

// Pass through every context required by this tree.
// The context object is populated in src/modern/withLegacyRoot.
function Bridge({children, context}) {

  return (
    <ThemeContext.Provider value={context.theme}>
      <RouterContext.Provider value={context.router}>
        <Provider store={context.reactRedux.store}>{children}</Provider>
      </RouterContext.Provider>
    </ThemeContext.Provider>
  );
}

export default function createLegacyRoot(container) {
  const root = createRoot(container);


  return {
    render(Component, props, context) {
      root.render(
        <Bridge context={context}>
          <Component {...props} />
        </Bridge>
      );
    },
    unmount() {
      root.unmount()
    },
  };
}
