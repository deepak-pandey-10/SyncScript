import { useParams, Navigate } from 'react-router-dom';
import Editor from '../components/Editor/Editor.tsx';

export default function EditorPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-lg font-bold shadow-sm">
            S
          </div>
          <h1 className="font-semibold text-gray-800 tracking-tight">SyncScript</h1>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-sm font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded-md truncate max-w-[200px]">
            {id}
          </span>
        </div>
      </header>
      
      <main className="flex-1 flex justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <Editor documentId={id} />
        </div>
      </main>
    </div>
  );
}
