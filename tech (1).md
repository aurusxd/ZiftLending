# ТЗ: Сайт-визитка Zift (AI-powered software studio)

## Стек

- SvelteKit + TypeScript, Svelte 5 (runes: `$state`, `$derived`, `$effect`)
- GSAP + ScrollTrigger (scroll-анимации, pinning секций)
- Tailwind CSS (дизайн-токены вынесены в конфиг)
- Деплой: Vercel/Netlify — статическая генерация (adapter-static) там, где не нужен SSR;
  Telegram-отправка лида идёт через серверный endpoint (`+server.ts`), поэтому либо
  adapter-vercel/adapter-netlify с serverless-функцией под форму, либо отдельный
  edge-function для приёма POST с лидом

## Дизайн-токены (единый источник правды)

- `--color-bg`: #0a0a0a
- `--color-accent`: #FF6A2E → #FFB454 (градиент)
- `--color-text-secondary`: серый, пониженная непрозрачность
- Типографика: sans-serif, h1 — крупный, жирный, широкий kerning/tracking
- Скругления карточек + soft glow box-shadow на hover (акцентным цветом, низкая
  прозрачность, blur)
- Всё это выносится в `tailwind.config.ts` (`theme.extend.colors`, `fontFamily`,
  `boxShadow`, `letterSpacing`), чтобы секции не хардкодили цвета

---

## Слайс 0 — Инициализация проекта

- `npm create svelte@latest` (Skeleton project, TypeScript, Svelte 5)
- Установка зависимостей: `gsap`, `tailwindcss` + postcss/autoprefixer, `@types/*` по
  необходимости
- Настройка `tailwind.config.ts` с дизайн-токенами из блока выше
- Базовая структура папок:
  ```
  src/
    lib/
      components/
        sections/        # по одному компоненту на секцию
        ui/               # переиспользуемые элементы: Button, Badge, Card
      gsap/               # регистрация плагинов, общие хелперы анимаций
      config/             # design-tokens.ts, nav-links.ts, services.ts, portfolio.ts
    routes/
      +page.svelte        # сборка всех секций
      +layout.svelte       # фикс-хедер
      api/lead/+server.ts  # отправка лида в Telegram
  static/
    hero/                 # видео + постер-кадр для мобилки
  ```
- Проверка билда и деплоя "пустого" каркаса на Vercel/Netlify (чтобы пайплайн деплоя
  был обкатан до начала контентной работы)

## Слайс 1 — Хедер и навигация

- Фикс-хедер (`position: fixed`, полупрозрачный/блюр фон при скролле)
- Логотип "‹Zift›" слева
- Навигация по центру: Home, Services, Projects, About, Pricing — якорные ссылки на
  секции (`scrollIntoView` или GSAP `scrollTo`)
- Кнопка "Book a call" справа — скролл к секции Contact
- Мобильная версия: бургер-меню или упрощённая навигация

## Слайс 2 — Hero-секция

- `<video autoplay muted playsinline>` без `loop`, источник — файлы из
  `/static/hero`
- Логика: видео проигрывается один раз при загрузке страницы; по событию `ended`
  ничего специально не делаем — браузер сам держит последний кадр, дополнительный
  стейт/кэш не нужен
- Заголовок по центру: "BUILDING THE FUTURE WITH AI" (или альтернативный слоган),
  подзаголовок, кнопки "See Our Work" (белая, скролл к Portfolio) и "Book Discovery
  Call" (обводка, скролл к Contact)
- Мобильная адаптация: вместо видео — статичный постер-кадр (последний кадр ролика,
  экспортированный как изображение), `<picture>`/`<img>` с `loading="eager"` только
  для hero, остальные изображения — `loading="lazy"`
- Точка ветвления mobile/desktop — через `matchMedia` в `$effect` или CSS
  (`<video>` скрыт на мобилке, постер показан вместо него)

## Слайс 3 — Who We Are (pinned overlay)

- GSAP `ScrollTrigger.pin` на секцию: пока идёт скролл внутри этой секции, она
  зафиксирована и "наезжает" поверх Hero (через `position: fixed` изнутри пина +
  z-index выше Hero)
- Бейдж "WHO WE ARE", заголовок "We build systems that learn, adapt and redefine" с
  частью текста в акцентном цвете (`<span class="text-accent">`)
- Описательный параграф про студию
- 3 карточки-фичи в ряд: Full-Cycle Delivery, AI-First Engineering, Product Thinking
  (иконка + заголовок + текст), на мобилке — стек в колонку
- Анимация появления карточек (stagger) при входе секции в вьюпорт

## Слайс 4 — What We Do (табы)

- Бейдж "WHAT WE DO", заголовок "End-to-End AI Development", подзаголовок
- Горизонтальные табы: AI & ML Solutions, Full-Stack Engineering, Cloud
  Infrastructure, Data Engineering, Automation Systems, Product Design
- Данные табов — в `src/lib/config/services.ts` (массив объектов: id, label,
  title, description, icon/illustration), рендер через `{#each}` — не хардкодить
  разметку на каждый таб
- Контент таба: слева заголовок + описание + кнопка "Get started" (→ Contact),
  справа — SVG-иллюстрация/анимация "чипа" с подписью LLM
- Переключение табов: GSAP-фейд/слайд между старым и новым контентом (timeline на
  `$state` активного таба)

## Слайс 5 — How We Work (пайплайн)

- Бейдж "HOW WE WORK", заголовок "From Idea to Intelligent Product"
- 4 шага в ряд, соединённые линией: 01 Discovery, 02 Architecture, 03 Build &
  Iterate, 04 Launch & Scale — номер в рамке + короткое описание
- Линия между шагами — `<svg>`/`div` с `scaleX`/`stroke-dashoffset`, анимированно
  "заливается" акцентным цветом через `ScrollTrigger` (scrub, привязанный к
  прогрессу скролла секции)
- На мобилке — вертикальная раскладка шагов, линия вертикальная

## Слайс 6 — Portfolio

- Бейдж "PORTFOLIO", заголовок "Work That Speaks for Itself"
- Данные проектов — в `src/lib/config/portfolio.ts` (id, название, описание,
  иконка, превью-изображение)
- Слева — список кликабельных карточек-проектов; справа — крупный превью
  выбранного проекта, смена по клику/hover (`$state` активного проекта + GSAP
  crossfade)
- Кнопка "View all projects →" (ведёт на отдельную страницу или внешний портфолио,
  уточнить у Никиты при реализации)
- Ленивая загрузка превью-изображений (`loading="lazy"`, возможно `IntersectionObserver`
  для более тяжёлых ассетов)

## Слайс 7 — Contact / Lead Form

- Заголовок "Book a Discovery Call" + подзаголовок
- Поля: имя, email, выбор даты (горизонтальный список дней, скроллящийся ряд),
  выбор времени (слоты), выбор таймзоны (select), кнопка "Book a call"
- Клиентская валидация (обязательные поля, формат email)
- Сабмит → POST на `routes/api/lead/+server.ts` → серверный вызов Telegram Bot API
  (`sendMessage` в чат/канал студии) с данными лида; токен бота и chat_id — через
  переменные окружения, не светить на клиенте
- Состояния UI: отправка / успех / ошибка

## Слайс 8 — Адаптивность и производительность

- Mobile-first брейкпоинты по всем секциям (проверка на 375/768/1024/1440)
- Hero: видео только на десктопе, постер на мобилке (см. Слайс 2)
- Ленивая загрузка: hero-видео (`preload="auto"` только когда в вьюпорте, либо сразу
  раз это первый экран — обсудить), изображения портфолио — `loading="lazy"`
- Проверка, что `ScrollTrigger.pin` в секции Who We Are не ломает скролл на мобилке
  (при необходимости — упростить/отключить pin на маленьких экранах через
  `ScrollTrigger.matchMedia`)

## Слайс 9 — Деплой

- Настройка adapter под Vercel или Netlify
- Решение по SSR/статике: маркетинговые секции — статика/prerender, `api/lead`
  endpoint — serverless-функция
- Переменные окружения (Telegram bot token, chat id) — через настройки проекта на
  хостинге, не коммитить в репозиторий
- Финальная проверка: lighthouse-прогон (особенно hero-видео и анимации не должны
  проседать по CLS/LCP)

---

## Порядок реализации

0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9, то есть сначала каркас и хедер, затем
секции сверху вниз в порядке страницы, адаптивность/перф и деплой — в конце как
финальный проход по всем секциям.
