# Деплой на Amvera через интерфейс

Проект `food_dev-main/food_dev-main` - это Vite React SPA. На Amvera его нужно запускать как браузерное Node.js-приложение: `Node.JS Browser`.

## Что уже подготовлено

В корне проекта добавлен `amvera.yaml`:

```yaml
meta:
  environment: node
  toolchain:
    name: browser
    version: 20

build:
  artifacts:
    "dist/*": /
```

Amvera установит зависимости, выполнит `npm run build`, возьмет собранные файлы из `dist/` и опубликует их из корня сайта.

## Что загружать

Загружать нужно корень проекта, где лежат:

- `amvera.yaml`
- `package.json`
- `package-lock.json`
- `index.html`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`
- `src/`
- `public/`

Не загружай локальные и сгенерированные папки:

- `node_modules/`
- `dist/`
- `.idea/`

## Как создать чистый zip

Открой PowerShell в папке:

```text
C:\Users\Max\WebstormProjects\food_dev-main\food_dev-main
```

Выполни:

```powershell
$archive = "food_dev-main-amvera.zip"
if (Test-Path $archive) { Remove-Item -LiteralPath $archive }
$items = @(
  "amvera.yaml",
  "package.json",
  "package-lock.json",
  "index.html",
  "vite.config.ts",
  "tsconfig.json",
  "tsconfig.node.json",
  "src",
  "public",
  ".eslintrc.cjs",
  ".gitignore",
  "README.md",
  "AMVERA_DEPLOY.md"
)
Compress-Archive -Path $items -DestinationPath $archive
```

После этого появится файл `food_dev-main-amvera.zip`. Его можно загрузить в интерфейс Amvera.

## Пошаговый деплой в Amvera

1. Открой https://cloud.amvera.ru/ и войди в аккаунт.
2. Нажми `Создать проект`.
3. Выбери тип сервиса `Приложение`.
4. Укажи название проекта и тариф.
5. На шаге загрузки данных выбери загрузку через интерфейс.
6. Загрузи `food_dev-main-amvera.zip`.
7. Если Amvera попросит выбрать окружение, выбери `Node.JS Browser`.
8. Заверши создание проекта и дождись сборки.
9. После запуска открой раздел `Настройки` и добавь бесплатный домен Amvera.

Итоговый адрес будет похож на:

```text
https://<project-slug>.<username>.amvera.io/
```

## Проверка после запуска

Открой главную страницу, затем проверь прямые ссылки вроде `/booking`, `/restaurants/1`, `/baskets`. Если прямые ссылки открываются с 404, проверь, что приложение создано именно в окружении `Node.JS Browser`, а не `Node.JS Server`.
