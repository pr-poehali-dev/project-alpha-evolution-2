import { useEffect, useState } from "react";
import { ArrowRight, Cpu, Zap, Shield, Search, Wrench, Star } from "lucide-react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};

    const sectionIds = ["hero", "features", "how", "pricing", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.15 }
      );

      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <div className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
              Сборки ПК от Сани
            </div>
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-white transition-colors">
              Возможности
            </a>
            <a href="#how" className="text-muted-foreground hover:text-white transition-colors">
              Как это работает
            </a>
            <a href="#builds" className="text-muted-foreground hover:text-white transition-colors">
              Топ сборок
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">
              Тарифы
            </a>
          </nav>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all">
              Войти
            </button>
            <button className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold">
              Собрать ПК
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <img src="/images/black-hole-gif.gif" alt="Background animation" className="w-auto h-3/4 object-contain" />
        </div>
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mb-8 inline-block">
                <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">
                  AI-агент для сборки компьютеров
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Собери ПК.
                </span>
                <br />
                <span className="text-accent">Без ошибок.</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                AI-агент подберёт совместимые комплектующие под ваш бюджет и задачи — гейминг, работа, монтаж видео.
                Пошагово, без лишних слов.
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <button className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center">
                  Начать сборку
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white">
                  Смотреть демо
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">5 000+</div>
                  <p className="text-sm text-white/60">Сборок завершено</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-2">100%</div>
                  <p className="text-sm text-white/60">Совместимость деталей</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">до 30%</div>
                  <p className="text-sm text-white/60">Экономия бюджета</p>
                </div>
              </div>
            </div>

            <div
              className={`relative h-96 lg:h-[550px] transition-all duration-1000 flex items-center justify-center ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent rounded-3xl blur-3xl animate-pulse" />
              <img
                src="/omnius-logo.png"
                alt="BuildMind AI"
                className="w-full max-w-sm lg:max-w-md drop-shadow-2xl animate-float relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Возможности</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Умный помощник внутри
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "Cpu",
                title: "Подбор под задачу",
                desc: "Скажите что хотите делать — гейминг, работа, стриминг — и агент сам подберёт нужные компоненты",
              },
              {
                icon: "Shield",
                title: "Проверка совместимости",
                desc: "Автоматически проверяет, что все детали совместимы между собой. Никаких ошибок при сборке",
              },
              {
                icon: "Zap",
                title: "Оптимизация бюджета",
                desc: "Агент предлагает лучшее соотношение цена/производительность в рамках вашего бюджета",
              },
              {
                icon: "Search",
                title: "Сравнение цен",
                desc: "Сравнивает актуальные цены у ключевых поставщиков и находит выгодные предложения",
              },
              {
                icon: "Wrench",
                title: "Пошаговая инструкция",
                desc: "После подбора деталей агент даёт понятную инструкцию по сборке с фото и видео",
              },
              {
                icon: "Star",
                title: "Готовые сборки",
                desc: "Библиотека проверенных конфигураций для популярных задач — выбери и настрой под себя",
              },
            ].map((item, i) => {
              const isVisible = visibleSections["features"];
              return (
                <div
                  key={i}
                  className={`group p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-accent/10 group-hover:bg-accent/20 rounded-xl flex items-center justify-center mb-6 transition-colors">
                    <Icon name={item.icon} size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Четыре шага до сборки
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Расскажите о себе", desc: "Укажите для чего нужен ПК и какой у вас бюджет" },
              { num: "02", title: "Агент подбирает", desc: "AI анализирует тысячи конфигураций и выбирает лучшую под вас" },
              { num: "03", title: "Проверяем детали", desc: "Убеждаемся в совместимости и находим лучшие цены у поставщиков" },
              { num: "04", title: "Собираете ПК", desc: "Получаете список деталей и пошаговую инструкцию по сборке" },
            ].map((step, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="group bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-2xl p-8 h-full flex flex-col justify-between transition-all backdrop-blur-sm cursor-pointer">
                    <div>
                      <div className="text-5xl font-display font-black text-accent mb-4 group-hover:scale-110 transition-transform">
                        {step.num}
                      </div>
                      <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/40 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Builds */}
      <section id="builds" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Готовые конфигурации</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Топ сборок 2026
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Проверенные конфигурации под разные задачи и бюджеты</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                tag: "Гейминг",
                name: "Игровой Хит",
                price: "85 000 ₽",
                cpu: "AMD Ryzen 7 7700X",
                gpu: "RTX 4070 Super",
                ram: "32 ГБ DDR5",
                ssd: "1 ТБ NVMe",
                badge: "Топ продаж",
                highlight: true,
              },
              {
                tag: "Бюджетный",
                name: "Старт",
                price: "35 000 ₽",
                cpu: "AMD Ryzen 5 7600",
                gpu: "RTX 4060",
                ram: "16 ГБ DDR5",
                ssd: "512 ГБ NVMe",
                badge: null,
                highlight: false,
              },
              {
                tag: "Работа и учёба",
                name: "Офисный Про",
                price: "45 000 ₽",
                cpu: "Intel Core i5-14400",
                gpu: "Intel Arc A380",
                ram: "32 ГБ DDR4",
                ssd: "1 ТБ NVMe",
                badge: null,
                highlight: false,
              },
              {
                tag: "Видеомонтаж",
                name: "Медиа Студия",
                price: "130 000 ₽",
                cpu: "AMD Ryzen 9 7950X",
                gpu: "RTX 4080",
                ram: "64 ГБ DDR5",
                ssd: "2 ТБ NVMe",
                badge: "Выбор профи",
                highlight: false,
              },
              {
                tag: "Гейминг 4K",
                name: "Ультра Монстр",
                price: "200 000 ₽",
                cpu: "Intel Core i9-14900K",
                gpu: "RTX 4090",
                ram: "64 ГБ DDR5",
                ssd: "4 ТБ NVMe",
                badge: "Максимум",
                highlight: false,
              },
            ].map((build, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`group relative border rounded-2xl p-7 transition-all duration-700 cursor-pointer ${
                    build.highlight
                      ? "border-accent/50 bg-accent/10 hover:bg-accent/15"
                      : "border-accent/10 bg-card/50 hover:bg-card/80 hover:border-accent/30"
                  } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {build.badge && (
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-accent text-black text-xs font-bold rounded-full">
                      {build.badge}
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-medium text-accent/70 uppercase tracking-widest">{build.tag}</span>
                      <h3 className="font-display font-black text-2xl mt-1">{build.name}</h3>
                    </div>
                    <div className="text-2xl font-black text-accent">{build.price}</div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {[
                      { label: "CPU", value: build.cpu },
                      { label: "GPU", value: build.gpu },
                      { label: "RAM", value: build.ram },
                      { label: "SSD", value: build.ssd },
                    ].map((spec) => (
                      <li key={spec.label} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="text-foreground/90 font-medium">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                      build.highlight
                        ? "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-lg hover:shadow-accent/30"
                        : "border border-accent/20 hover:border-accent/50 hover:bg-accent/10"
                    }`}
                  >
                    Выбрать сборку
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Тарифы</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Простые цены
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Базовый",
                price: "Бесплатно",
                features: [
                  "3 сборки в месяц",
                  "Проверка совместимости",
                  "Готовые шаблоны конфигураций",
                  "Пошаговая инструкция",
                ],
                highlight: false,
              },
              {
                name: "Про",
                price: "990 ₽/мес",
                features: [
                  "Неограниченные сборки",
                  "Сравнение цен у поставщиков",
                  "Персональные рекомендации",
                  "Приоритетная поддержка 24/7",
                ],
                highlight: true,
              },
            ].map((plan, i) => {
              const isVisible = visibleSections["pricing"];
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } ${plan.highlight ? "md:scale-105" : ""}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {plan.highlight && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition" />
                  )}
                  <div
                    className={`relative p-10 border rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm transition-all ${
                      plan.highlight ? "border-accent/40 bg-accent/10" : "border-accent/10 bg-card/50 hover:bg-card/80"
                    }`}
                  >
                    <div>
                      <h3 className="font-display font-bold text-2xl mb-2">{plan.name}</h3>
                      <p className="text-4xl font-black text-accent mb-8">{plan.price}</p>
                      <ul className="space-y-4 mb-10">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex gap-3 text-sm items-start">
                            <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                            <span className="text-foreground/80">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className={`w-full px-6 py-4 rounded-xl font-semibold transition-all ${
                        plan.highlight
                          ? "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-xl hover:shadow-accent/40"
                          : "border border-accent/20 hover:border-accent/40 hover:bg-accent/5"
                      }`}
                    >
                      {plan.highlight ? "Подключить Про" : "Начать бесплатно"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Готов собрать свой ПК?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
            Расскажи агенту о своих задачах и бюджете — он подберёт идеальную конфигурацию за минуты.
          </p>
          <button className="group px-10 py-5 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 mx-auto">
            Начать бесплатно
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-12 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2026 Сборки ПК от Сани</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Конфиденциальность
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Условия
            </a>
            <a href="#" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Контакты
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;