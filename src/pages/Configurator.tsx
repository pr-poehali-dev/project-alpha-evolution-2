import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { ArrowLeft, ArrowRight, Check, ShoppingCart, Trash2 } from "lucide-react";

type Component = {
  id: string;
  name: string;
  brand: string;
  price: number;
  specs: string;
  tag?: string;
};

type Category = {
  id: string;
  label: string;
  icon: string;
  required: boolean;
  items: Component[];
};

const CATEGORIES: Category[] = [
  {
    id: "cpu",
    label: "Процессор (CPU)",
    icon: "Cpu",
    required: true,
    items: [
      { id: "cpu1", name: "Ryzen 5 7600", brand: "AMD", price: 14900, specs: "6 ядер / 3.8 ГГц / AM5", tag: "Лучшая цена" },
      { id: "cpu2", name: "Ryzen 7 7700X", brand: "AMD", price: 22900, specs: "8 ядер / 4.5 ГГц / AM5", tag: "Хит" },
      { id: "cpu3", name: "Ryzen 9 7950X", brand: "AMD", price: 44900, specs: "16 ядер / 4.5 ГГц / AM5", tag: "Топ" },
      { id: "cpu4", name: "Core i5-14400F", brand: "Intel", price: 13900, specs: "10 ядер / 2.5 ГГц / LGA1700" },
      { id: "cpu5", name: "Core i7-14700K", brand: "Intel", price: 28900, specs: "20 ядер / 3.4 ГГц / LGA1700" },
      { id: "cpu6", name: "Core i9-14900K", brand: "Intel", price: 49900, specs: "24 ядра / 3.2 ГГц / LGA1700", tag: "Флагман" },
    ],
  },
  {
    id: "mb",
    label: "Материнская плата",
    icon: "CircuitBoard",
    required: true,
    items: [
      { id: "mb1", name: "B650M DS3H", brand: "Gigabyte", price: 8900, specs: "AM5 / DDR5 / mATX" },
      { id: "mb2", name: "X670E Taichi", brand: "ASRock", price: 29900, specs: "AM5 / DDR5 / ATX / PCIe 5.0", tag: "Топ" },
      { id: "mb3", name: "ROG Strix B650-A", brand: "ASUS", price: 19900, specs: "AM5 / DDR5 / ATX" },
      { id: "mb4", name: "Z790 Aorus Elite", brand: "Gigabyte", price: 22900, specs: "LGA1700 / DDR5 / ATX" },
      { id: "mb5", name: "B760M Pro RS", brand: "ASRock", price: 9900, specs: "LGA1700 / DDR4 / mATX", tag: "Лучшая цена" },
      { id: "mb6", name: "ROG Maximus Z790", brand: "ASUS", price: 54900, specs: "LGA1700 / DDR5 / ATX", tag: "Флагман" },
    ],
  },
  {
    id: "gpu",
    label: "Видеокарта (GPU)",
    icon: "Monitor",
    required: true,
    items: [
      { id: "gpu1", name: "RTX 4060", brand: "NVIDIA", price: 28900, specs: "8 ГБ GDDR6 / 128-bit", tag: "Лучшая цена" },
      { id: "gpu2", name: "RTX 4060 Ti", brand: "NVIDIA", price: 38900, specs: "16 ГБ GDDR6 / 128-bit" },
      { id: "gpu3", name: "RTX 4070 Super", brand: "NVIDIA", price: 54900, specs: "12 ГБ GDDR6X / 192-bit", tag: "Хит" },
      { id: "gpu4", name: "RTX 4080 Super", brand: "NVIDIA", price: 89900, specs: "16 ГБ GDDR6X / 256-bit" },
      { id: "gpu5", name: "RTX 4090", brand: "NVIDIA", price: 149900, specs: "24 ГБ GDDR6X / 384-bit", tag: "Флагман" },
      { id: "gpu6", name: "RX 7700 XT", brand: "AMD", price: 34900, specs: "12 ГБ GDDR6 / 192-bit" },
      { id: "gpu7", name: "RX 7900 XTX", brand: "AMD", price: 79900, specs: "24 ГБ GDDR6 / 384-bit", tag: "Топ AMD" },
      { id: "gpu8", name: "Arc A770", brand: "Intel", price: 19900, specs: "16 ГБ GDDR6 / 256-bit", tag: "Бюджет" },
    ],
  },
  {
    id: "ram",
    label: "Оперативная память",
    icon: "MemoryStick",
    required: true,
    items: [
      { id: "ram1", name: "16 ГБ DDR4 3200", brand: "Kingston", price: 3200, specs: "2×8 ГБ / 3200 МГц", tag: "Лучшая цена" },
      { id: "ram2", name: "32 ГБ DDR4 3600", brand: "G.Skill", price: 6900, specs: "2×16 ГБ / 3600 МГц" },
      { id: "ram3", name: "16 ГБ DDR5 6000", brand: "Corsair", price: 5900, specs: "2×8 ГБ / 6000 МГц" },
      { id: "ram4", name: "32 ГБ DDR5 6000", brand: "G.Skill Trident Z5", price: 10900, specs: "2×16 ГБ / 6000 МГц", tag: "Хит" },
      { id: "ram5", name: "64 ГБ DDR5 6400", brand: "Corsair Dominator", price: 24900, specs: "2×32 ГБ / 6400 МГц", tag: "Топ" },
    ],
  },
  {
    id: "ssd",
    label: "Накопитель (SSD)",
    icon: "HardDrive",
    required: true,
    items: [
      { id: "ssd1", name: "512 ГБ NVMe Gen3", brand: "Kingston NV2", price: 2900, specs: "3500/2100 МБ/с", tag: "Лучшая цена" },
      { id: "ssd2", name: "1 ТБ NVMe Gen4", brand: "Samsung 980 Pro", price: 6900, specs: "7000/5000 МБ/с", tag: "Хит" },
      { id: "ssd3", name: "2 ТБ NVMe Gen4", brand: "WD Black SN850X", price: 12900, specs: "7300/6600 МБ/с", tag: "Топ" },
      { id: "ssd4", name: "4 ТБ NVMe Gen4", brand: "Seagate FireCuda", price: 22900, specs: "7300/6900 МБ/с" },
      { id: "ssd5", name: "2 ТБ SATA SSD", brand: "Samsung 870 EVO", price: 9900, specs: "560/530 МБ/с" },
    ],
  },
  {
    id: "psu",
    label: "Блок питания",
    icon: "Zap",
    required: true,
    items: [
      { id: "psu1", name: "550W Bronze", brand: "Chieftec", price: 3900, specs: "550W / 80+ Bronze" },
      { id: "psu2", name: "650W Gold", brand: "Seasonic", price: 6900, specs: "650W / 80+ Gold", tag: "Лучшая цена" },
      { id: "psu3", name: "850W Gold", brand: "Corsair RM850x", price: 10900, specs: "850W / 80+ Gold / Модульный", tag: "Хит" },
      { id: "psu4", name: "1000W Platinum", brand: "be quiet!", price: 16900, specs: "1000W / 80+ Platinum / Модульный", tag: "Топ" },
      { id: "psu5", name: "1200W Titanium", brand: "Seasonic Prime", price: 24900, specs: "1200W / 80+ Titanium" },
    ],
  },
  {
    id: "case",
    label: "Корпус",
    icon: "Box",
    required: true,
    items: [
      { id: "case1", name: "Meshify C", brand: "Fractal Design", price: 6900, specs: "ATX / Отличное охлаждение", tag: "Хит" },
      { id: "case2", name: "Pure Base 500DX", brand: "be quiet!", price: 8900, specs: "ATX / Тихий / RGB" },
      { id: "case3", name: "H510 Flow", brand: "NZXT", price: 7900, specs: "ATX / Mesh / Стекло" },
      { id: "case4", name: "Lian Li PC-O11D", brand: "Lian Li", price: 12900, specs: "ATX / Двойная камера / Стекло", tag: "Топ" },
      { id: "case5", name: "Define 7 Compact", brand: "Fractal Design", price: 9900, specs: "mATX / Тихий" },
    ],
  },
  {
    id: "cooling",
    label: "Охлаждение CPU",
    icon: "Wind",
    required: false,
    items: [
      { id: "cool1", name: "Hyper 212 Black", brand: "Cooler Master", price: 2900, specs: "120мм / до 150W TDP", tag: "Лучшая цена" },
      { id: "cool2", name: "Dark Rock 4", brand: "be quiet!", price: 5900, specs: "135мм / до 200W TDP / Тихий" },
      { id: "cool3", name: "Noctua NH-D15", brand: "Noctua", price: 8900, specs: "2×140мм / до 250W TDP", tag: "Топ воздух" },
      { id: "cool4", name: "Kraken X63", brand: "NZXT", price: 9900, specs: "СЖО 280мм / RGB" },
      { id: "cool5", name: "iCUE H150i", brand: "Corsair", price: 14900, specs: "СЖО 360мм / RGB", tag: "Топ СЖО" },
    ],
  },
];

type Selection = Record<string, Component>;

const Configurator = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<Selection>({});
  const [showSummary, setShowSummary] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  const category = CATEGORIES[step];
  const totalPrice = Object.values(selection).reduce((sum, c) => sum + c.price, 0);
  const requiredDone = CATEGORIES.filter((c) => c.required).every((c) => selection[c.id]);

  const select = (item: Component) => {
    setSelection((prev) => {
      if (prev[category.id]?.id === item.id) {
        const next = { ...prev };
        delete next[category.id];
        return next;
      }
      return { ...prev, [category.id]: item };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSent(true);
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setShowSummary(false)} className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" /> Назад к конфигуратору
          </button>

          {!orderSent ? (
            <>
              <h2 className="font-display font-black text-4xl mb-2">Ваша сборка</h2>
              <p className="text-muted-foreground mb-8">Проверьте комплектующие и оставьте заявку</p>

              <div className="border border-accent/20 rounded-2xl overflow-hidden mb-6">
                {CATEGORIES.map((cat) => {
                  const item = selection[cat.id];
                  if (!item) return null;
                  return (
                    <div key={cat.id} className="flex items-center justify-between px-6 py-4 border-b border-accent/10 last:border-0">
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">{cat.label}</p>
                        <p className="font-medium text-sm">{item.brand} {item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.specs}</p>
                      </div>
                      <p className="text-accent font-bold text-sm whitespace-nowrap ml-4">{item.price.toLocaleString("ru")} ₽</p>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between px-6 py-4 bg-accent/10">
                  <span className="font-display font-black text-lg">Итого</span>
                  <span className="font-display font-black text-2xl text-accent">{totalPrice.toLocaleString("ru")} ₽</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="font-medium text-sm text-white/80 mb-4">Оставьте заявку — Саня свяжется с вами:</p>
                <input
                  required
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-accent/20 text-white placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors text-sm"
                />
                <input
                  required
                  type="tel"
                  placeholder="Телефон или Telegram"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-accent/20 text-white placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors text-sm"
                />
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-accent to-accent/80 text-black rounded-xl font-bold hover:shadow-lg hover:shadow-accent/30 transition-all">
                  Отправить заявку на сборку
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-display font-black text-3xl mb-3">Заявка принята!</h3>
              <p className="text-muted-foreground mb-2">Саня свяжется с вами в ближайшее время.</p>
              <p className="text-muted-foreground text-sm mb-8">Итоговая стоимость сборки: <span className="text-accent font-bold">{totalPrice.toLocaleString("ru")} ₽</span></p>
              <button onClick={() => navigate("/")} className="px-8 py-3 border border-accent/30 rounded-full text-sm hover:border-accent/60 transition-colors">
                На главную
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> На главную
          </button>
          <div className="font-display font-bold text-xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
            Конфигуратор ПК
          </div>
          <button
            onClick={() => setShowSummary(true)}
            disabled={!requiredDone}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-accent/80 text-black rounded-full text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/30 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalPrice > 0 ? `${totalPrice.toLocaleString("ru")} ₽` : "Корзина"}
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
        {/* Progress */}
        <div className="flex gap-1.5 mb-10">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setStep(i)}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                selection[cat.id] ? "bg-accent" : i === step ? "bg-accent/50" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Category title */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
            <Icon name={category.icon} size={20} className="text-accent" fallback="Cpu" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">{step + 1} / {CATEGORIES.length}</p>
            <h2 className="font-display font-black text-2xl">{category.label}</h2>
          </div>
          {!category.required && <span className="ml-auto text-xs text-muted-foreground border border-white/10 px-2 py-1 rounded-full">Необязательно</span>}
        </div>

        {/* Items */}
        <div className="grid sm:grid-cols-2 gap-3 mt-6 mb-8">
          {category.items.map((item) => {
            const selected = selection[category.id]?.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => select(item)}
                className={`relative text-left p-5 rounded-2xl border transition-all ${
                  selected
                    ? "border-accent bg-accent/10 shadow-lg shadow-accent/20"
                    : "border-accent/10 bg-card/50 hover:border-accent/30 hover:bg-card/80"
                }`}
              >
                {item.tag && (
                  <span className="absolute top-3 right-3 text-xs px-2 py-0.5 bg-accent/20 text-accent rounded-full font-medium">
                    {item.tag}
                  </span>
                )}
                {selected && (
                  <div className="absolute top-3 left-3 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                )}
                <p className="text-xs text-muted-foreground mb-1 mt-0.5">{item.brand}</p>
                <p className="font-bold text-base pr-16">{item.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.specs}</p>
                <p className="text-accent font-black text-lg mt-2">{item.price.toLocaleString("ru")} ₽</p>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 px-6 py-3 border border-accent/20 rounded-full text-sm hover:border-accent/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>

          {/* Selected summary pill */}
          {selection[category.id] && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-white/70">{selection[category.id].name}</span>
              <button onClick={() => setSelection((p) => { const n = { ...p }; delete n[category.id]; return n; })} className="text-muted-foreground hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {step < CATEGORIES.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-black rounded-full text-sm font-bold hover:shadow-lg hover:shadow-accent/30 transition-all"
            >
              Далее <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowSummary(true)}
              disabled={!requiredDone}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-black rounded-full text-sm font-bold hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Оформить сборку <Check className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Total */}
        {totalPrice > 0 && (
          <div className="mt-8 p-4 border border-accent/10 rounded-xl bg-accent/5 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Текущая стоимость сборки</span>
            <span className="font-display font-black text-xl text-accent">{totalPrice.toLocaleString("ru")} ₽</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Configurator;