declare module 'ogl' {
  export class Renderer {
    gl: WebGLRenderingContext;
    constructor(options: any);
    setSize(width: number, height: number): void;
    render(options: { scene: any }): void;
  }

  export class Program {
    uniforms: any;
    constructor(gl: WebGLRenderingContext, options: any);
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext, options: any);
  }

  export class Color {
    r: number;
    g: number;
    b: number;
    constructor(color: string);
  }

  export class Triangle {
    attributes: any;
    constructor(gl: WebGLRenderingContext);
  }
} 