import React, { useState, useEffect } from 'react';
import './index.less';

interface propsType {
  radius: number;
  percent: number;
}

const ProgressCircle: React.FC<propsType> = (props) => {
  const [dashArray] = useState(Math.PI * 100);
  const { radius, percent } = props;

  return (
    <div className="progress-circle">
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent" />
        <circle className="progress-bar" r="50" cx="50" cy="50" fill="transparent" strokeDasharray={dashArray} strokeDashoffset={(1 - percent) * dashArray} />
      </svg>
      {props.children}
    </div>
  )
}

export default ProgressCircle