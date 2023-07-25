import {useEffect, useRef} from 'react';

export function useTraceUpdate(props) {
  const prevProp = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce(
      (previousStateKaSingleObject, [key, value]) => {
        if (prevProp.current[key] !== value) {
          previousStateKaSingleObject[key] = [prevProp.current[key], value];
        }
        return previousStateKaSingleObject;
      },
      {},
    );
    if (Object.keys(changedProps).length) {
      console.log('Prop me change he:', changedProps);
    }
    prevProp.current = props;
  });
}
