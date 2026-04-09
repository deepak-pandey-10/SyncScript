import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FileText, ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [docId, setDocId] = useState('');

  const handleCreateDocument = () => {
    const newDocId = uuidv4();
    navigate(`/doc/${newDocId}`);
  };

  const handleJoinDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (docId.trim()) {
      navigate(`/doc/${docId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 p-8">
        <div className="flex justify-center mb-6 relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg relative z-10 text-white">
            <FileText size={32} strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2 tracking-tight">SyncScript</h1>
        <p className="text-gray-500 text-center mb-8 font-medium">Real-time collaborative editing</p>

        <button
          onClick={handleCreateDocument}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5"
        >
          <Sparkles size={18} />
          Create New Document
        </button>

        <div className="mt-8 mb-8 relative flex items-center justify-center border-t border-gray-200">
          <span className="absolute bg-white px-4 text-sm text-gray-400 font-medium tracking-wide">OR</span>
        </div>

        <form onSubmit={handleJoinDocument} className="space-y-4">
          <div>
            <label htmlFor="docId" className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
              Join Existing Document
            </label>
            <div className="relative">
              <input
                id="docId"
                type="text"
                value={docId}
                onChange={(e) => setDocId(e.target.value)}
                placeholder="Enter Document ID..."
                className="w-full pl-4 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200"
              />
              <button
                type="submit"
                disabled={!docId.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
