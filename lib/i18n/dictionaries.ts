import type { LocaleCode } from './config';

/** Shape of the UI message catalogue (chrome strings localised so far). */
export interface Messages {
  nav: {
    buy: string; sell: string; close: string;
    signIn: string; signUp: string;
    sellList: string; sellListDesc: string;
    sellNow: string; sellNowDesc: string;
    listWithCa: string; listWithCaDesc: string;
    brokerage: string; brokerageDesc: string;
  };
  search: {
    search: string; residential: string;
    tabs: { properties: string; newReleases: string; transactions: string; agents: string };
    sub: { all: string; offplan: string; ready: string; sold: string; rented: string; agents: string; companies: string };
    ph: { properties: string; newReleases: string; transactions: string; agents: string };
  };
  home: {
    notif: string; learnMore: string;
    heroTitle: string; heroSub: string;
    cards: { buy: string; sell: string; close: string; buyCta: string; sellCta: string; closeCta: string };
  };
}

const en: Messages = {
  nav: {
    buy: 'Buy', sell: 'Sell', close: 'Close',
    signIn: 'Sign in', signUp: 'Sign up',
    sellList: 'List your property', sellListDesc: 'List as the owner or POA',
    sellNow: 'Sell now', sellNowDesc: 'Sell directly through iClose',
    listWithCa: 'List with Contract A', listWithCaDesc: 'RERA Form A broker listing',
    brokerage: 'Brokerage portal', brokerageDesc: 'For agents, agencies & freelancers',
  },
  search: {
    search: 'Search', residential: 'Residential',
    tabs: { properties: 'Properties', newReleases: 'New Releases', transactions: 'Transactions', agents: 'Agents' },
    sub: { all: 'All', offplan: 'Off-plan', ready: 'Ready', sold: 'Sold', rented: 'Rented', agents: 'Agents', companies: 'Companies' },
    ph: {
      properties: 'City, community or building',
      newReleases: 'Location, project or developer',
      transactions: 'Search for any location in Dubai',
      agents: 'Enter location or agent name',
    },
  },
  home: {
    notif: 'Investing in Off-Plan? Get Special Pricing & Credits',
    learnMore: 'Learn More',
    heroTitle: 'Never Pay Commission to Buy, Sell, or Close Ever Again!',
    heroSub: 'Investing in Off-Plan? Get Special Pricing & Credits',
    cards: {
      buy: 'Buy with zero commission', sell: 'Sell without commission', close: 'Close & keep 100% commission',
      buyCta: 'How to buy', sellCta: 'How to sell', closeCta: 'How to close',
    },
  },
};

const ar: Messages = {
  nav: {
    buy: 'شراء', sell: 'بيع', close: 'إتمام',
    signIn: 'تسجيل الدخول', signUp: 'إنشاء حساب',
    sellList: 'أدرج عقارك', sellListDesc: 'أدرج كمالك أو وكيل بتفويض',
    sellNow: 'بِع الآن', sellNowDesc: 'بِع مباشرةً عبر iClose',
    listWithCa: 'الإدراج بعقد A', listWithCaDesc: 'إدراج وسيط بنموذج RERA A',
    brokerage: 'بوابة الوساطة', brokerageDesc: 'للوكلاء والشركات والمستقلين',
  },
  search: {
    search: 'بحث', residential: 'سكني',
    tabs: { properties: 'العقارات', newReleases: 'الإطلاقات الجديدة', transactions: 'المعاملات', agents: 'الوكلاء' },
    sub: { all: 'الكل', offplan: 'على الخارطة', ready: 'جاهز', sold: 'مباع', rented: 'مؤجر', agents: 'الوكلاء', companies: 'الشركات' },
    ph: {
      properties: 'مدينة أو منطقة أو مبنى',
      newReleases: 'الموقع أو المشروع أو المطوّر',
      transactions: 'ابحث عن أي موقع في دبي',
      agents: 'أدخل الموقع أو اسم الوكيل',
    },
  },
  home: {
    notif: 'تستثمر على الخارطة؟ احصل على أسعار خاصة ورصيد',
    learnMore: 'اعرف المزيد',
    heroTitle: 'لا تدفع عمولة للشراء أو البيع أو الإتمام مرة أخرى أبداً!',
    heroSub: 'تستثمر على الخارطة؟ احصل على أسعار خاصة ورصيد',
    cards: {
      buy: 'اشترِ بدون عمولة', sell: 'بِع بدون عمولة', close: 'أتمم واحتفظ بـ 100% من العمولة',
      buyCta: 'كيف تشتري', sellCta: 'كيف تبيع', closeCta: 'كيف تُتمم',
    },
  },
};

// ru / zh / hi fall back to English for now (translations pending).
const DICTIONARIES: Record<LocaleCode, Messages> = { en, ar, ru: en, zh: en, hi: en };

export function getMessages(locale: LocaleCode): Messages {
  return DICTIONARIES[locale] ?? en;
}
