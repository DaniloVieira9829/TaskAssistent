import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Mail, 
  Github, 
  MessageCircle, 
  HelpCircle, 
  Send, 
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Shield,
  Book,
  ExternalLink
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Support() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'support'
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simular envio do formulário
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'support'
      })
    }, 3000)
  }

  const faqItems = [
    {
      question: "Como funciona a IA do TaskAssistent?",
      answer: "Nossa IA analisa suas tarefas e padrões de uso para fornecer sugestões personalizadas de organização, priorização e produtividade. Ela aprende com seus hábitos para oferecer dicas cada vez mais relevantes."
    },
    {
      question: "Meus dados estão seguros?",
      answer: "Sim! Todas as suas tarefas são armazenadas localmente no seu dispositivo. Não coletamos nem compartilhamos informações pessoais. Consulte nossa Política de Privacidade para mais detalhes."
    },
    {
      question: "Como posso sincronizar entre dispositivos?",
      answer: "Atualmente, o TaskAssistent funciona localmente. Estamos trabalhando em uma funcionalidade de sincronização segura que será lançada em breve."
    },
    {
      question: "O aplicativo funciona offline?",
      answer: "Sim! O TaskAssistent funciona completamente offline. Você pode criar, editar e gerenciar suas tarefas sem conexão com a internet."
    },
    {
      question: "Como posso contribuir com o projeto?",
      answer: "O TaskAssistent é open source! Você pode contribuir através do nosso repositório no GitHub, reportando bugs, sugerindo melhorias ou contribuindo com código."
    }
  ]

  const supportChannels = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      description: "Para suporte técnico e dúvidas gerais",
      contact: "vieiradanilo272@gmail.com",
      responseTime: "24-48 horas",
      action: () => window.open('mailto:vieiradanilo272@gmail.com')
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: "GitHub",
      description: "Para reportar bugs e contribuições",
      contact: "DaniloVieira9829",
      responseTime: "1-3 dias",
      action: () => window.open('https://github.com/DaniloVieira9829', '_blank')
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Chat IA",
      description: "Assistente virtual para ajuda imediata",
      contact: "Disponível 24/7",
      responseTime: "Imediato",
      action: () => alert('Chat IA será implementado em breve!')
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Central de Suporte
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Estamos aqui para ajudar! Encontre respostas, entre em contato ou contribua com o projeto.
          </p>
        </motion.div>

        <Tabs defaultValue="faq" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
            <TabsTrigger value="docs">Documentação</TabsTrigger>
            <TabsTrigger value="contribute">Contribuir</TabsTrigger>
          </TabsList>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="w-6 h-6 text-blue-600" />
                    <span>Perguntas Frequentes</span>
                  </CardTitle>
                  <CardDescription>
                    Encontre respostas para as dúvidas mais comuns sobre o TaskAssistent
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">{item.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Contato */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Canais de Suporte */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Canais de Suporte</CardTitle>
                    <CardDescription>
                      Escolha o melhor canal para sua necessidade
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {supportChannels.map((channel, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                        onClick={channel.action}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                            {channel.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {channel.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              {channel.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-blue-600">
                                {channel.contact}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {channel.responseTime}
                              </Badge>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Formulário de Contato */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Envie uma Mensagem</CardTitle>
                    <CardDescription>
                      Preencha o formulário e entraremos em contato
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {submitted ? (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Mensagem Enviada!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Obrigado pelo contato. Responderemos em breve!
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Seu nome"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            required
                          />
                          <Input
                            type="email"
                            placeholder="Seu email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            required
                          />
                        </div>
                        
                        <Input
                          placeholder="Assunto"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          required
                        />
                        
                        <Textarea
                          placeholder="Sua mensagem..."
                          rows={5}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          required
                        />
                        
                        <Button type="submit" className="w-full">
                          <Send className="w-4 h-4 mr-2" />
                          Enviar Mensagem
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Documentação */}
          <TabsContent value="docs" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: <Book className="w-8 h-8" />,
                  title: "Guia do Usuário",
                  description: "Aprenda a usar todas as funcionalidades do TaskAssistent",
                  link: "#"
                },
                {
                  icon: <FileText className="w-8 h-8" />,
                  title: "Termos de Uso",
                  description: "Leia nossos termos e condições de uso",
                  link: "/docs/legal/TERMS_OF_USE.md"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Política de Privacidade",
                  description: "Entenda como protegemos seus dados",
                  link: "/docs/legal/PRIVACY_POLICY.md"
                },
                {
                  icon: <Github className="w-8 h-8" />,
                  title: "Documentação Técnica",
                  description: "Para desenvolvedores e contribuidores",
                  link: "https://github.com/DaniloVieira9829/TaskAssistent"
                },
                {
                  icon: <AlertCircle className="w-8 h-8" />,
                  title: "Problemas Conhecidos",
                  description: "Lista de bugs e limitações atuais",
                  link: "https://github.com/DaniloVieira9829/TaskAssistent/issues"
                },
                {
                  icon: <MessageCircle className="w-8 h-8" />,
                  title: "Changelog",
                  description: "Histórico de atualizações e melhorias",
                  link: "#"
                }
              ].map((doc, index) => (
                <Card key={index} className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-blue-600 mb-4 flex justify-center">
                      {doc.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {doc.description}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href={doc.link} target="_blank" rel="noopener noreferrer">
                        Acessar
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          {/* Contribuir */}
          <TabsContent value="contribute" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Github className="w-6 h-6 text-blue-600" />
                    <span>Contribua com o Projeto</span>
                  </CardTitle>
                  <CardDescription>
                    O TaskAssistent é open source! Sua contribuição é muito bem-vinda.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Como Contribuir</h3>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li>• Reporte bugs e problemas</li>
                        <li>• Sugira novas funcionalidades</li>
                        <li>• Melhore a documentação</li>
                        <li>• Contribua com código</li>
                        <li>• Traduza para outros idiomas</li>
                        <li>• Compartilhe com amigos</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Links Úteis</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="https://github.com/DaniloVieira9829/TaskAssistent" target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Repositório GitHub
                          </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="https://github.com/DaniloVieira9829/TaskAssistent/issues" target="_blank" rel="noopener noreferrer">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Reportar Bug
                          </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <a href="mailto:vieiradanilo272@gmail.com">
                            <Mail className="w-4 h-4 mr-2" />
                            Contato Direto
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Desenvolvido por Danilo Vieira
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Com ❤️ para a comunidade open source
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://github.com/DaniloVieira9829" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="mailto:vieiradanilo272@gmail.com">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
