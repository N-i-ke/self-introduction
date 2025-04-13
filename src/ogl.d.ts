declare module 'ogl' {
  export class Renderer {
    gl: WebGLRenderingContext & { canvas: HTMLCanvasElement };
    constructor(options?: { 
      alpha?: boolean; 
      premultipliedAlpha?: boolean; 
      antialias?: boolean;
      depth?: boolean;
      stencil?: boolean;
      preserveDrawingBuffer?: boolean;
      powerPreference?: string;
      autoClear?: boolean;
      canvas?: HTMLCanvasElement;
      dpr?: number;
    });
    setSize(width: number, height: number): void;
    render(options: { scene: any }): void;
  }

  export class Program {
    uniforms: Record<string, { value: any }>;
    constructor(gl: WebGLRenderingContext, options: any);
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext, options: { geometry: any; program: any });
  }

  export class Color {
    r: number;
    g: number;
    b: number;
    constructor(color: string | number | Array<number>);
  }

  export class Triangle {
    attributes: Record<string, any>;
    constructor(gl: WebGLRenderingContext);
  }
} 