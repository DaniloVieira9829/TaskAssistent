import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { 
  Brain, 
  Send, 
  User, 
  Bot, 
  Lightbulb, 
  Target, 
  Clock, 
  Zap,
  MessageCircle,
  Sparkles,
  RefreshCw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Olá! Sou sua assistente de produtividade. Como posso ajudar você a organizar melhor suas tarefas hoje?',
      timestamp: new Date(),
      suggestions: ['Organizar tarefas', 'Dicas de produtividade', 'Priorizar atividades']
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Respostas pré-definidas da IA
  const aiResponses = {
    'organizar': [
      'Vou te ajudar a organizar suas tarefas! Aqui estão algumas dicas:\n\n1. **Categorize por contexto**: Separe tarefas pessoais, trabalho e estudos\n2. **Use a matriz de Eisenhower**: Classifique por urgência e importância\n3. **Defina prazos realistas**: Evite sobrecarga\n4. **Revise diariamente**: Ajuste conforme necessário',
      'Para uma organização eficaz, sugiro:\n\n• **Time blocking**: Reserve blocos de tempo específicos\n• **Regra dos 2 minutos**: Se leva menos de 2 min, faça agora\n• **Batch similar tasks**: Agrupe tarefas similares\n• **Use lembretes visuais**: Cores e ícones ajudam'
    ],
    'produtividade': [
      'Aqui estão técnicas comprovadas para aumentar sua produtividade:\n\n🍅 **Técnica Pomodoro**: 25 min focado + 5 min pausa\n🎯 **Foco único**: Uma tarefa por vez\n⚡ **Elimine distrações**: Notificações off durante trabalho\n🔄 **Revise e ajuste**: Analise o que funciona',
      'Dicas para ser mais produtivo:\n\n• **Comece pelo mais difícil**: Tackle the frog first\n• **Prepare na noite anterior**: Lista do próximo dia\n• **Use deadlines artificiais**: Crie urgência saudável\n• **Celebre pequenas vitórias**: Mantenha motivação'
    ],
    'priorizar': [
      'Para priorizar efetivamente:\n\n🔴 **Alta prioridade**: Urgente + Importante\n🟡 **Média prioridade**: Importante, não urgente\n🟢 **Baixa prioridade**: Urgente, não importante\n⚪ **Eliminar**: Nem urgente, nem importante',
      'Métodos de priorização:\n\n• **Método ABCDE**: A=Must do, B=Should do, C=Could do, D=Delegate, E=Eliminate\n• **Valor vs Esforço**: Alto valor + baixo esforço primeiro\n• **Impacto a longo prazo**: Pense no futuro\n• **Energia pessoal**: Tarefas difíceis quando tem mais energia'
    ],
    'motivacao': [
      'Para manter a motivação:\n\n✨ **Visualize o resultado**: Imagine o sucesso\n🎯 **Metas pequenas**: Progresso constante\n🏆 **Sistema de recompensas**: Celebre conquistas\n👥 **Accountability**: Compartilhe metas com outros',
      'Estratégias motivacionais:\n\n• **Encontre seu "porquê"**: Propósito por trás das tarefas\n• **Progresso visual**: Use gráficos e checklists\n• **Ambiente positivo**: Organize seu espaço\n• **Mindset de crescimento**: Veja desafios como oportunidades'
    ],
    'tempo': [
      'Gestão de tempo eficaz:\n\n⏰ **Audit seu tempo**: Rastreie onde gasta tempo\n📅 **Planejamento semanal**: Visão geral da semana\n🚫 **Aprenda a dizer não**: Proteja seu tempo\n⚡ **Automatize rotinas**: Use tecnologia a favor',
      'Técnicas de gestão de tempo:\n\n• **Time boxing**: Limite tempo para cada tarefa\n• **Buffer time**: Reserve tempo extra entre atividades\n• **Batch processing**: Agrupe tarefas similares\n• **Review regular**: Analise e otimize semanalmente'
    ]
  }

  const quickSuggestions = [
    'Como organizar melhor minhas tarefas?',
    'Dicas para ser mais produtivo',
    'Como priorizar atividades?',
    'Técnicas de gestão de tempo',
    'Como manter motivação?',
    'Eliminar procrastinação'
  ]

  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    // Detectar palavras-chave e retornar resposta apropriada
    if (lowerMessage.includes('organiz') || lowerMessage.includes('estrutur')) {
      const responses = aiResponses.organizar
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    if (lowerMessage.includes('produtiv') || lowerMessage.includes('efici')) {
      const responses = aiResponses.produtividade
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    if (lowerMessage.includes('prioriz') || lowerMessage.includes('import')) {
      const responses = aiResponses.priorizar
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    if (lowerMessage.includes('motiv') || lowerMessage.includes('ânimo') || lowerMessage.includes('desânimo')) {
      const responses = aiResponses.motivacao
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    if (lowerMessage.includes('tempo') || lowerMessage.includes('horário') || lowerMessage.includes('agenda')) {
      const responses = aiResponses.tempo
      return responses[Math.floor(Math.random() * responses.length)]
    }
    
    // Respostas genéricas
    const genericResponses = [
      'Interessante pergunta! Para te ajudar melhor, você poderia ser mais específico sobre qual aspecto da produtividade te interessa?',
      'Entendo sua dúvida. Que tal começarmos identificando qual é seu maior desafio atual com organização de tarefas?',
      'Ótima questão! Posso te dar dicas sobre organização, priorização, gestão de tempo ou motivação. O que te interessa mais?',
      'Vou te ajudar! Para dar conselhos mais personalizados, me conte: qual é sua principal dificuldade no momento?'
    ]
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)]
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simular delay da IA
    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage)
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        suggestions: quickSuggestions.slice(0, 3)
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const sendSuggestion = (suggestion) => {
    setInputMessage(suggestion)
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: 'Chat limpo! Como posso ajudar você agora?',
        timestamp: new Date(),
        suggestions: ['Organizar tarefas', 'Dicas de produtividade', 'Priorizar atividades']
      }
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Chat com IA
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Converse com nossa assistente inteligente para obter dicas personalizadas de produtividade
          </p>
        </motion.div>

        {/* Chat Container */}
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-[600px] flex flex-col">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Assistente IA</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={clearChat}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Limpar
              </Button>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-blue-600' : 'bg-gradient-to-r from-purple-600 to-pink-600'}`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>

                        {/* Message Content */}
                        <div className={`p-4 rounded-2xl ${message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}>
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {message.content}
                          </div>
                          
                          {/* Timestamp */}
                          <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                            {message.timestamp.toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>

                          {/* AI Suggestions */}
                          {message.type === 'ai' && message.suggestions && (
                            <div className="mt-3 space-y-2">
                              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Sugestões:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7"
                                    onClick={() => sendSuggestion(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            {/* Quick Suggestions */}
            <div className="mb-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                <Lightbulb className="w-3 h-3 mr-1" />
                Sugestões rápidas:
              </div>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => sendSuggestion(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <Input
                placeholder="Digite sua pergunta sobre produtividade..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={sendMessage} 
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Features Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            {
              icon: <Target className="w-5 h-5" />,
              title: "Dicas Personalizadas",
              description: "Conselhos adaptados ao seu estilo de trabalho"
            },
            {
              icon: <Zap className="w-5 h-5" />,
              title: "Respostas Rápidas",
              description: "Soluções imediatas para seus desafios"
            },
            {
              icon: <Clock className="w-5 h-5" />,
              title: "Disponível 24/7",
              description: "Assistência sempre que você precisar"
            }
          ].map((feature, index) => (
            <Card key={index} className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-purple-600 mb-2 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
