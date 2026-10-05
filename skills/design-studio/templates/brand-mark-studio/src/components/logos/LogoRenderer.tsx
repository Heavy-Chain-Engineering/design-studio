import React from 'react';
import { CandidateId, LogoParams } from '../../types';
import { ModularPrism } from './ModularPrism';
import { ConcentricAperture } from './ConcentricAperture';
import { InterlockingTrefoil } from './InterlockingTrefoil';

interface LogoRendererProps {
  candidate: CandidateId;
  params: LogoParams;
  size?: number | string;
  className?: string;
  monochrome?: 'black' | 'white' | null;
}

export const LogoRenderer: React.FC<LogoRendererProps> = ({
  candidate,
  params,
  size = 400,
  className = '',
  monochrome = null,
}) => {
  switch (candidate) {
    case 'modular-prism':
      return (
        <ModularPrism
          params={params['modular-prism']}
          size={size}
          className={className}
          monochrome={monochrome}
        />
      );
    case 'concentric-aperture':
      return (
        <ConcentricAperture
          params={params['concentric-aperture']}
          size={size}
          className={className}
          monochrome={monochrome}
        />
      );
    case 'interlocking-trefoil':
      return (
        <InterlockingTrefoil
          params={params['interlocking-trefoil']}
          size={size}
          className={className}
          monochrome={monochrome}
        />
      );
    default:
      return null;
  }
};
