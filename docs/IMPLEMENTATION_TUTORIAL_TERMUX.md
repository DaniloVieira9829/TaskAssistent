# Tutorial de Implementação: TaskAssistent no Termux

Este tutorial detalhado guiará você através do processo de configuração e execução do seu Gerenciador de Tarefas Inteligente com IA (TaskAssistent) no ambiente Termux do seu celular. Seguiremos cada passo para garantir uma implementação bem-sucedida.

## 1. Pré-requisitos

Antes de começar, certifique-se de ter o seguinte:

*   **Aplicativo Termux:** Instalado no seu dispositivo Android. Você pode baixá-lo da [F-Droid](https://f-droid.org/packages/com.termux/) ou [Google Play Store](https://play.google.com/store/apps/details?id=com.termux).
*   **Conexão com a Internet:** Necessária para baixar pacotes e o repositório.
*   **Conta GitHub:** Para acessar o repositório do projeto.
*   **Token de Acesso Pessoal (PAT) do GitHub:** Se o repositório for privado ou se você planeja fazer commits (o que é recomendado). O token `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` foi usado para este projeto, mas você deve gerar o seu próprio se for fazer alterações.

## 2. Configuração Inicial do Termux

Abra o aplicativo Termux e execute os seguintes comandos para atualizar seus pacotes e instalar as ferramentas necessárias:

```bash
pkg update && pkg upgrade -y
pkg install git -y
pkg install nodejs-lts -y # Instala a versão LTS do Node.js
npm install -g pnpm # Instala o gerenciador de pacotes pnpm globalmente
```

*   `pkg update && pkg upgrade -y`: Atualiza a lista de pacotes e todos os pacotes instalados para suas versões mais recentes.
*   `pkg install git -y`: Instala o Git, que é essencial para clonar o repositório do GitHub.
*   `pkg install nodejs-lts -y`: Instala o Node.js (versão de suporte de longo prazo), necessário para executar aplicações JavaScript como o TaskAssistent.
*   `npm install -g pnpm`: Instala o `pnpm`, um gerenciador de pacotes rápido e eficiente para Node.js, que será usado para instalar as dependências do projeto.

## 3. Clonando o Repositório do GitHub

Agora, vamos clonar o repositório do TaskAssistent para o seu Termux. Certifique-se de estar no diretório `/home/ubuntu` (o diretório padrão ao abrir o Termux) ou navegue para onde deseja clonar o projeto.

```bash
cd ~ # Garante que você está no diretório home
git clone https://github.com/DaniloVieira9829/TaskAssistent.git
cd TaskAssistent/task-assistant
```

*   `git clone https://github.com/DaniloVieira9829/TaskAssistent.git`: Baixa todo o código do projeto para uma nova pasta chamada `TaskAssistent`.
*   `cd TaskAssistent/task-assistant`: Navega para o diretório onde a aplicação React está localizada.

## 4. Instalando as Dependências do Projeto

Dentro do diretório `TaskAssistent/task-assistant`, instale as dependências do projeto usando `pnpm`:

```bash
pnpm install
```

*   `pnpm install`: Lê o arquivo `package.json` e baixa todas as bibliotecas e módulos necessários para o projeto funcionar.

## 5. Executando a Aplicação

Com as dependências instaladas, você pode iniciar o servidor de desenvolvimento. Isso permitirá que você acesse a aplicação através do navegador do seu celular.

```bash
pnpm run dev --host
```

*   `pnpm run dev --host`: Inicia o servidor de desenvolvimento. O `--host` é crucial no Termux, pois permite que a aplicação seja acessível de outros dispositivos na mesma rede ou do próprio navegador do celular usando o endereço IP do Termux (geralmente `http://127.0.0.1:5173` ou `http://localhost:5173`).

Após executar este comando, o Termux exibirá uma mensagem indicando o endereço onde a aplicação está rodando. Geralmente será algo como:

```
  VITE v5.2.11  ready in 302 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.X.X:5173/ # (Se você tiver uma rede configurada)
  ➜  press h + enter to show help
```

Abra o navegador do seu celular e digite `http://localhost:5173/` (ou o endereço de rede fornecido, se preferir acessar de outro dispositivo na mesma rede) para ver o TaskAssistent em funcionamento.

## 6. Acessando a Documentação Legal

Os documentos de licença, termos de uso e política de privacidade estão localizados na pasta `docs/legal` dentro do repositório. Você pode acessá-los diretamente no GitHub ou visualizá-los no seu Termux.

Para visualizar no Termux (usando um visualizador de texto simples):

```bash
cd ~/TaskAssistent/docs/legal
cat LICENSE.md
cat TERMS_OF_USE.md
cat PRIVACY_POLICY.md
```

Para uma visualização mais formatada, você pode abrir esses arquivos diretamente no navegador do seu celular após a aplicação estar rodando, navegando para as rotas `/support` e clicando nos links correspondentes.

## 7. Estrutura do Projeto

O projeto `TaskAssistent` segue uma estrutura padrão de aplicação React, com os seguintes diretórios principais:

```
TaskAssistent/
├── .git/                  # Metadados do Git
├── docs/                  # Documentação do projeto
│   └── legal/             # Documentos legais (Licença, Termos de Uso, Política de Privacidade)
│       ├── LICENSE.md
│       ├── PRIVACY_POLICY.md
│       └── TERMS_OF_USE.md
├── task-assistant/        # Aplicação React principal
│   ├── public/            # Arquivos estáticos
│   ├── src/               # Código fonte da aplicação
│   │   ├── assets/        # Imagens e outros recursos
│   │   ├── components/    # Componentes React (TaskManager, AIChat, Support, Router)
│   │   ├── App.css        # Estilos globais da aplicação
│   │   ├── App.jsx        # Componente principal que gerencia o roteamento
│   │   ├── index.css      # Estilos Tailwind CSS e shadcn/ui
│   │   └── main.jsx       # Ponto de entrada da aplicação
│   ├── components.json    # Configuração do shadcn/ui
│   ├── index.html         # Arquivo HTML principal
│   ├── package.json       # Dependências e scripts do projeto
│   └── vite.config.js     # Configuração do Vite
└── SETUP.md               # Arquivo de configuração inicial (pode ser removido ou atualizado)
```

## 8. Próximos Passos e Contribuição

*   **Explore a Aplicação:** Comece a adicionar tarefas, use o chat com IA e explore as páginas de suporte.
*   **Personalize:** Sinta-se à vontade para modificar o código-fonte em `TaskAssistent/task-assistant/src/` para personalizar a aplicação de acordo com suas necessidades.
*   **Contribua:** Se você encontrar bugs, tiver sugestões de melhoria ou quiser adicionar novas funcionalidades, considere contribuir para o repositório no GitHub. Seu feedback e contribuições são muito valiosos!

**Desenvolvedor:** Danilo Vieira  
**GitHub:** [DaniloVieira9829](https://github.com/DaniloVieira9829)  
**Email de Suporte:** vieiradanilo272@gmail.com  
**Repositório:** https://github.com/DaniloVieira9829/TaskAssistent

---
