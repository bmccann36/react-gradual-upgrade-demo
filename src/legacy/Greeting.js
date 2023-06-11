import React, {useContext, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ThemeContext from './shared/ThemeContext';
import Clock from './shared/Clock';
import {RouterContext} from "./createLegacyRoot";

const AboutSection = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state);
  const {navigate} = useContext(RouterContext);

  const ref = useRef();

  useEffect(() => {
    // console.log('Mounted:', ref.current);
  }, []);

  const incrementCounter = () => {
    dispatch({type: 'increment'});
  };

  const handleClick = () => {
    // Navigate to a different route
    navigate('/');
  };

  return (
    <ThemeContext.Consumer>
      {theme => (
        <div style={{border: '1px dashed black', padding: 20}} ref={ref}>
          <h3>src/legacy/Greeting.js</h3>
          <h4 style={{color: theme}}>
            This component is rendered by the nested React ({React.version}).
          </h4>
          <Clock/>
          <p>
            Counter: {counter}{' '}
            <button onClick={incrementCounter}>
              +
            </button>
          </p>
          <p>
            <button onClick={handleClick}>
              Go to parent app
            </button>
          </p>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default AboutSection;
