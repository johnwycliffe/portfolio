declare module 'react-starfield' {
    import { ReactElement } from 'react';
    
    interface StarfieldProps {
      /** Number of stars (default: 1000) */
      starCount?: number;
      /** Star color as RGB tuple or CSS string (default: [255, 255, 255]) */
      starColor?: [number, number, number] | string;
      /** Animation speed (default: 0.05) */
      speedFactor?: number;
      /** Background color (default: "black") */
      backgroundColor?: string;
    }
  
    /**
     * A lightweight starfield animation component
     * @example
     * <Starfield
     *   starCount={1500}
     *   starColor="white"
     *   speedFactor={0.1}
     *   backgroundColor="black"
     * />
     */
    const Starfield: (props: StarfieldProps) => ReactElement;
    export default Starfield;
  }


 // git add components/starfield.d.ts
//git commit -m "Add TypeScript types for react-starfield"