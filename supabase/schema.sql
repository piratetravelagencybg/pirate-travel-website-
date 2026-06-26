-- Pirate Travel Agency — Supabase Schema
-- Run this in your Supabase SQL editor

-- Offers table
CREATE TABLE offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  country TEXT NOT NULL,
  type TEXT DEFAULT 'group',
  price_eur INTEGER NOT NULL,
  price_bgn INTEGER,
  dates TEXT,
  duration_days INTEGER,
  transport TEXT DEFAULT 'bus',
  description TEXT,
  program JSONB,
  includes TEXT[],
  excludes TEXT[],
  image_url TEXT,
  gallery_urls TEXT[],
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inquiries table
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  destination TEXT,
  travel_date TEXT,
  travelers INTEGER DEFAULT 2,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public read on active offers
CREATE POLICY "Public can read active offers" ON offers
  FOR SELECT USING (active = true);

-- Allow public insert on inquiries
CREATE POLICY "Public can insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- Seed data
INSERT INTO offers (slug, title, destination, country, type, price_eur, price_bgn, dates, duration_days, transport, description, program, includes, excludes, image_url, active, featured) VALUES
(
  'gartsia-korfu',
  'Гърция — Корфу',
  'Корфу',
  'Гърция',
  'group',
  199,
  390,
  'Юни - Септември 2025',
  5,
  'bus',
  'Открийте красотата на Корфу — остров с кристално чисти води, живописни градчета и богата история.',
  '[{"day":1,"title":"Благоевград → Корфу","description":"Тръгване от Благоевград, нощно пътуване"},{"day":2,"title":"Пристигане в Корфу","description":"Настаняване, разходка по стария град"},{"day":3,"title":"Свободен ден","description":"Плаж и отдих"},{"day":4,"title":"Обиколка на острова","description":"Palaiokastritsa, Achilleion, Glyfada Beach"},{"day":5,"title":"Завръщане","description":"Тръгване за Благоевград"}]',
  ARRAY['Транспорт с луксозен автобус', '4 нощувки в хотел 3*', 'Закуски', 'Фериботни такси', 'Водач'],
  ARRAY['Обяди и вечери', 'Входни такси', 'Лична застраховка'],
  '/images/santorini.png',
  true,
  true
),
(
  'turtsia-istanbul',
  'Турция — Истанбул',
  'Истанбул',
  'Турция',
  'group',
  129,
  252,
  'Целогодишно',
  3,
  'bus',
  'Истанбул — градът на два континента. Посетете Света София, Синята джамия, Гранд Базар.',
  '[{"day":1,"title":"Благоевград → Истанбул","description":"Тръгване вечерта"},{"day":2,"title":"Истанбул","description":"Света София, Синята джамия, Гранд Базар"},{"day":3,"title":"Завръщане","description":"Тръгване за България"}]',
  ARRAY['Транспорт с автобус', '2 нощувки в хотел', 'Закуски', 'Водач'],
  ARRAY['Входни такси', 'Обяди и вечери', 'Лична застраховка'],
  null,
  true,
  true
),
(
  'sarbia-belgrad',
  'Сърбия — Белград',
  'Белград',
  'Сърбия',
  'group',
  89,
  174,
  'Целогодишно',
  2,
  'bus',
  'Белград — живата столица на Балканите с незабравим нощен живот и история.',
  '[{"day":1,"title":"Благоевград → Белград","description":"Ранно тръгване, обяд в Белград, разходка"},{"day":2,"title":"Белград → Благоевград","description":"Сутринна разходка, тръгване следобед"}]',
  ARRAY['Транспорт с автобус', '1 нощувка в хотел', 'Закуска', 'Водач'],
  ARRAY['Обяди и вечери', 'Лична застраховка'],
  null,
  true,
  true
),
(
  'mania-brashov-drakula',
  'Румъния — Брашов & Замъкът на Дракула',
  'Брашов',
  'Румъния',
  'group',
  149,
  291,
  'Пролет - Есен 2025',
  3,
  'bus',
  'Средновековен Брашов и мистичният Замък Бран — незабравимо пътуване!',
  '[{"day":1,"title":"Благоевград → Брашов","description":"Тръгване сутринта"},{"day":2,"title":"Замък Бран & Брашов","description":"Замъкът на Дракула и стария Брашов"},{"day":3,"title":"Завръщане","description":"Тръгване за Благоевград"}]',
  ARRAY['Транспорт с автобус', '2 нощувки', 'Закуски', 'Водач'],
  ARRAY['Вход за замъка', 'Обяди и вечери'],
  null,
  true,
  false
),
(
  'gartsia-lefkada',
  'Гърция — Лефкада',
  'Лефкада',
  'Гърция',
  'group',
  249,
  487,
  'Юли - Август 2025',
  6,
  'bus',
  'Лефкада — остров с едни от най-красивите плажове в Европа.',
  '[{"day":1,"title":"Тръгване","description":"Нощно пътуване"},{"day":2,"title":"Пристигане","description":"Настаняване"},{"day":3,"title":"Порто Кацики","description":"Легендарният плаж"},{"day":4,"title":"Свободен ден","description":"Плаж и отдих"},{"day":5,"title":"Обиколка","description":"Никяна, Нидри"},{"day":6,"title":"Завръщане","description":"Тръгване сутринта"}]',
  ARRAY['Транспорт', '5 нощувки', 'Закуски', 'Водач', 'Фериботни такси'],
  ARRAY['Обяди и вечери', 'Лична застраховка'],
  null,
  true,
  true
),
(
  'turtsia-kapadokia',
  'Турция — Кападокия',
  'Кападокия',
  'Турция',
  'group',
  199,
  390,
  'Пролет - Есен 2025',
  4,
  'mixed',
  'Кападокия — магичен свят от скални формации и балони над облаците.',
  '[{"day":1,"title":"Тръгване","description":"Полет или нощен автобус"},{"day":2,"title":"Кападокия","description":"Долината Göreme"},{"day":3,"title":"Балон & Деринкую","description":"Подземен град"},{"day":4,"title":"Завръщане","description":"Полет обратно"}]',
  ARRAY['Транспорт', '3 нощувки', 'Закуски', 'Водач'],
  ARRAY['Полет с балон', 'Вечери', 'Лична застраховка'],
  null,
  true,
  false
),
(
  'sarbia-ceca-leskovac',
  'Сърбия — Концерт с Цеца в Лесковац',
  'Лесковац',
  'Сърбия',
  'event',
  140,
  274,
  'По програма',
  2,
  'bus',
  'Концерт на Светлана Ражнатович — Цеца в Лесковац. Включва билет за концерта!',
  '[{"day":1,"title":"Благоевград → Лесковац","description":"Пристигане и КОНЦЕРТ"},{"day":2,"title":"Завръщане","description":"Тръгване сутринта"}]',
  ARRAY['Транспорт', '1 нощувка', 'Билет за концерта', 'Водач'],
  ARRAY['Храна и напитки', 'Лична застраховка'],
  null,
  true,
  false
),
(
  'italia-sardinia',
  'Италия — Сардиния',
  'Сардиния',
  'Италия',
  'group',
  399,
  780,
  'Юни - Септември 2025',
  7,
  'mixed',
  'Сардиния — перлата на Средиземно море с кристални води и бели плажове.',
  '[{"day":1,"title":"Полет","description":"Отпътуване"},{"day":2,"title":"Каляри","description":"Столицата"},{"day":3,"title":"Коста Смералда","description":"Луксозния бряг"},{"day":4,"title":"Свободен ден","description":"Плаж"},{"day":5,"title":"Алгеро","description":"Каталонски град"},{"day":6,"title":"Свободен ден","description":"Пазаруване"},{"day":7,"title":"Завръщане","description":"Полет обратно"}]',
  ARRAY['Полет', '6 нощувки в хотел 4*', 'Закуски', 'Трансфери', 'Водач'],
  ARRAY['Обяди и вечери', 'Лична застраховка', 'Туристически данък'],
  null,
  true,
  false
);
