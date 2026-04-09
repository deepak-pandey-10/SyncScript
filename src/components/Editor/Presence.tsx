import { Editor } from '@tiptap/react';
import { Users } from 'lucide-react';

interface PresenceProps {
  editor: Editor | null;
}

export default function Presence({ editor }: PresenceProps) {
  if (!editor) {
    return null;
  }

  // With Yjs and the collaboration extension, editor.storage.collaborationCursor.users 
  // contains the list of connected users and their states.
  const users = (editor.storage as any).collaborationCursor?.users || [];

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center text-sm text-gray-500 font-medium pb-0.5 relative">
        <Users size={16} className="mr-1.5" />
        <span className="relative z-10 flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        {users.length} {users.length === 1 ? 'user' : 'users'} online
      </div>

      <div className="flex pl-2 ml-auto -space-x-2 overflow-hidden">
        {users.map((user: any, index: number) => (
          <div
            key={index}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: user.color || '#3b82f6' }}
            title={user.name || 'Anonymous User'}
          >
            {(user.name || 'A').charAt(0).toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
