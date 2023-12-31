import expensesI18n from '@/modules/expenses/i18n';
import earningsI18n from '@/modules/earnings/i18n';

export const languages = {
  en: 'English',
  'pt-br': 'Português',
};

export type Lang = keyof typeof languages;

export const defaultLang = 'en';

export const ui = {
  en: {
    'back': 'Back',
    'save': 'Save',
    'saving': 'Saving...',
    'saved': 'Saved!',
    'success': 'Success',
    'nav.home': 'Home',
    'nav.support': 'Support',
    'login.google': 'Login with Google',
    'pagetitle.app': 'Dashboard',
    'pagetitle.home': 'Login',
    'insertmodal.title': 'Add data',
    'dashboard.empty': 'No data to show',
    'data.date': 'Date',
    'data.amount': 'Amount',
    'data.edit': 'Edit data',
    'data.fixed': 'Recurring',
    'months.0': 'January',
    'months.1': 'February',
    'months.2': 'March',
    'months.3': 'April',
    'months.4': 'May',
    'months.5': 'June',
    'months.6': 'July',
    'months.7': 'August',
    'months.8': 'September',
    'months.9': 'October',
    'months.10': 'November',
    'months.11': 'December',
    'modetoggler.label': 'Toggle theme',
    'modetoggler.light': 'Light',
    'modetoggler.dark': 'Dark',
    'modetoggler.system': 'System',
    ...earningsI18n.en,
    ...expensesI18n.en
  },
  'pt-br': {
    'back': 'Voltar',
    'save': 'Salvar',
    'saving': 'Salvando...',
    'saved': 'Salvo!',
    'success': 'Sucesso',
    'nav.home': 'Início',
    'nav.support': 'Suporte',
    'login.google': 'Entrar com o Google',
    'pagetitle.app': 'Painel',
    'pagetitle.home': 'Entrar',
    'insertmodal.title': 'Adicionar dados',
    'dashboard.empty': 'Nenhum dado para mostrar',
    'data.date': 'Data',
    'data.amount': 'Valor',
    'data.edit': 'Editar dados',
    'data.fixed': 'Recorrente',
    'months.0': 'Janeiro',
    'months.1': 'Fevereiro',
    'months.2': 'Março',
    'months.3': 'Abril',
    'months.4': 'Maio',
    'months.5': 'Junho',
    'months.6': 'Julho',
    'months.7': 'Agosto',
    'months.8': 'Setembro',
    'months.9': 'Outubro',
    'months.10': 'Novembro',
    'months.11': 'Dezembro',
    'modetoggler.label': 'Alternar tema',
    'modetoggler.light': 'Claro',
    'modetoggler.dark': 'Escuro',
    'modetoggler.system': 'Sistema',
    ...earningsI18n['pt-br'],
    ...expensesI18n['pt-br']
  },
} as const;