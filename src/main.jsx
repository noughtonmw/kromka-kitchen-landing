import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import kitchenHeroImage from '../assets/kitchen-hero.jpg'
import kitchenCompactImage from '../assets/kitchen-compact.jpg'
import kitchenIslandImage from '../assets/kitchen-island.jpg'

const quizQuestions = [
  {
    title: 'С какой планировкой работаем?',
    hint: 'Выберите ближайший сценарий — точные размеры уточним позже.',
    options: ['Прямая кухня', 'Угловая кухня', 'П‑образная', 'Пока не знаю'],
  },
  {
    title: 'Что важнее всего в новой кухне?',
    hint: 'Так мы поймём, какой сценарий заложить в первый эскиз.',
    options: ['Больше хранения', 'Удобная готовка', 'Красивый минимализм', 'Уложиться в бюджет'],
  },
  {
    title: 'На каком этапе ваш проект?',
    hint: 'Подстроим консультацию под реальную ситуацию, без лишней теории.',
    options: ['Только планирую ремонт', 'Есть замеры', 'Ремонт уже идёт', 'Нужно заменить старую кухню'],
  },
  {
    title: 'Какая площадь кухни примерно?',
    hint: 'Если не знаете — можно выбрать вариант «примерно».',
    options: ['До 6 м²', '6–9 м²', '9–14 м²', 'Больше 14 м²'],
  },
  {
    title: 'Какой результат хотите получить?',
    hint: 'Финальный вопрос — и мы соберём для вас полезный первый ориентир.',
    options: ['Планировку', 'Материалы и фасады', 'Предварительную смету', 'Всё сразу'],
  },
]

const galleryItems = [
  { label: 'Новосёлы', title: 'Тёплый дуб + остров', detail: 'Кухня-гостиная 18 м² · 3 сценария хранения · от 389 000 ₽', image: kitchenHeroImage },
  { label: 'Компактная кухня', title: 'Тихая компактная', detail: 'Угловая планировка · встроенная техника · от 219 000 ₽', image: kitchenCompactImage },
  { label: 'Загородный дом', title: 'Графит и орех', detail: 'Остров 2,4 м · 5 посадочных мест · от 459 000 ₽', image: kitchenIslandImage },
]

function ArrowIcon({ small = false }) {
  return <svg className={small ? 'icon icon--small' : 'icon'} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function SparkIcon() {
  return <svg className="spark-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" fill="currentColor" /></svg>
}

function KromkaMark() {
  return <div className="brand-mark" aria-hidden="true"><span></span><span></span><span></span></div>
}

function Button({ children, onClick, light = false, className = '' }) {
  return <button className={`button ${light ? 'button--light' : ''} ${className}`} onClick={onClick}>{children}<ArrowIcon small /></button>
}

function KitchenDiagram() {
  return <div className="kitchen-visual" aria-label="Готовая кухня из натурального дуба с островом">
    <img src={kitchenHeroImage} alt="Светлая кухня с островом в реальной квартире" />
    <div className="photo-wash"></div>
    <div className="visual-note visual-note--top">ГОТОВЫЙ РЕЗУЛЬТАТ</div>
    <div className="visual-note visual-note--bottom">фасады: дуб · столешница: камень · свет: тёплый</div>
    <div className="photo-tag photo-tag--one"><b>18 м²</b><span>кухня-гостиная</span></div>
    <div className="photo-tag photo-tag--two"><b>−10%</b><span>для новосёлов</span></div>
    <div className="photo-credit">КРОМКА · HOUSE</div>
  </div>
}

function QuizModal({ onClose }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', closeOnEscape)
    document.body.classList.add('modal-open')
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.classList.remove('modal-open') }
  }, [onClose])

  const selectAnswer = (option) => {
    const nextAnswers = [...answers]
    nextAnswers[step] = option
    setAnswers(nextAnswers)
    window.setTimeout(() => setStep((current) => current + 1), 170)
  }

  const submitContact = (event) => {
    event.preventDefault()
    if (name.trim() && phone.trim()) setSubmitted(true)
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title">
      <button className="modal-close" onClick={onClose} aria-label="Закрыть квиз">×</button>
      {!submitted ? <>
        <div className="quiz-meta"><span>КРОМКА · БЫСТРЫЙ ПРОЕКТ</span><span>{step < quizQuestions.length ? `${step + 1} из ${quizQuestions.length}` : 'ГОТОВО'}</span></div>
        {step < quizQuestions.length ? <>
          <div className="quiz-progress"><span style={{ width: `${((step + 1) / quizQuestions.length) * 100}%` }}></span></div>
          <h2 id="quiz-title">{quizQuestions[step].title}</h2>
          <p className="quiz-hint">{quizQuestions[step].hint}</p>
          <div className="quiz-options">{quizQuestions[step].options.map((option) => <button key={option} className={`quiz-option ${answers[step] === option ? 'is-selected' : ''}`} onClick={() => selectAnswer(option)}>{option}<ArrowIcon small /></button>)}</div>
          <div className="quiz-footnote"><SparkIcon /> Ваши ответы нужны только для точного первого эскиза</div>
        </> : <>
          <h2 id="quiz-title">Куда отправить первый ориентир?</h2>
          <p className="quiz-hint">Пришлём 1–2 планировочные идеи, список вопросов к замеру и диапазон бюджета от 189 000 ₽ — без обязательства заказывать.</p>
          <form className="contact-form" onSubmit={submitContact}>
            <label>Имя<input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="Как к вам обращаться?" required /></label>
            <label>Телефон или Telegram<input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+7 900 000-00-00" required /></label>
            <button className="button button--full" type="submit">Получить эскиз и расчёт<ArrowIcon small /></button>
          </form>
          <p className="privacy-note">Нажимая кнопку, вы соглашаетесь на обработку заявки. Ответим в течение рабочего дня.</p>
        </>}
      </> : <div className="success-state"><div className="success-mark">✓</div><h2>Первый ориентир уже в работе.</h2><p>Соберём планировочную идею и вернёмся с расчётом в течение рабочего дня. Спасибо, {name || 'что поделились'}.</p><button className="text-button" onClick={onClose}>Вернуться на страницу <ArrowIcon small /></button></div>}
    </section>
  </div>
}

function App() {
  const [quizOpen, setQuizOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const openQuiz = () => setQuizOpen(true)

  useEffect(() => {
    const revealItems = [...document.querySelectorAll('.reveal')]
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return <>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Кромка — в начало"><KromkaMark /><span>кромка</span></a>
       <nav className="desktop-nav" aria-label="Основная навигация"><a href="#projects">Решения</a><a href="#testimonials">Отзывы</a><a href="#process">Как работаем</a><a href="#faq">Вопросы</a></nav>
      <button className="header-cta" onClick={openQuiz}>Мини‑проект <ArrowIcon small /></button>
    </header>

    <main id="top">
      <section className="hero page-shell">
        <div className="hero-copy">
          <div className="hero-stamp"><span className="stamp-dot"></span> дизайн кухни под ваш сценарий</div>
          <h1>Дизайн кухни<br /><em>с бесплатной</em><br />планировкой и −10%<br />новосёлам.</h1>
          <p className="hero-lede">Кухня, которая собирается вокруг вашей жизни: ответьте на 5 вопросов — получите планировочную идею, список материалов и предварительный диапазон бюджета до встречи с дизайнером. Скидка действует до 30 сентября.</p>
          <div className="hero-actions"><Button onClick={openQuiz}>Получить эскиз и расчёт</Button><span className="action-note">2 минуты<br />без звонка «в лоб»</span></div>
          <div className="hero-proof"><span>5 вопросов</span><span className="proof-line"></span><span>3 варианта</span><span className="proof-line"></span><span>1 смета</span></div>
        </div>
        <KitchenDiagram />
      </section>

      <section className="metrics-strip page-shell reveal" aria-label="Что входит в проект кухни"><div className="metric-cell"><strong>14 дней</strong><span>от замера до согласованного проекта</span></div><div className="metric-cell"><strong>3 сметы</strong><span>разумная, семейная и выразительная</span></div><div className="metric-cell"><strong>10 лет</strong><span>гарантия на корпус и фасады</span></div><div className="metric-cell"><strong>−10%</strong><span>новосёлам до 30 сентября</span></div></section>

      <section className="principle-section reveal" id="principle">
        <div className="page-shell principle-grid">
          <div className="principle-label">Красивая картинка —<br />только начало.</div>
          <div className="principle-copy"><h2>Сначала — как вы живёте.<br /><span>Потом — как выглядит кухня.</span></h2><p>За 1 встречу собираем ваш сценарий, показываем до 3 вариантов планировки и закладываем 20+ точек хранения там, где раньше было пусто или неудобно.</p><Button onClick={openQuiz} light>Показать мой сценарий</Button></div>
          <div className="principle-photo"><img src={kitchenCompactImage} alt="Компактная кухня с оливковыми фасадами" /><div className="principle-photo-note"><strong>20+</strong><span>точек хранения<br />вместо пустых углов</span></div><div className="principle-photo-caption">Практичная кухня · 7 м²</div></div>
        </div>
      </section>

      <section className="gallery-section page-shell reveal" id="projects"><div className="gallery-heading"><div><h2>Так выглядит кухня,<br /><span>когда всё продумано.</span></h2></div><p>Три разных сценария — один принцип: удобство видно ещё до заказа.</p></div><div className="gallery-stage"><div className="gallery-image-wrap"><img src={galleryItems[galleryIndex].image} alt={galleryItems[galleryIndex].title} /><div className="gallery-image-label">{galleryItems[galleryIndex].label}</div><div className="gallery-image-price">{galleryItems[galleryIndex].detail.split(' · ').at(-1)}</div></div><div className="gallery-side"><div className="gallery-side-top"><span>ГОТОВЫЕ РЕШЕНИЯ</span><span>Вариант {galleryIndex + 1} из 3</span></div><h3>{galleryItems[galleryIndex].title}</h3><p>{galleryItems[galleryIndex].detail}</p><Button onClick={openQuiz} light>Получить похожий расчёт</Button><div className="gallery-tabs">{galleryItems.map((item, index) => <button key={item.label} className={galleryIndex === index ? 'is-active' : ''} onClick={() => setGalleryIndex(index)}><span>Вариант {index + 1}</span>{item.title}<ArrowIcon small /></button>)}</div></div></div></section>

      <section className="audience-section page-shell reveal"><div className="audience-heading"><h2>Кухня начинается<br /><span>с вашей ситуации.</span></h2><p>Выберите сценарий — и увидите, на чём держится решение именно для вас.</p></div><div className="audience-list"><div className="audience-row"><span className="audience-figure">01</span><div><h3>«Получил ключи, а с чего начать — непонятно»</h3><p>Новосёлам помогаем связать планировку, розетки и технику до начала ремонта.</p></div><strong>−10%<small>до 30.09</small></strong></div><div className="audience-row"><span className="audience-figure">02</span><div><h3>«На 6 м² нужно уместить вообще всё»</h3><p>Находим 15–20 дополнительных мест хранения за счёт высоты, углов и правильного открытия фасадов.</p></div><strong>6–9 м²<small>компактные кухни</small></strong></div><div className="audience-row"><span className="audience-figure">03</span><div><h3>«Хочу готовить, но не жить в ремонте»</h3><p>Собираем понятный маршрут: замер за 1 день, проект за 48 часов, монтаж по согласованной дате.</p></div><strong>48 ч<small>до первого проекта</small></strong></div></div></section>

      <section className="testimonials-section page-shell reveal" id="testimonials"><div className="testimonials-heading"><h2>«Теперь я понимаю,<br /><span>за что плачу».</span></h2><p>Отзывы клиентов отвечают на вопросы, которые чаще всего останавливают заказ.</p></div><div className="testimonials-list"><article className="testimonial testimonial--featured"><div className="testimonial-person"><span className="avatar">АК</span><div><strong>Анна К.</strong><small>новосёлка · кухня 9 м²</small></div><span className="testimonial-rating">5.0</span></div><blockquote>«До встречи я боялась, что бесплатный проект — это просто способ заманить в салон. Но за 48 часов получила две планировки и список техники. Теперь понимаю, что можно менять, а на чём экономить не стоит».</blockquote></article><div className="testimonial-stack"><article className="testimonial"><div className="testimonial-person"><span className="avatar avatar--clay">МС</span><div><strong>Марина С.</strong><small>мама двоих детей · 7 м²</small></div><span className="testimonial-rating">5.0</span></div><blockquote>«На маленькой кухне думала, что выбора нет. Дизайнер добавил высокий пенал, два узких выдвижных модуля и место для завтраков. Хранения стало больше, а площадь не изменилась».</blockquote></article><article className="testimonial"><div className="testimonial-person"><span className="avatar avatar--moss">ИР</span><div><strong>Илья Р.</strong><small>переезд · кухня-гостиная 18 м²</small></div><span className="testimonial-rating">5.0</span></div><blockquote>«Я хотел закончить вопрос с кухней за один месяц. Сначала получил понятный план, потом замер, а дату монтажа закрепили в договоре. Не пришлось координировать пять разных подрядчиков».</blockquote></article></div></div></section>

      <section className="clarity-section page-shell reveal">
        <div className="section-intro"><h2>Бюджет не должен<br /><span>растворяться в деталях.</span></h2><p>Ориентир на кухню — от 189 000 ₽. В расчёте отдельно видны фасады, фурнитура, столешница и монтаж: можно сравнить 3 комплектации до замера.</p></div>
        <div className="material-board">
          <div className="board-top"><span>ПЛАНИРОВКА ОЛЬГИ · 9 М²</span><span>Первая версия</span></div>
          <div className="board-main"><div className="board-sketch"><div className="sketch-line sketch-line--a"></div><div className="sketch-line sketch-line--b"></div><div className="sketch-line sketch-line--c"></div><div className="sketch-room-label">рабочий<br />треугольник</div><span className="sketch-point sketch-point--a">01</span><span className="sketch-point sketch-point--b">02</span><span className="sketch-point sketch-point--c">03</span></div><div className="board-data"><div className="data-row"><span>сценарий</span><strong>готовить вдвоём</strong></div><div className="data-row"><span>приоритет</span><strong>максимум хранения</strong></div><div className="data-row"><span>первый шаг</span><strong>эскиз + смета</strong></div><div className="data-note"><SparkIcon /><span>В расчёте видно, за что вы платите — и где можно сэкономить без потери удобства.</span></div></div></div>
          <div className="board-bottom"><div className="swatch swatch--terracotta"></div><div className="swatch swatch--oak"></div><div className="swatch swatch--moss"></div><span>образцы — не обещания</span></div>
        </div>
      </section>

      <section className="quote-section reveal">
        <div className="page-shell quote-grid"><div className="quote-mark">“</div><blockquote>Хорошая кухня — это когда утром всё под рукой, а вечером не хочется закрывать дверь.</blockquote><div className="quote-aside"><span>Именно поэтому</span><p>в квизе мы спрашиваем не только метры, но и то, как проходит ваш обычный день.</p></div></div>
      </section>

      <section className="quiz-promo page-shell reveal">
        <div className="quiz-promo-copy"><h2>Пять вопросов,<br /><span>один ясный первый шаг.</span></h2><p>За 2 минуты соберём вводные и подготовим ориентир: 1–2 планировки, 3 варианта фасадов и диапазон бюджета до замера.</p><Button onClick={openQuiz}>Пройти квиз за 2 минуты</Button></div>
        <div className="quiz-preview"><div className="preview-top"><span>КРОМКА · БЫСТРЫЙ ПРОЕКТ</span><span>Вопрос 1 из 5</span></div><div className="preview-question"><span className="preview-number">01</span><h3>Что должно работать<br />лучше всего?</h3></div><div className="preview-answer"><span>больше хранения</span><ArrowIcon small /></div><div className="preview-answer preview-answer--muted"><span>удобная готовка</span><ArrowIcon small /></div><div className="preview-answer preview-answer--muted"><span>пространство для гостей</span><ArrowIcon small /></div><div className="preview-footer"><span>ваш ответ — не договор</span><span className="preview-progress"><i></i><i></i><i></i><i></i><i></i></span></div></div>
      </section>

      <section className="options-section page-shell reveal">
        <div className="section-intro section-intro--wide"><h2>Не «дороже или дешевле».<br /><span>А что подходит вам.</span></h2></div>
        <div className="options-table"><div className="table-head"><span>ПОДХОД</span><span>ОРИЕНТИР</span><span>ЧТО ПОЛУЧАЕТЕ</span></div><div className="table-row table-row--featured"><span><b>01</b>разумный</span><span>от 189 000 ₽</span><span>рабочая база + рациональные материалы</span><span className="row-arrow">→</span></div><div className="table-row"><span><b>02</b>семейный</span><span>от 279 000 ₽</span><span>усиленная фурнитура, высокий пенал и максимум хранения</span><span className="row-arrow">→</span></div><div className="table-row"><span><b>03</b>выразительный</span><span>от 389 000 ₽</span><span>остров, акцентные материалы и встроенное освещение</span><span className="row-arrow">→</span></div></div>
      </section>

      <section className="process-section" id="process">
        <div className="page-shell process-grid reveal"><div className="process-heading"><h2>От первого «хочу»<br /><span>до кухни без сюрпризов.</span></h2><p>Показываем путь заранее, чтобы решение принималось спокойно — по шагам, а не на эмоциях.</p></div><div className="process-list"><div className="process-item"><span className="process-num">01</span><div><h3>Собираем контекст</h3><p>Планировка, техника, привычки, бюджет. Квиз — короткая версия этого разговора.</p></div><span className="process-time">15 мин</span></div><div className="process-item"><span className="process-num">02</span><div><h3>Находим рабочую схему</h3><p>Показываем, где хранить, готовить и что можно изменить без переплаты.</p></div><span className="process-time">1–2 идеи</span></div><div className="process-item"><span className="process-num">03</span><div><h3>Фиксируем решения</h3><p>Материалы, комплектация и состав работ собраны в понятный ориентир.</p></div><span className="process-time">48 часов</span></div><div className="process-item"><span className="process-num">04</span><div><h3>Передаём в реализацию</h3><p>Следующий шаг — замер, уточнение и договорённости. Только если всё совпало.</p></div><span className="process-time">по желанию</span></div></div></div>
      </section>

      <section className="proof-section page-shell reveal"><div className="proof-header"><div><h2>Дизайн, который<br /><span>можно проверить.</span></h2></div><p className="proof-disclaimer">За каждым проектом — замер, подбор материалов и контроль монтажа.</p></div><div className="case-study"><div className="case-large"><div className="case-label">ПРОЕКТ · 09 М²</div><div className="case-photo"><img src={kitchenIslandImage} alt="Графитовая кухня с островом в загородном доме" /><div className="case-photo-badge"><strong>+28%</strong><span>полезного хранения</span></div></div><span className="case-caption">остров стал местом<br />для завтраков и разговоров</span></div><div className="case-stats"><div className="stat-line"><strong>+28%</strong><span>больше полезного хранения<br /><i>в сравнении с прежней схемой</i></span></div><div className="stat-line"><strong>03</strong><span>сценария фасадов<br /><i>на выбор до заказа</i></span></div><div className="stat-line"><strong>01</strong><span>первый эскиз<br /><i>до встречи в салоне</i></span></div><Button onClick={openQuiz} light>Собрать мой кейс</Button></div></div></section>

      <section className="faq-section page-shell reveal" id="faq"><div className="faq-heading"><h2>Вопросы, которые<br /><span>обычно задают вслух.</span></h2></div><div className="faq-list">{[
        ['Можно ли начать, если у меня нет точных замеров?', 'Да. На первом шаге достаточно примерной площади и понимания, что сейчас неудобно. Точные размеры понадобятся перед финальной схемой, а не для первого разговора.'],
        ['А если я пока только сравниваю варианты?', 'Это нормальный сценарий. Квиз даёт полезный ориентир, который можно сравнить с другими предложениями: по составу, логике и бюджету.'],
        ['Что входит в мини‑проект?', 'Планировочная идея, список ключевых решений, варианты материалов и предварительный диапазон бюджета. Финальная смета формируется после замера и согласования комплектации.'],
        ['Нужно ли сразу заказывать кухню?', 'Нет. Первый шаг ни к чему не обязывает — вы сначала понимаете, подходит ли вам подход и команда.'],
      ].map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'is-open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><span className="faq-plus">{openFaq === index ? '−' : '+'}</span></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></section>

      <section className="final-cta reveal"><div className="page-shell final-cta-inner"><div><h2>Давайте начнём<br /><em>с вашей жизни.</em></h2></div><div className="final-cta-action"><p>Пять вопросов → планировочная идея → понятный следующий шаг.</p><Button onClick={openQuiz} light>Получить эскиз и расчёт</Button><small>Без обязательства заказывать</small></div></div></section>
    </main>

    <footer className="site-footer page-shell"><a className="brand" href="#top"><KromkaMark /><span>кромка</span></a><span>Кухни на заказ · работаем по договору</span><span>Замер · проект · производство · монтаж</span></footer>
    {quizOpen && <QuizModal onClose={() => setQuizOpen(false)} />}
  </>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
