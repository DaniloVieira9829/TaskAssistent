import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { 
  Home, 
  MessageCircle, 
  HelpCircle, 
  Brain,
  Menu,
  X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Importar componentes das páginas
import TaskManager from './TaskManager.jsx'
import AIChat from './AIChat.jsx'
import Support from './Support.jsx'

export default function Router() {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pages = [
    {
      id: 'home',
      name: 'Tarefas',
      icon: <Home className="w-5 h-5" />,
      component: TaskManager
    },
    {
      id: 'chat',
      name: 'Chat IA',
      icon: <MessageCircle className="w-5 h-5" />,
      component: AIChat
    },
    {
      id: 'support',
      name: 'Suporte',
      icon: <HelpCircle className="w-5 h-5" />,
      component: Support
    }
  ]

  const CurrentPageComponent = pages.find(page => page.id === currentPage)?.component || TaskManager

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Header */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">TaskAssistent</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                  Gerenciador Inteligente de Tarefas
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {pages.map((page) => (
                <Button
                  key={page.id}
                  variant={currentPage === page.id ? "default" : "ghost"}
                  onClick={() => setCurrentPage(page.id)}
                  className={`flex items-center space-x-2 ${
                    currentPage === page.id 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {page.icon}
                  <span>{page.name}</span>
                </Button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
              >
                <div className="space-y-2">
                  {pages.map((page) => (
                    <Button
                      key={page.id}
                      variant={currentPage === page.id ? "default" : "ghost"}
                      onClick={() => {
                        setCurrentPage(page.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full justify-start flex items-center space-x-2 ${
                        currentPage === page.id 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {page.icon}
                      <span>{page.name}</span>
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentPageComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
