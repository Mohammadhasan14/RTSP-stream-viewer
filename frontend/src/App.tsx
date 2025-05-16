import { useState } from 'react';
import StreamViewer from './component/StreamViewer';

function App() {
  const [streams, setStreams] = useState<any>([]);
  const [url, setUrl] = useState('');

  const handleAddStream = () => {
    if (url.trim()) {
      setStreams([...streams, { url, id: Date.now() }]);
      setUrl('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">RtSP Stream Viewer</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter RTSP URL"
          className="p-2 border border-gray-400 rounded w-2/3"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleAddStream}
        >
          Add Stream
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {streams.map((stream: any) => (
          <StreamViewer key={stream.id} streamId={stream.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
