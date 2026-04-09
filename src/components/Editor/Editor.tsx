import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

import Toolbar from './Toolbar';
import Presence from './Presence';

// Generate some random names and colors for presence
const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'];
const NAMES = ['Anonymous Giraffe', 'Anonymous Elephant', 'Anonymous Tiger', 'Anonymous Dolphin', 'Anonymous Penguin', 'Anonymous Koala', 'Anonymous Fox'];
const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

interface EditorProps {
  documentId: string;
}

export default function CollaborativeEditor({ documentId }: EditorProps) {
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const doc = new Y.Doc();
    // Connecting to a public testing Yjs websocket server or a local one.
    // In production, this would point to your own Node.js backend.
    const wsProvider = new WebsocketProvider(
      'ws://localhost:1234', // We'll assume your backend will run on port 1234
      documentId,
      doc
    );

    wsProvider.on('status', (event: { status: string }) => {
      setIsConnected(event.status === 'connected');
    });

    setYdoc(doc);
    setProvider(wsProvider);

    return () => {
      wsProvider.destroy();
      doc.destroy();
    };
  }, [documentId]);

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          // @ts-ignore
          history: false, // The collaboration extension comes with its own history handling
        }),
        Collaboration.configure({
          document: ydoc as any,
        }),
        CollaborationCursor.configure({
          provider: provider as any,
          user: {
            name: getRandomElement(NAMES),
            color: getRandomElement(COLORS),
          },
        }),
      ],
      editorProps: {
        attributes: {
          class: 'prose prose-blue prose-lg max-w-none focus:outline-none min-h-[500px] p-6',
        },
      },
    },
    [ydoc, provider] // Re-create editor when ydoc or provider changes
  );

  if (!ydoc || !provider || !editor) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium tracking-wide">Connecting to real-time sync...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl">
      <Presence editor={editor} />
      <Toolbar editor={editor} />
      
      {/* Connection Status indicator */}
      {!isConnected && (
         <div className="bg-amber-50 text-amber-600 text-xs py-1 px-4 text-center border-b border-amber-100 flex items-center justify-center gap-2">
           <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
           Reconnecting to server...
         </div>
      )}

      <div className="bg-white cursor-text text-gray-800">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
