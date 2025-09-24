import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Brain, 
  Trash2, 
  Edit3, 
  Calendar,
  Target,
  Zap,
  Settings,
  Moon,
  Sun
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium', category: 'personal' })
  const [filter, setFilter] = useState('all')
  const [darkMode, setDarkMode] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [showAiDialog, setShowAiDialog] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  // Simulação de sugestões de IA
  const aiSuggestions = [
    "Que tal dividir esta tarefa em etapas menores?",
    "Considere definir um prazo específico para esta atividade.",
    "Esta tarefa parece importante - que tal marcá-la como alta prioridade?",
    "Você pode agrupar tarefas similares para ser mais eficiente.",
    "Lembre-se de fazer pausas entre tarefas complexas."
  ]

  useEffect(() => {
    const savedTasks = localStorage.getItem('taskassistent-tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
    
    const savedTheme = localStorage.getItem('taskassistent-theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('taskassistent-tasks', JSON.stringify(tasks))
  }, [tasks])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('taskassistent-theme', !darkMode ? 'dark' : 'light')
  }

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        completed: false,
        createdAt: new Date().toISOString(),
        aiProcessed: false
      }
      setTasks([...tasks, task])
      setNewTask({ title: '', description: '', priority: 'medium', category: 'personal' })
      
      // Simular processamento de IA
      setTimeout(() => {
        const suggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]
        setAiSuggestion(suggestion)
        setShowAiDialog(true)
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, aiProcessed: true } : t))
      }, 2000)
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ))
    setEditingTask(null)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return task.priority === filter
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work': return <Target className="w-4 h-4" />
      case 'personal': return <Calendar className="w-4 h-4" />
      case 'study': return <Brain className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Painel Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Formulário de Nova Tarefa */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Nova Tarefa</span>
                </CardTitle>
                <CardDescription>
                  Adicione uma nova tarefa e deixe a IA ajudar você a organizá-la
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Título da tarefa..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="text-lg"
                />
                
                <Textarea
                  placeholder="Descrição detalhada (opcional)..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={3}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={newTask.category} onValueChange={(value) => setNewTask({ ...newTask, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Pessoal</SelectItem>
                      <SelectItem value="work">Trabalho</SelectItem>
                      <SelectItem value="study">Estudos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={addTask} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Tarefa
                </Button>
              </CardContent>
            </Card>

            {/* Filtros */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Tabs value={filter} onValueChange={setFilter}>
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="all">Todas</TabsTrigger>
                    <TabsTrigger value="pending">Pendentes</TabsTrigger>
                    <TabsTrigger value="completed">Concluídas</TabsTrigger>
                    <TabsTrigger value="high">Alta</TabsTrigger>
                    <TabsTrigger value="medium">Média</TabsTrigger>
                    <TabsTrigger value="low">Baixa</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Lista de Tarefas */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${task.completed ? 'opacity-75' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleTask(task.id)}
                              className={`p-1 ${task.completed ? 'text-green-600' : 'text-gray-400'}`}
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </Button>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                                  {task.title}
                                </h3>
                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                                {task.aiProcessed && <Zap className="w-4 h-4 text-yellow-500" />}
                              </div>
                              
                              {task.description && (
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                                  {task.description}
                                </p>
                              )}
                              
                              <div className="flex items-center space-x-3">
                                <Badge variant="outline" className="flex items-center space-x-1">
                                  {getCategoryIcon(task.category)}
                                  <span className="capitalize">{task.category}</span>
                                </Badge>
                                <Badge variant="outline" className="capitalize">
                                  {task.priority}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {new Date(task.createdAt).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingTask(task)}
                              className="p-2 text-gray-500 hover:text-blue-600"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteTask(task.id)}
                              className="p-2 text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredTasks.length === 0 && (
                <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <CardContent className="p-12 text-center">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      Nenhuma tarefa encontrada
                    </h3>
                    <p className="text-gray-500">
                      {filter === 'all' ? 'Adicione sua primeira tarefa!' : `Nenhuma tarefa ${filter} encontrada.`}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Painel Lateral */}
          <div className="space-y-6">
            {/* Configurações */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Configurações</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Modo Escuro</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="p-2"
                  >
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Estatísticas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.completed).length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Concluídas</div>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{tasks.filter(t => !t.completed).length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Pendentes</div>
                </div>
              </CardContent>
            </Card>

            {/* IA Assistant */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>Assistente IA</span>
                </CardTitle>
                <CardDescription>
                  Dicas inteligentes para melhorar sua produtividade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      💡 Você tem {tasks.filter(t => t.priority === 'high' && !t.completed).length} tarefas de alta prioridade pendentes.
                    </p>
                  </div>
                  <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      🎯 Que tal focar nas tarefas mais importantes primeiro?
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog de Sugestão da IA */}
      <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>Sugestão da IA</span>
            </DialogTitle>
            <DialogDescription>
              Sua assistente inteligente tem uma dica para você!
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">{aiSuggestion}</p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAiDialog(false)}>
              Dispensar
            </Button>
            <Button onClick={() => setShowAiDialog(false)}>
              Obrigado!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Edição */}
      {editingTask && (
        <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Tarefa</DialogTitle>
              <DialogDescription>
                Faça as alterações necessárias na sua tarefa
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                placeholder="Título da tarefa"
              />
              <Textarea
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                placeholder="Descrição"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select value={editingTask.priority} onValueChange={(value) => setEditingTask({ ...editingTask, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={editingTask.category} onValueChange={(value) => setEditingTask({ ...editingTask, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Pessoal</SelectItem>
                    <SelectItem value="work">Trabalho</SelectItem>
                    <SelectItem value="study">Estudos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingTask(null)}>
                Cancelar
              </Button>
              <Button onClick={() => updateTask(editingTask.id, editingTask)}>
                Salvar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
