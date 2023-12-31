import { ui as buyTranslations } from '@/modules/buy/translations'
import { ui as productTranslations } from '@/modules/product/translations'
import { ui as sellTranslations } from '@/modules/sell/translations'

export const languages = {
  en: 'English',
  'pt-BR': 'Português',
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
    'add': 'Add',
    'edit': 'Edit',
    'nav.home': 'Dashboard',
    'nav.support': 'Support',
    'login.google': 'Login with Google',
    'pagetitle.home': 'Login',
    'pagetitle.app': 'Dashboard',
    'pagedescription.app': 'Overview of your financial life',
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
    'red': 'Red',
    'green': 'Green',
    'blue': 'Blue',
    'slate': 'Slate',
    'purple': 'Purple',
    'orange': 'Orange',
    'lime': 'Lime',
    'rose': 'Rose',
    'gray': 'Gray',
    'yellow': 'Yellow',
    'cyan': 'Cyan',
    'violet': 'Violet',
    'pink': 'Pink',
    ...buyTranslations.en,
    ...productTranslations.en,
    ...sellTranslations.en,
  },
  'pt-BR': {
    'back': 'Voltar',
    'save': 'Salvar',
    'saving': 'Salvando...',
    'saved': 'Salvo!',
    'success': 'Sucesso',
    'edit': 'Editar',
    'add': 'Adicionar',
    'nav.home': 'Painel',
    'nav.support': 'Suporte',
    'login.google': 'Entrar com o Google',
    'pagetitle.home': 'Entrar',
    'pagetitle.app': 'Painel',
    'pagedescription.app': 'Visão geral da sua vida financeira',
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
    'red': 'Vermelho',
    'green': 'Verde',
    'blue': 'Azul',
    'slate': 'Ardósia',
    'purple': 'Roxo',
    'orange': 'Laranja',
    'lime': 'Limão',
    'rose': 'Rosê',
    'gray': 'Cinza',
    'yellow': 'Amarelo',
    'cyan': 'Ciano',
    'violet': 'Violeta',
    'pink': 'Rosa',
    ...buyTranslations['pt-BR'],
    ...productTranslations['pt-BR'],
    ...sellTranslations['pt-BR'],
  },
} as const;