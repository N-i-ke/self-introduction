declare module './AuroraLoader' {
  interface AuroraLoaderProps {
    isLoading: boolean;
    onLoadingComplete?: () => void;
  }
  
  const AuroraLoader: React.FC<AuroraLoaderProps>;
  export default AuroraLoader;
} 