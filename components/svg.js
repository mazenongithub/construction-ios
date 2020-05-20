import * as React from 'react';
import { SvgCss } from 'react-native-svg';
class SVG {

Icon() {
    const xml = `
    <svg width="32" height="32" viewBox="0 0 32 32">
      <style>
        .red {
          fill: #ff0000;
        }
      </style>
      <rect class="red" x="0" y="0" width="32" height="32" />
    </svg>
  `;
  
  return(<SvgCss xml={xml} width="100%" height="100%" />);
    }
 
}

export default SVG