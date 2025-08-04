import * as React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Textarea,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  Edit,
  Check,
  Trash,
  Plus,
  Notes,
  Copy,
} from "iconoir-react";

interface NoteItem {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

// 解析 Markdown 格式的文本
const parseMarkdownText = (text: string) => {
  // 将文本按行分割
  const lines = text.split('\n');
  
  return lines.map((line, index) => {
    // 检查是否是列表项（以 "- " 或 "* " 开头）
    const listItemMatch = line.match(/^(\s*)([-*])\s+(.+)$/);
    
    if (listItemMatch) {
      const [, indent, marker, content] = listItemMatch;
      const indentLevel = indent.length / 2; // 假设每级缩进是2个空格
      
      // 根据缩进级别选择项目符号样式
      const getBulletSymbol = (level: number) => {
        if (level % 2 === 0) {
          // 偶数级别使用实心圆
          return '•';
        } else {
          // 奇数级别使用空心圆
          return '◦';
        }
      };
      
      return (
        <div 
          key={index} 
          className="flex items-center gap-2"
          style={{ marginLeft: `${indentLevel * 1.5}rem` }}
        >
          <span className="text-gray-500 dark:text-gray-400 flex-shrink-0 w-4 text-center">
            {getBulletSymbol(indentLevel)}
          </span>
          <span className="flex-1">{content}</span>
        </div>
      );
    }
    
    // 如果不是列表项，直接返回原文本
    return (
      <div key={index} className="whitespace-pre-wrap">
        {line}
      </div>
    );
  });
};

export default function NoteComponent() {
  const [notes, setNotes] = React.useState<NoteItem[]>([]);
  const [editingNote, setEditingNote] = React.useState<string | null>(null);
  const [newNote, setNewNote] = React.useState({ title: "", content: "" });
  const [copySuccess, setCopySuccess] = React.useState(false);
  const [showDataMenu, setShowDataMenu] = React.useState(false);
  const [editingContent, setEditingContent] = React.useState<{ title: string; content: string } | null>(null);

  // 从 Local Storage 加载笔记数据
  React.useEffect(() => {
    const savedNotes = localStorage.getItem('neomatrix-notes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        // 确保日期格式正确
        const notesWithDates = parsedNotes.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt)
        }));
        setNotes(notesWithDates);
      } catch (error) {
        console.error('加载笔记数据失败:', error);
        localStorage.removeItem('neomatrix-notes'); // 清除损坏的数据
      }
    }
  }, []);

  // 点击外部关闭数据管理菜单
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.data-menu-container')) {
        setShowDataMenu(false);
      }
    };

    if (showDataMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDataMenu]);

  // 保存笔记到 Local Storage
  const saveNotesToStorage = (notesToSave: NoteItem[]) => {
    try {
      localStorage.setItem('neomatrix-notes', JSON.stringify(notesToSave));
    } catch (error) {
      console.error('保存笔记数据失败:', error);
    }
  };

  const addNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const note: NoteItem = {
        id: Date.now().toString(),
        title: newNote.title || "无标题笔记",
        content: newNote.content,
        createdAt: new Date(),
      };
      const updatedNotes = [note, ...notes];
      setNotes(updatedNotes);
      saveNotesToStorage(updatedNotes);
      setNewNote({ title: "", content: "" });
    }
  };

  const updateNote = (id: string, updates: Partial<NoteItem>) => {
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, ...updates } : note
    );
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
    setEditingNote(null);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
  };

  // 清空所有笔记
  const clearAllNotes = () => {
    if (window.confirm('确定要清空所有笔记吗？此操作不可撤销。')) {
      setNotes([]);
      localStorage.removeItem('neomatrix-notes');
    }
  };

  // 导出笔记数据
  const exportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `neomatrix-notes-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 导入笔记数据
  const importNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedNotes = JSON.parse(e.target?.result as string);
          const notesWithDates = importedNotes.map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt)
          }));
          setNotes(notesWithDates);
          saveNotesToStorage(notesWithDates);
          alert('笔记导入成功！');
        } catch (error) {
          alert('导入失败：文件格式不正确');
        }
      };
      reader.readAsText(file);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // 2秒后隐藏提示
    } catch (err) {
      console.error('复制失败:', err);
      // 降级方案：使用传统的复制方法
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const startEditNote = (note: NoteItem) => {
    setEditingNote(note.id);
    setEditingContent({ title: note.title, content: note.content });
  };

  const cancelEditNote = () => {
    setEditingNote(null);
    setEditingContent(null);
  };

  const saveEditNote = (id: string) => {
    if (editingContent) {
      updateNote(id, { title: editingContent.title, content: editingContent.content });
    }
    setEditingNote(null);
    setEditingContent(null);
  };

  // 处理Tab键和Shift+Tab键的层级控制
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, isEditing: boolean = false) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      
      // 获取当前行的内容
      const lines = value.split('\n');
      let currentLineIndex = 0;
      let currentPosition = 0;
      
      // 找到当前光标所在的行
      for (let i = 0; i < lines.length; i++) {
        if (currentPosition <= start && start <= currentPosition + lines[i].length + 1) {
          currentLineIndex = i;
          break;
        }
        currentPosition += lines[i].length + 1;
      }
      
      const currentLine = lines[currentLineIndex];
      
      if (e.shiftKey) {
        // Shift + Tab: 减少缩进
        if (currentLine.startsWith('  ')) {
          // 移除2个空格的缩进
          lines[currentLineIndex] = currentLine.substring(2);
          
          // 更新内容
          const newValue = lines.join('\n');
          if (isEditing) {
            setEditingContent(editingContent ? { ...editingContent, content: newValue } : { title: '', content: newValue });
          } else {
            setNewNote({ ...newNote, content: newValue });
          }
          
          // 调整光标位置
          setTimeout(() => {
            textarea.setSelectionRange(start - 2, end - 2);
          }, 0);
        }
      } else {
        // Tab: 增加缩进
        // 在光标位置插入2个空格
        const newValue = value.substring(0, start) + '  ' + value.substring(end);
        
        if (isEditing) {
          setEditingContent(editingContent ? { ...editingContent, content: newValue } : { title: '', content: newValue });
        } else {
          setNewNote({ ...newNote, content: newValue });
        }
        
        // 调整光标位置
        setTimeout(() => {
          textarea.setSelectionRange(start + 2, start + 2);
        }, 0);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* 复制成功提示 */}
      {copySuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300 dark:bg-green-700">
          复制成功！
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h4" className="flex items-center gap-2">
            <Notes className="h-6 w-6" />
            笔记
          </Typography>
          
          {/* 数据管理按钮 */}
          <div className="relative data-menu-container">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowDataMenu(!showDataMenu)}
              className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-200"
            >
              数据管理
            </Button>
            
            {showDataMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[200px] z-10 dark:bg-gray-900 dark:border-gray-700">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={exportNotes}
                  className="w-full justify-start dark:text-gray-200"
                  disabled={notes.length === 0}
                >
                  导出笔记
                </Button>
                <label className="w-full">
                  <input
                    type="file"
                    accept=".json"
                    onChange={importNotes}
                    className="hidden"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-start dark:text-gray-200"
                    as="span"
                  >
                    导入笔记
                  </Button>
                </label>
                <hr className="my-2 dark:border-gray-700" />
                <Button
                  size="sm"
                  variant="ghost"
                  color="error"
                  onClick={clearAllNotes}
                  className="w-full justify-start dark:text-red-400"
                  disabled={notes.length === 0}
                >
                  清空所有笔记
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* 新建笔记区域 */}
        <Card className="mb-6 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
          <CardHeader className="flex items-center gap-2 dark:bg-gray-800 dark:text-gray-100">
            <Plus className="h-5 w-5" />
            <Typography variant="h6">新建笔记</Typography>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="笔记标题..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <Textarea
                placeholder="开始写笔记..."
                className="min-h-[100px] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                onKeyDown={(e) => handleTextareaKeyDown(e, false)}
              />
              <Button 
                onClick={addNote}
                disabled={!newNote.title.trim() && !newNote.content.trim()}
                className="flex items-center gap-2 dark:bg-blue-900 dark:text-gray-100 dark:hover:bg-blue-800"
              >
                <Plus className="h-4 w-4" />
                添加笔记
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* 笔记列表 */}
      <div className="space-y-4">
        {notes.length === 0 ? (
          <Card className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
            <CardBody className="text-center py-8">
              <Notes className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
              <Typography variant="h6" color="secondary" className="mb-2 dark:text-gray-200">
                还没有笔记
              </Typography>
              <Typography color="secondary" className="dark:text-gray-400">
                点击上方"添加笔记"开始记录您的想法
              </Typography>
            </CardBody>
          </Card>
        ) : (
          notes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
              <CardBody>
                {editingNote === note.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                      value={editingContent?.title ?? ''}
                      onChange={(e) => setEditingContent(editingContent ? { ...editingContent, title: e.target.value } : { title: e.target.value, content: '' })}
                    />
                    <Textarea
                      className="min-h-[100px] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                      value={editingContent?.content ?? ''}
                      onChange={(e) => setEditingContent(editingContent ? { ...editingContent, content: e.target.value } : { title: '', content: e.target.value })}
                      onKeyDown={(e) => handleTextareaKeyDown(e, true)}
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => saveEditNote(note.id)}
                        className="flex items-center gap-2 dark:bg-blue-900 dark:text-gray-100 dark:hover:bg-blue-800"
                      >
                        <Check className="h-4 w-4" />
                        保存
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={cancelEditNote}
                        className="dark:border-gray-600 dark:text-gray-200"
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <Typography variant="h6" className="font-semibold">
                        {note.title}
                      </Typography>
                      <div className="flex gap-2">
                        <IconButton
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(`${note.title}\n\n${note.content}`)}
                          title="复制笔记内容"
                          className="dark:text-gray-300"
                        >
                          <Copy className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditNote(note)}
                          title="编辑笔记"
                          className="dark:text-gray-300"
                        >
                          <Edit className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          color="error"
                          onClick={() => deleteNote(note.id)}
                          title="删除笔记"
                          className="dark:text-red-400"
                        >
                          <Trash className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </div>
                    <div className="mb-3 dark:text-gray-200">
                      {parseMarkdownText(note.content)}
                    </div>
                    <Typography variant="small" color="secondary" className="text-right dark:text-gray-400">
                      {formatDate(note.createdAt)}
                    </Typography>
                  </div>
                )}
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
