# OpenALM — Product Requirements Document (PRD)

| Documento | Versão | Status | Data de Criação | Escopo |
| :--- | :--- | :--- | :--- | :--- |
| **PRD — OpenALM** | 1.0.0 | Aprovado | 2026-11-16 | Monorepo OpenALM (`apps/`, `libs/`) |

---

## 1. Visão Geral do Produto e Objetivos

### 1.1 Declaração de Visão
O **OpenALM (Application Lifecycle Management)** é uma plataforma integrada voltada à gestão completa do ciclo de vida de aplicações de software corporativas. O sistema conecta e orquestra a colaboração entre equipes de Negócio, Desenvolvimento, Engenharia de Qualidade (QA) e Operações (DevOps/SRE), garantindo rastreabilidade, governança e conformidade desde a concepção dos requisitos até a descontinuação do software.

A plataforma adota uma **arquitetura orientada a serviços distribuídos (Microservices)** e **mensageria assíncrona orientada a eventos (EDA - Event-Driven Architecture)**, estruturada em monorepo pnpm com desacoplamento de responsabilidades entre serviços de borda (API Gateway), serviços de domínio (Usuários, Organizações, Projetos, Auditoria) e clientes frontend especializados (Angular 22 e Next.js 16).

### 1.2 As 5 Etapas do ALM Cobertas pelo Produto
O OpenALM é projetado para suportar organicamente as cinco fases essenciais do ciclo de vida de aplicações:
1. **Gerenciamento de Requisitos:** Captura de necessidades de negócio, especificação de funcionalidades, versionamento de requisitos e critérios de aceite.
2. **Desenvolvimento:** Gestão de sprints, tarefas, repositórios de código, branch-protection e vinculação de artefatos de código a itens de trabalho.
3. **Testes e Garantia de Qualidade (QA):** Gestão de planos de teste, automação de testes unitários/integrados/e2e, cobertura de código e registro de defeitos.
4. **Implementação & Entrega Contínua (DevOps):** Integração com pipelines CI/CD, orquestração de deploy, monitoramento de saúde de contêineres e telemetria de produção.
5. **Manutenção e Otimização Contínuas:** Monitoramento em tempo real (Prometheus/Grafana), alertas operacionais, auditoria centralizada de eventos e melhorias evolutivas.

### 1.3 Objetivos de Negócio
- **Reduzir o Time-to-Market:** Centralizar a visão de ciclo de vida das aplicações em uma interface única e serviços desacoplados.
- **Garantir Alta Resiliência Operacional:** Prover tolerância a falhas na camada de borda via Circuit Breakers e mensageria garantida (RabbitMQ).
- **Prover Trilha de Auditoria Auditável:** Registrar 100% dos eventos críticos de acesso, falhas de autenticação e modificações estruturais em repositório seguro de auditoria.
- **Escalabilidade Horizontal Independente:** Permitir o escalonamento independente de serviços de alto tráfego (autenticação, catálogo e gateway) sem impactar módulos de gestão corporativa.

---

## 2. Personas e Casos de Uso Principais

| Persona | Papel | Objetivos Principais | Dores Enfrentadas |
| :--- | :--- | :--- | :--- |
| **Administrador / Gestor ALM** | Líder de Governança e TI | Cadastrar organizações, definir perfis de acesso, auditar logs de conformidade. | Falta de visibilidade integrada das subsidiárias/unidades e conformidade de segurança. |
| **Product Owner / Business Analyst** | Gestão de Negócios e Requisitos | Estruturar projetos, registrar demandas, acompanhar entregas das filiais. | Desconexão entre o plano de negócio e os módulos em execução em produção. |
| **Engenheiro de Software** | Desenvolvimento de Aplicações | Integrar serviços, consumir APIs documentadas no Swagger, testar componentes. | Dificuldade em debugar integrações sem documentação clara ou logs descentralizados. |
| **Engenheiro de SRE / DevOps** | Infraestrutura e Operação | Monitorar métricas do cluster, acompanhar alertas no Prometheus/Grafana, garantir uptime. | Falta de instrumentação padronizada e gargalos não identificados na camada de gateway. |
| **Operador de Filial / Usuário** | Operação de Negócio na Ponta | Acessar painel da filial com rapidez, gerenciar dados da sua unidade operacional. | Lentidão no login, interfaces confusas e instabilidades frequentes de backend. |

---

## 3. Requisitos Funcionais (RF)

Os requisitos funcionais estão organizados por domínio e serviço do monorepo:

### 3.1 Módulo API Gateway ([`apps/gateway`](file:///home/tales/workspaceIA/openalm/apps/gateway/))
- **RF-001 — Ponto Único de Entrada e Roteamento:** O sistema deve centralizar todo o tráfego HTTP/HTTPS externo através do API Gateway na porta `3000`, roteando as requisições para os microsserviços correspondentes conforme mapeado em [`gateway.config.ts`](file:///home/tales/workspaceIA/openalm/apps/gateway/src/config/gateway.config.ts).
- **RF-002 — Enriquecimento de Requisições via Proxy:** Ao encaminhar requisições aos serviços downstream através do [`ProxyService`](file:///home/tales/workspaceIA/openalm/apps/gateway/src/proxy/proxy.service.ts), o Gateway deve injetar o cabeçalho HTTP `X-User-Info` contendo os dados autenticados do usuário (`userId`, `email`, `role`).
- **RF-003 — Proteção por Rate Limiting Multi-camadas:** O Gateway deve aplicar limites de taxa configuráveis por IP e rota através de [`CustomThrottlerGuard`](file:///home/tales/workspaceIA/openalm/apps/gateway/src/guards/throttler.guard.ts):
  - *Short tier:* 10 requisições por segundo.
  - *Medium tier:* 100 requisições por minuto.
  - *Long tier:* 1.000 requisições a cada 15 minutos.
  - *Rotas sensíveis de login:* limite estrito de 5 requisições por minuto por IP.
- **RF-004 — Proteção de Falhas em Cascata (Circuit Breaker):** Cada rota proxied deve ser protegida pelo [`CircuitBreakerService`](file:///home/tales/workspaceIA/openalm/apps/gateway/src/circuit-break/circuit-break.service.ts), chaveado por serviço (`proxy-{serviceName}`). Caso o número de falhas consecutivas atinja o limite (`failureThreshold: 3`), o circuito deve transitar para o estado `OPEN`, acionando fallback ou retornando erro HTTP 503 com mensagem amigável sem derrubar o Gateway.
- **RF-005 — Catálogo Centralizado de APIs (Swagger/OpenAPI):** O Gateway deve expor na rota `/api` a documentação interativa gerada dinamicamente via OpenAPI ([`main.ts`](file:///home/tales/workspaceIA/openalm/apps/gateway/src/main.ts#L64-L101)), consolidando todos os contratos e autenticações JWT.

### 3.2 Módulo de Autenticação e Usuários ([`apps/users`](file:///home/tales/workspaceIA/openalm/apps/users/))
- **RF-006 — Cadastro Seguro de Usuários:** O sistema deve permitir o registro de novos usuários através do endpoint `POST /register`, persistindo dados na tabela `tb_user` ([`User`](file:///home/tales/workspaceIA/openalm/apps/users/src/entities/user.entity.ts)) com identificador único UUIDv4, hash de senha Bcrypt (fator de custo 10) e timestamps automáticos.
- **RF-007 — Autenticação de Usuários:** O endpoint `POST /login` deve autenticar o usuário validando a existência na base, o status ativo (`active = true`) e a correspondência da senha criptografada.
- **RF-008 — Criptografia de Trânsito Pré-Envio:** A senha enviada pelo frontend deve ser recebida criptografada via algoritmo AES com chave rotativa diária pelo componente [`Encriptor`](file:///home/tales/workspaceIA/openalm/libs/core/src/encrypts/Encriptor.ts), sendo descriptografada no backend antes da validação do hash Bcrypt.
- **RF-009 — Emissão de Token JWT Seguro:** Após o sucesso da autenticação, o serviço deve emitir um token JWT assinado contendo no payload: `sub` (ID do usuário), `username`, `nome`, `perfil` e `hostIP` (IP de origem do cliente), com tempo de expiração definido em variável de ambiente (padrão: 300 segundos).
- **RF-010 — Validação de Integridade do IP no Token:** O sistema deve prover o método `checkToken` para validar não apenas a assinatura e expiração do JWT, mas também a integridade do IP de origem (`hostIP`), revogando imediatamente o acesso se houver discrepância de rede.
- **RF-011 — Gestão de Perfis de Acesso (RBAC):** O serviço deve suportar a associação de usuários a perfis cadastrados na tabela `tb_perfil` (ex.: `ADMIN`, `GESTOR`, `DESENVOLVEDOR`, `QA`, `OPERADOR`), controlando permissões por meio do decorator [`@Roles`](file:///home/tales/workspaceIA/openalm/libs/core/src/decorators/roles.decorator.ts).

### 3.3 Módulo de Organizações e Filiais ([`apps/organizations`](file:///home/tales/workspaceIA/openalm/apps/organizations/))
- **RF-012 — Cadastro de Organizações:** O sistema deve permitir o cadastro de entidades corporativas através de `POST /create`, armazenando na tabela `tb_organization` ([`Organization`](file:///home/tales/workspaceIA/openalm/apps/organizations/src/entities/organization.entity.ts)) os atributos: `id` (UUID), `code` (código de identificação), `sigla`, `nome` e `email`.
- **RF-013 — Regras de Unicidade Organizacional:** O serviço deve assegurar que os campos `code`, `sigla` e `email` sejam globalmente únicos na base de dados através de índices exclusivos (`uk_organizationCode`, `uk_organizationSigla`, `uk_organizationEmail`).
- **RF-014 — Consulta de Organizações:** O sistema deve disponibilizar endpoint `GET /all` (exposto no Gateway como `GET /api/organizations`) para listagem completa de todas as organizações e filiais ativas.

### 3.4 Módulo de Auditoria e Mensageria ([`apps/loggers`](file:///home/tales/workspaceIA/openalm/apps/loggers/) e [`libs/events`](file:///home/tales/workspaceIA/openalm/libs/events/))
- **RF-015 — Publicação Confiável de Eventos:** Todos os serviços do ecossistema devem publicar eventos de auditoria e segurança através do [`EventMessageService`](file:///home/tales/workspaceIA/openalm/libs/events/src/event.service.ts) na exchange de tópicos `loggers`, usando a routing key `logger-message`.
- **RF-016 — Consumo e Persistência de Logs de Auditoria:** O microsserviço [`LoggerConsumerService`](file:///home/tales/workspaceIA/openalm/apps/loggers/src/logger.consume.ts) deve se subscrever na fila durável `logger-queue`, consumindo as mensagens, truncando payloads acima de 1.000 caracteres e persistindo o registro na tabela `tb_mensagem` ([`Audit`](file:///home/tales/workspaceIA/openalm/apps/loggers/src/entities/audit.entity.ts)) com os campos: `id`, `origem`, `acao`, `mensagem`, `created_at` e `updated_at`.
- **RF-017 — Registro de Falhas Críticas:** Casos de indisponibilidade de serviços (como queda do serviço de Usuários detectada pelo Gateway), falhas de login por credenciais inválidas e sucessos de cadastros devem gerar obrigatoriamente um registro de auditoria com confirmação via ACK/NACK no RabbitMQ.

### 3.5 Módulos de Operação e Domínio de Suporte
- **RF-018 — Catálogo de Produtos e Serviços ([`apps/products`](file:///home/tales/workspaceIA/openalm/apps/products/)):** Prover endpoints de listagem, catálogo e verificação de saúde operacional (`/health`).
- **RF-019 — Checkout e Processamento de Itens ([`apps/checkouts`](file:///home/tales/workspaceIA/openalm/apps/checkouts/)):** Prover endpoints de inicialização de processos e métricas de negócio dedicadas.
- **RF-020 — Processamento Financeiro e Pagamentos ([`apps/payments`](file:///home/tales/workspaceIA/openalm/apps/payments/)):** Registrar eventos de pagamentos com categorização de recusas (`limit_exceeded`, `card_declined`) e telemetria.
- **RF-021 — Notificações e Comunicações ([`apps/emails`](file:///home/tales/workspaceIA/openalm/apps/emails/)):** Prover serviço de mensageria para envio de confirmações e alertas por e-mail.

### 3.6 Portal Filial Frontend ([`apps/filial`](file:///home/tales/workspaceIA/openalm/apps/filial/))
- **RF-022 — Interface Angular 22 Standalone:** O frontend da filial deve operar em Angular 22 sem módulos NgModule clássicos, com detecção de mudança `OnPush` e gerenciamento de estado via Signals.
- **RF-023 — Fluxo de Abertura e Landing Page:** O sistema deve apresentar páginas dinâmicas de abertura (`/access`) com abas de objetivos, vantagens, funcionalidades, releases e contato.
- **RF-024 — Criptografia de Senha Client-Side:** O serviço de autenticação do frontend ([`LoginService`](file:///home/tales/workspaceIA/openalm/apps/filial/src/services/LoginService.ts)) deve criptografar a senha do usuário em AES no navegador antes da transmissão HTTP via [`Encriptor`](file:///home/tales/workspaceIA/openalm/libs/core/src/encrypts/Encriptor.ts).
- **RF-025 — Painel de Gestão da Unidade:** A área logada (`/home`) deve permitir visualização das organizações (`/home/organizations`), projetos (`/home/projects`), usuários (`/home/users`) e configurações do sistema.

### 3.7 Portal Web Frontend ([`apps/web`](file:///home/tales/workspaceIA/openalm/apps/web/))
- **RF-026 — Interface Next.js 16 / React 19:** O portal web público e corporativo deve disponibilizar experiência responsiva, estilizada com Tailwind CSS v4, otimizada para SEO e Server-Side Rendering (SSR).

---

## 4. Requisitos Não Funcionais (RNF)

| Identificador | Categoria | Descrição Técnica | Métrica / Critério de Aceite |
| :--- | :--- | :--- | :--- |
| **RNF-SEG-001** | Segurança | Criptografia assimétrica/simétrica de senhas em trânsito e em repouso. | A senha nunca deve trafegar em texto claro na rede; o armazenamento deve utilizar Bcrypt com salt rounds = 10. |
| **RNF-SEG-002** | Segurança | Proteção de cabeçalhos HTTP com Helmet. | Imposição de HSTS (maxAge: 31536000s), Content Security Policy (CSP), desabilitação de cross-origin embedder. |
| **RNF-SEG-003** | Segurança | Controle de acesso baseado em Tokens JWT com amarração de IP de rede. | Token rejeitado se `hostIP` do payload divergir do socket de origem. |
| **RNF-SEG-004** | Segurança | Prevenção contra ataques DoS/Brute Force via Rate Limiting. | Bloqueio automático com status HTTP 429 após 5 tentativas de login por minuto por IP. |
| **RNF-PERF-001**| Desempenho| Tempo de resposta do Gateway para requisições roteadas. | Latência média adicionada pelo Gateway < 15ms; 95% das respostas completas em < 200ms sob carga normal. |
| **RNF-PERF-002**| Desempenho| Processamento assíncrono de logs e auditoria. | Operações de negócio não podem bloquear aguardando gravação de logs (publicação assíncrona RabbitMQ em < 5ms). |
| **RNF-DISP-001**| Disponibilidade| Tolerância a falhas na comunicação inter-serviços via Circuit Breaker. | Abertura do circuito após 3 falhas consecutivas; recuperação automática no estado Half-Open após 30 segundos. |
| **RNF-DISP-002**| Disponibilidade| Disponibilidade geral do cluster de microsserviços. | Meta de 99,9% de disponibilidade (SLA corporativo). |
| **RNF-CONF-001**| Confiabilidade| Persistência e garantia de entrega de mensagens AMQP. | Filas e exchanges configuradas como `durable: true`, mensagens marcadas como persistentes; garantia de ACK/NACK. |
| **RNF-ESCAL-001**| Escalabilidade| Arquitetura Stateless em todos os nós de backend. | Nenhuma sessão HTTP mantida em memória local do processo; suporte a múltiplas réplicas atrás de Load Balancer. |
| **RNF-OBS-001** | Observabilidade| Instrumentação e coleta de métricas em tempo real. | Exposição padronizada de endpoint `/metrics` em formato Prometheus em todos os serviços; scrape a cada 15 segundos. |
| **RNF-OBS-002** | Observabilidade| Painéis de visualização e telemetria operacional. | Dashboards Grafana provisionados automaticamente para visão geral e detalhamento por serviço. |
| **RNF-OBS-003** | Observabilidade| Healthchecks nativos para orquestração. | Endpoints `/health` em todos os microsserviços e contêineres com probes de verificação a cada 30 segundos. |
| **RNF-MANT-001**| Manutenibilidade| Estrutura de código em Monorepo com pnpm workspaces. | Compartilhamento estrito de tipos, contratos e utilitários via `libs/core` e `libs/events`; separação estrita de apps. |
| **RNF-TEST-001**| Testabilidade | Cobertura abrangente de suítes de testes. | Suporte a testes unitários, de integração e e2e via Vitest 4.x nos backends e Jest/Angular test nos frontends. |

---

## 5. Regras de Negócio (RN)

- **RN-001 — Unicidade de Identificação Organizacional:** Não é permitido o cadastro de duas organizações com mesmo `code`, mesma `sigla` ou mesmo `email`. A tentativa de duplicação deve disparar erro com status HTTP 409 ou exceção com mensagem explicativa.
- **RN-002 — Inatividade de Usuários:** Usuários com a flag `active = false` na base `tb_user` estão sumariamente impedidos de autenticar no sistema, retornando HTTP 403 (*Usuário inativo*) mesmo que a senha informada esteja correta.
- **RN-003 — Validação Temporal de Senhas Criptografadas:** Senhas cifradas no cliente utilizam parâmetros dinâmicos rotativos no [`Encriptor`](file:///home/tales/workspaceIA/openalm/libs/core/src/encrypts/Encriptor.ts). Uma cifra gerada fora da janela de validação não pode ser descriptografada com sucesso, prevenindo ataques de replay.
- **RN-004 — Truncamento Seguro de Auditoria:** Mensagens de log encaminhadas ao serviço de auditoria que excedam 1.000 caracteres devem ser truncadas de forma determinística antes da inserção na coluna `mensagem` da tabela `tb_mensagem`, prevenindo estouro de buffer no banco relacional.
- **RN-005 — Política de Fallback em Queda de Microsserviço:** Se um microsserviço downstream (ex: `users-service`) estiver indisponível ou com o Circuit Breaker aberto:
  - O Gateway deve registrar o incidente através do evento `falha-acesso-microservico` na fila de auditoria.
  - O Gateway deve responder ao consumidor com status HTTP 503 ou retorno de cache degradado quando aplicável.
- **RN-006 — Isolamento de Tenants por Organização:** Usuários autenticados têm escopo de visualização e ação restrito à organização à qual estão vinculados, validado via cabeçalho enriquecido `X-User-Info` e guardas de rota [`RoleGuard`](file:///home/tales/workspaceIA/openalm/apps/gateway/src/guards/role.guard.ts).

---

## 6. Roadmap do Produto e Critérios de Aceite

```
                                  CRONOGRAMA DO PRODUTO
  ----------------------------------------------------------------------------------------
  v0.1.0 (Q3/2026 - CANDIDATE)                      v1.0.0 (Q1/2027 - GENERAL RELEASE)
  - API Gateway resiliente (Circuit Breaker/Proxy)   - Módulo Completo de Gestão de Projetos ALM
  - Autenticação JWT com validação de IP            - Rastreabilidade de Requisitos e Bugs
  - Gestão de Organizações e Usuários               - Integração CI/CD & Deploy Automatizado
  - Auditoria assíncrona RabbitMQ -> PostgreSQL     - Dashboard Executivo com Métricas de Engenharia
  - Observabilidade Prometheus + Grafana            - Interface Web Next.js 16 para Gestores
  - Portal Filial Angular 22 Standalone             - Suporte a Multi-tenancy federado Keycloak
  ----------------------------------------------------------------------------------------
```

### 6.1 Critérios de Aceite para a Versão v0.1.0 (Atual)
- [x] API Gateway inicializado na porta 3000 com roteamento dinâmico para todos os serviços downstream.
- [x] Circuito de proteção implementado com transições entre `CLOSED`, `OPEN` e `HALF_OPEN`.
- [x] Autenticação de usuários funcional com pré-criptografia no frontend e hash Bcrypt no banco.
- [x] Registro e consumo de auditoria assíncrona funcional via RabbitMQ e TypeORM no PostgreSQL 17.
- [x] Docker Compose da infraestrutura levantando PostgreSQL, RabbitMQ, Prometheus e Grafana sem intervenção manual.
- [x] Frontend Filial em Angular 22 com rotas navegáveis, componentes standalone e layout responsivo.

### 6.2 Critérios de Aceite para a Versão v1.0.0 (Próxima Fase)
- [ ] Módulo dedicado de Projetos ALM com modelo de dados para demandas, tarefas e sprints.
- [ ] Integração com pipelines externos de CI/CD (GitHub Actions, GitLab CI).
- [ ] Dashboards executivos consolidados com métricas DORA (Deployment Frequency, Lead Time, Change Failure Rate, MTTR).
- [ ] Autenticação federada SSO via Keycloak (suporte já preparado no ambiente Angular).
