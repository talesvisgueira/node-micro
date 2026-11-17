import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projetos',
  imports: [],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.scss'
})
export class ProjetosComponent {
  private readonly router = inject(Router);

  readonly routeInfo = computed(() => {
    const url = this.router.url;
    if (url.includes('objectives')) {
      return {
        title: 'Objetivos Institucionais do SEPPEx',
        badge: 'Planejamento Estratégico',
        desc: 'Garantir a exatidão, tempestividade e transparência no exame analítico das folhas de pagamento das Organizações Militares.',
        icon: 'bi-bullseye',
        bullets: [
          'Auditoria preventiva antes do fechamento bancário mensal',
          'Eliminação de pagamentos indevidos e inconsistências em rubricas',
          'Padronização de procedimentos entre todas as Regiões Militares',
          'Alinhamento com as determinações dos órgãos de controle interno e externo'
        ]
      };
    }
    if (url.includes('advantages')) {
      return {
        title: 'Vantagens & Benefícios do Sistema',
        badge: 'Eficiência e Economia',
        desc: 'Redução expressiva de prazos operacionais e garantia da integridade orçamentária do Exército Brasileiro.',
        icon: 'bi-stars',
        bullets: [
          'Redução de até 90% no tempo despendido para conferência manual de contracheques',
          'Trilha imutável de auditoria com rastreabilidade por operador e certificado',
          'Detecção inteligente de desvios em tabelas de adicionais e gratificações',
          'Emissão automática de certidões e relatórios de conformidade'
        ]
      };
    }
    if (url.includes('features')) {
      return {
        title: 'Recursos & Módulos da Plataforma',
        badge: 'Tecnologia de Ponta',
        desc: 'Arquitetura moderna baseada em microserviços e mensageria assíncrona para suporte a alto volume de registros.',
        icon: 'bi-grid-3x3-gap',
        bullets: [
          'Processamento de lotes com mensageria RabbitMQ 4 de alta vazão',
          'Autenticação federada com Keycloak e certificados digitais ICP-Brasil',
          'Persistência segura em PostgreSQL com isolamento de transações',
          'Interface moderna em Angular com carregamento instantâneo'
        ]
      };
    }
    if (url.includes('releases')) {
      return {
        title: 'Histórico de Versões & Lançamentos',
        badge: 'Versão 2.4.0',
        desc: 'Registro das atualizações e melhorias contínuas do sistema SEPPEx / OpenALM.',
        icon: 'bi-journal-code',
        bullets: [
          'v2.4.0: Interface modernizada, novos painéis de auditoria e conformidade visual',
          'v2.3.2: Otimização no barramento de mensageria RabbitMQ para lotes volumosos',
          'v2.2.0: Integração com novos módulos de cálculo de gratificação de localidade',
          'v2.1.0: Lançamento do módulo de auditoria contínua de pensões'
        ]
      };
    }
    if (url.includes('questions')) {
      return {
        title: 'Perguntas Frequentes & Diretrizes',
        badge: 'Base de Conhecimento',
        desc: 'Dúvidas frequentes de auditores, gestores de pagamento e operadores de Unidades Gestoras.',
        icon: 'bi-question-circle',
        bullets: [
          'Como reabrir um lote com apontamento para retificação pela UG?',
          'Quais são os prazos máximos para envio dos arquivos mensais de folha?',
          'Como cadastrar uma nova Organização Militar na plataforma?',
          'Procedimento de revogação de acessos de operadores transferidos'
        ]
      };
    }
    if (url.includes('contact')) {
      return {
        title: 'Central de Suporte & Atendimento',
        badge: 'Canais Oficiais',
        desc: 'Canais de suporte técnico e apoio normativo aos operadores de pagamento.',
        icon: 'bi-headset',
        bullets: [
          'Suporte Técnico: suporte.seppex@dgp.eb.mil.br',
          'Plantão Operacional: RITEx 822-4400 / (61) 3415-4400',
          'Horário de Atendimento: Dias úteis, das 08h00 às 18h00',
          'Chamados de Urgência: Portal de Atendimento Integrado OpenALM'
        ]
      };
    }
    if (url.includes('projects')) {
      return {
        title: 'Lotes de Exame de Folha',
        badge: 'Gestão de Lotes',
        desc: 'Acompanhamento do processamento mensal e emissão de pareceres de conformidade.',
        icon: 'bi-folder2-open',
        bullets: [
          'Visualização de lotes em processamento, em análise e homologados',
          'Filtro por Região Militar, Comando de Área ou Unidade Gestora',
          'Emissão de relatórios sintéticos e analíticos de divergências',
          'Validação automática de fechamento de competência'
        ]
      };
    }
    if (url.includes('users')) {
      return {
        title: 'Usuários, Perfis & Permissões',
        badge: 'Segurança de Acesso',
        desc: 'Controle de auditores, operadores e níveis de acesso por Organização Militar.',
        icon: 'bi-people',
        bullets: [
          'Gerenciamento de operadores por Unidade Gestora',
          'Auditoria de logins e histórico de operações efetuadas',
          'Habilitação de certificados ICP-Brasil para assinatura digital',
          'Níveis de privilégio: Administrador, Auditor Geral, Operador de OM'
        ]
      };
    }
    if (url.includes('settings')) {
      return {
        title: 'Configurações do Sistema',
        badge: 'Parametrização Central',
        desc: 'Configurações de infraestrutura, conexão de mensageria e regras de validação da folha.',
        icon: 'bi-sliders',
        bullets: [
          'Parametrização dos limites de alerta para rubricas específicas',
          'Configurações de integração com brokers RabbitMQ e serviços de mensageria',
          'Definição de calendários e datas limites de fechamento mensal',
          'Parâmetros de retenção de trilhas e logs de auditoria'
        ]
      };
    }
    return {
      title: 'Módulo do Sistema SEPPEx',
      badge: 'SEPPEx Corporativo',
      desc: 'Plataforma oficial de exame e conformidade da folha de pagamento.',
      icon: 'bi-shield-check',
      bullets: [
        'Ambiente corporativo seguro',
        'Auditoria e rastreabilidade ativa',
        'Conformidade com a legislação vigente'
      ]
    };
  });
}
