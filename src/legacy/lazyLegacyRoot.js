import React, {useContext, useLayoutEffect, useMemo, useRef} from 'react';
import {ReactReduxContext} from 'react-redux';

import ThemeContext from './shared/ThemeContext';
import {useLocation, useNavigate} from "react-router-dom";

let rendererModule = {
  status: 'pending',
  promise: null,
  result: null,
};


export default function lazyLegacyRoot(getLegacyComponent) {
  let componentModule = {
    status: 'pending',
    promise: null,
    result: null,
  };

  return function Wrapper(props) {
    // Get the router objects you want to share with the modern subtree.
    const router = {
      navigate: useNavigate(),
      location: useLocation(),
    }
    // createLegacyRoot is a function we'll use later
    const createLegacyRoot = readModule(rendererModule, () =>
      import('../modern/createLegacyRoot')
    ).default;
    const Component = readModule(componentModule, getLegacyComponent).default;
    const containerRef = useRef(null);
    const rootRef = useRef(null);

    // Populate every contexts we want the modern subtree to see.
    // Then in src/modern/createLegacyRoot we will apply them.
    const theme = useContext(ThemeContext);
    const reactRedux = useContext(ReactReduxContext);
    const context = useMemo(
      () => ({
        theme,
        router,
        reactRedux,
      }),
      [theme, router, reactRedux]
    );

    // Create/unmount.
    useLayoutEffect(() => {
      if (!rootRef.current) {
        rootRef.current = createLegacyRoot(containerRef.current);
      }
      const root = rootRef.current;
      return () => {
        root.unmount();
      };
    }, [createLegacyRoot]);

    // Mount/update.
    useLayoutEffect(() => {
      if (rootRef.current) {
        rootRef.current.render(Component, props, context);
      }
    }, [Component, props, context]);

    return <div style={{display: 'contents'}} ref={containerRef}/>;
  };
}

// This is similar to React.lazy, but implemented manually.
// We use this to Suspend rendering of this component until
// we fetch the component and the modern React to render it.
function readModule(record, createPromise) {
  if (record.status === 'fulfilled') {
    return record.result;
  }
  if (record.status === 'rejected') {
    throw record.result;
  }
  if (!record.promise) {
    record.promise = createPromise().then(
      value => {
        if (record.status === 'pending') {
          record.status = 'fulfilled';
          record.promise = null;
          record.result = value;
        }
      },
      error => {
        if (record.status === 'pending') {
          record.status = 'rejected';
          record.promise = null;
          record.result = error;
        }
      }
    );
  }
  throw record.promise;
}
