import { ref, watch } from 'vue'

export type Locale = 'en' | 'ru' | 'he'

const locale = ref<Locale>(
  (localStorage.getItem('locale') as Locale) || 'en'
)

export const translations = {
  en: {
    headerTitle: 'We write about code and being',
    headerHighlight: 'full-stack',
    headerSuffix: 'makers.',
    headerSubtitle: 'Back-end and Front-end developers. Daria brings solid backend and technical writing. Evgeny crafts interfaces that people enjoy. Two minds, one stack.',
    latestArticles: 'Latest Articles',
    viewAllOnWhale: 'View all on Whale',
    theTeam: 'The Team',
    niceStuff: "Nice stuff I've built",
    sideHustles: 'Side Hustles',
    clientProjects: 'Client Projects',
    letsConnect: "Let's connect",
    reachOut: 'Reach out via LinkedIn or GitHub.',
    comingSoon: 'Coming soon',
    navHome: 'Home',
    navTeam: 'The Team',
    navProjects: 'Nice stuff',
    navContact: 'Contact',
    newsletterTitle: 'Never miss an update!',
    newsletterSub: 'Subscribe and stay in the loop.',
    emailPlaceholder: 'Your email...',
    subscribe: 'Subscribe',
    catAll: 'All',
    catAi: 'AI articles',
    catDigital: 'Digital Marketing and SMM',
    catBackend: 'Backend',
    catFrontend: 'Frontend',
  },
  ru: {
    headerTitle: 'Пишем о коде и работе',
    headerHighlight: 'full-stack',
    headerSuffix: 'создателей.',
    headerSubtitle: 'Back-end и Front-end разработчики. Даша — бэкенд и технические тексты. Евгений — интерфейсы, которыми приятно пользоваться. Два ума, один стек.',
    latestArticles: 'Последние статьи',
    viewAllOnWhale: 'Все на Whale',
    theTeam: 'Команда',
    niceStuff: 'Что мы сделали',
    sideHustles: 'Сайд-проекты',
    clientProjects: 'Клиентские проекты',
    letsConnect: 'Связаться',
    reachOut: 'Напишите в LinkedIn или GitHub.',
    comingSoon: 'Скоро',
    navHome: 'Главная',
    navTeam: 'Команда',
    navProjects: 'Проекты',
    navContact: 'Контакты',
    newsletterTitle: 'Не пропустите обновления!',
    newsletterSub: 'Подпишитесь и оставайтесь в курсе.',
    emailPlaceholder: 'Ваш email...',
    subscribe: 'Подписаться',
    catAll: 'Все',
    catAi: 'AI статьи',
    catDigital: 'Digital Marketing и SMM',
    catBackend: 'Backend',
    catFrontend: 'Frontend',
  },
  he: {
    headerTitle: 'כותבים על קוד ועבודה',
    headerHighlight: 'full-stack',
    headerSuffix: 'יוצרים.',
    headerSubtitle: 'מפתחי Back-end ו-Front-end. דריה — בק엔ד וכתיבה טכנית. יבגני — ממשקים נעימים. שני מוחות, סטאק אחד.',
    latestArticles: 'מאמרים אחרונים',
    viewAllOnWhale: 'הכל ב-Whale',
    theTeam: 'הצוות',
    niceStuff: 'מה בנינו',
    sideHustles: 'פרויקטים צד',
    clientProjects: 'פרויקטים ללקוחות',
    letsConnect: 'יצירת קשר',
    reachOut: 'כתבו לנו ב-LinkedIn או GitHub.',
    comingSoon: 'בקרוב',
    navHome: 'בית',
    navTeam: 'הצוות',
    navProjects: 'פרויקטים',
    navContact: 'קשר',
    newsletterTitle: 'אל תפספסו עדכונים!',
    newsletterSub: 'הירשמו להודעות.',
    emailPlaceholder: 'האימייל שלכם...',
    subscribe: 'הרשמה',
    catAll: 'הכל',
    catAi: 'מאמרי AI',
    catDigital: 'Digital Marketing ו-SMM',
    catBackend: 'Backend',
    catFrontend: 'Frontend',
  },
} as const

export function useI18n() {
  function t(key: keyof typeof translations.en): string {
    return translations[locale.value][key] ?? key
  }

  function setLocale(newLocale: Locale) {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
    document.documentElement.lang = newLocale === 'he' ? 'he' : newLocale === 'ru' ? 'ru' : 'en'
    document.documentElement.dir = newLocale === 'he' ? 'rtl' : 'ltr'
  }

  watch(
    locale,
    (val) => {
      document.documentElement.lang = val === 'he' ? 'he' : val === 'ru' ? 'ru' : 'en'
      document.documentElement.dir = val === 'he' ? 'rtl' : 'ltr'
    },
    { immediate: true }
  )

  return { locale, t, setLocale }
}
