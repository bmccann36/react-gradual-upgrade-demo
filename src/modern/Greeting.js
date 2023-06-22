import React, {useContext, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import {DataGridPro} from '@mui/x-data-grid-pro';
import {useDemoData} from '@mui/x-data-grid-generator';

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

  const {data} = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100000,
    editable: true,
  });

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
          <Box sx={{height: 520, width: '100%'}}>
            <DataGridPro
              {...data}
              loading={data.rows.length === 0}
              rowHeight={38}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

export default AboutSection;
