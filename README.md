### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope client`

Удаление зависимости
`yarn lerna exec 'yarn remove {your_dep}' --scope client`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

## Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере

Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса

1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

### Сборка

`docker compose build` - сборка всех сервисов (для сборки и послдедующего запуска - `docker compose up --build`)

Сборка отдельного сервиса:
`docker compose build {sevice_name}`, например `docker compose build`

### Остановка

`docker compose stop` - остановка всех сервисов

Остановка отдельного сервиса:
`docker compose stop {sevice_name}`, например `docker compose stop server`

### Прочее

`docker ps` или `docker compose ps` - просмотр запущенных контейнеров или сервисов

`docker ps -a` или `docker compose ps -a` - просмотр всех существующих контейнеров или сервисов

`docker system prune --all` - для очистки ранее созданных контейнеров и кэша

## Описание игры

### Основные элементы игры:

1. **Стартовый экран:**

   - Игра начинается со стартового экрана, на котором расположено главное меню.

2. **Игровой процесс:**

   - После нажатия кнопки "Start game", игрок попадает на игровое бесконечное поле, по которому нужно двигаться при помощи четырех кнопок на клавиатуре: W, A, S, D.
   - Выстрелы осуществляются в направлении движения игрока.

3. **Управление:**

   - W: движение вперед с автоматическими выстрелами вперед.
   - S: движение назад с автоматическими выстрелами назад.
   - A: движение влево с выстрелами влево.
   - D: движение вправо с выстрелами вправо.

4. **Диагональное движение:**

   - W + A: диагональное движение вверх и влево.
   - A + S: диагональное движение вниз и влево.
   - S + D: диагональное движение вниз и вправо.
   - D + W: диагональное движение вверх и вправо.

5. **Враги:**

   - Мини Жуки (2 хп) появляются на 0 минуте.
   - Жуки (4 хп) появляются на 2 минуте.
   - Жучары (10 хп) появляются на 4 минуте.
   - Мегажуки (25 хп) появляются на 6 минуте.

6. **Улучшения при достижении нового уровня:**
   - **Сердца:** Увеличивает кол-во здоровья на 1
   - **Урон от пуль:** Увеличивает урон от пуль на 30% от текущего урона.
   - **Скорость перезарядки:** Уменьшает скорость перезарядки оружия на 10% от текущей скорости.
   - **Скорость передвижения:** Увеличивает скорость передвижения игрока на 10% от текущего уровня.
   - **Дальность магнита кристаллов:** Увеличивает дальность магнита, позволяя собирать кристаллы на большем расстоянии.
   - **Thanos snap:** Половина всех врагов умирает.
   - **Огнемет:** В течение 10 секунд игрок получает высокую скорость перезарядки и большой урон от пуль.

### Игровой экран:

- **Шкала уровня и кристаллов:** Показывает прогресс игрока к повышению уровня.
- **Отчет времени:** Показывает прошедшее время игры.
- **Иконки улучшений:** Отображают полученные игроком улучшения.
- **Количество убитых врагов и сердец:** Показывает статистику игрока.
- **Кнопка "Выйти":** Позволяет покинуть игру и вернуться к стартовому экрану.

### Окна в игре:

- **Игра окончена:** Всплывает при смерти игрока, с возможностью вернуться к стартовому экрану или начать новую игру

### Видео с демонстрацией реализации:

https://disk.yandex.ru/i/IjqTjC1OSPC_tw
