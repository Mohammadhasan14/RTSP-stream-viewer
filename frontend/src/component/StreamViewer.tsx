import { useEffect, useRef, useState } from 'react';

function StreamViewer({ streamId }: any) {
  const [imageSrc, setImageSrc] = useState('');
  const [playing, setPlaying] = useState(true);
  const wsRef: any = useRef(null);

  useEffect(() => {
    if (playing) {
      const ws = new WebSocket(`ws://localhost:8000/ws/stream/${streamId}/`); // just for testingg.
      wsRef.current = ws;

      ws.onmessage = (event) => {
        setImageSrc(`data:image/jpeg;base64,${event.data}`);
      };

      ws.onerror = () => console.error('WebSocket error');
      ws.onclose = () => console.log('WebSocket closed');
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [playing, streamId]);

  return (
    <div className="border rounded p-2 shadow">
      <img
        src={imageSrc}
        alt="Stream"
        className="w-full h-auto mb-2"
      />
      <button
        className="px-4 py-1 bg-gray-800 text-white rounded"
        onClick={() => setPlaying(!playing)}
      >
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default StreamViewer;
