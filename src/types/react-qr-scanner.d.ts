declare module 'react-qr-scanner' {
  interface QrScannerProps {
    delay?: number;
    onError: (error: Error) => void;
    onScan: (data: string | null) => void;
    style?: React.CSSProperties;
    constraints?: MediaTrackConstraints;
  }

  const QrScanner: React.FC<QrScannerProps>;
  export default QrScanner;
} 