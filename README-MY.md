# JS
# Install Parcel

1.  npm install parcel-bundler --save-dev<br>
2.  "scripts": { <br>"dev": "parcel <your entry file>", <br>"build": "parcel
    build <your entry file>" <br>}, <br>
3.  npm run dev<br>
4.  npm run build<br>
5.  npm install -D sass<br>
6.  .sassrc и туда добавить { "includePaths": ["node_modules"] }<br> в index.js
    import './main.scss' or in index.html
    "<link rel="stylesheet" href="./main.scss">"<br>
7.  <br>-Редактируем скрипт build и добавляем --public-url /имя*репозитория/<br>
    -Редактрируем в package.json поле "homepage":
    "https://ваше*имя.github.io/имя_репозитория" <br>-Устанавливаем пакет npm
    install gh-pages <br>-Добавляем npm-скрипты: "deploy": "gh-pages -d dist"
    "predeploy": "npm run build"<br>
8.  npm i - установка в dependencies <br>npm i -D - установка в
    devDependencies<br>
9.  instal i or i -D: <br>"devDependencies": <br>{ "parcel-bundler": "^1.12.5",
    "parcel-plugin-handlebars-precompile": "^1.0.2", "parcel-plugin-nuke-dist":
    "^1.0.1", "posthtml-img-autosize": "^0.1.6", "posthtml-include": "^1.7.1",
    "sass": "^1.35.2"}, <br>"dependencies":<br> { "gh-pages": "^3.2.3" }<br>
10. npm i -D posthtml-img-autosize<br>add file ".posthtmlrc.js"<br>add in
    file:<br>module.exports = { plugins: { 'posthtml-include': { root:
    \_\_dirname + '/src', }, }, }; <br>or <br>{ "plugins": {
    "posthtml-img-autosize": { "root": "./images" }, "posthtml-modules": {
    "root": "./src" } } }<br>
11. add file ".htmlnanorc.js"<br>add in file { "minifySvg": false } or {
    "removeComments": false }<br>
12. add file ".prettierrc.json"<br>add in file: { "printWidth": 80, "tabWidth":
    2, "useTabs": false, "semi": true, "singleQuote": true, "trailingComma":
    "all", "bracketSpacing": true, "jsxBracketSameLine": false, "arrowParens":
    "avoid", "proseWrap": "always" }<br>or<br>add file ".prettierrc.yaml"<br>add
    in file: printWidth: 100 useTabs: false semi: true singleQuote: true
    trailingComma: 'all' bracketSpacing: true arrowParens: 'avoid' proseWrap:
    'always'<br>
13. npm run deploy что бы добавилась живая стр
14. добавить папку ".github"->add file "deploy.yml"->add info:<br> name: Build
    and deploy to GitHub Pages<br>

    on:<br> push:<br> branches: [main]<br>

    jobs:<br> build-and-deploy:<br> runs-on: ubuntu-latest steps:<br> - name:
    Checkout 🛎️<br> uses: actions/checkout@v2.3.1<br>

          - name: Install and Build 🔧
            run: |
              npm ci
              npm run build

          - name: Deploy 🚀
            uses: JamesIves/github-pages-deploy-action@4.1.0
            with:
              branch: gh-pages
              folder: dist

------------------------------------------------------------------------<br>

# Eсли использовать как шаблон<br>

1. npm ci<br>
2. npm run dev<br>
3. Деплой<br> Сборка будет автоматически собирать и деплоить продакшен версию
   проекта на GitHub Pages, в ветку gh-pages, каждый раз когда обновляется ветка
   main. Например, после прямого пуша или принятого пул-реквеста. Для этого
   необходимо в файле package.json отредактировать поле homepage и скрипт build,
   заменив имя*пользователя и имя*репозитория на свои.<br> "homepage":
   "https://имя*пользователя.github.io/имя*репозитория",<br> "scripts": {<br>
   "build": "parcel build src/\*.html --public-url /имя_репозитория/"<br> },<br>

------------------------------------------------------------------------<br> npm
  # dependencies/devDependencies
  
i - установка в dependencies(--save; требуются для запуска, попадёт в продакшн,
пакеты, от которых ваш пакет зависит непосредственно: как правило — библиотеки)
<br>npm i -D - установка в devDependencies(--save-dev; только для разработки/как
зависимость для разработки)<br>
------------------------------------------------------------------------<br>

# Удалить devDependencies<br>

https://docs.npmjs.com/uninstalling-packages-and-dependencies<br>

npm uninstall <name> удаляет модуль из node_modules, но не package.json<br> npm
uninstall <name> --save также удаляет его из dependencies в package.json<br> npm
uninstall <name> --save-dev также удаляет его из devDependencies в
package.json<br> npm -g uninstall <name> --save также удаляет его глобально<br>
------------------------------------------------------------------------<br>
# REACT
  npx create-react-app . - установить в этой папке<br>
    https://create-react-app.dev/docs/getting-started/<br>
  добавить .gitignore, .prettierrc.json/yaml<br>
  ------------------------------------------------------------------------<br>
# Настройка pre-commit хуков

## 1 - Установка зависимостей

Установить в проект следующие пакеты.

```bash
npm install --save-dev prettier eslint
```

## 2 - Инициализация lint-staged и husky

Пользователям **MacOS** и **Linux** систем необходимо выполнить в терминале
следующую команду. Она установит и настроит `husky` и `lint-staged` в
зависимости от инструментов качества кода из зависимостей проекта в
`package.json`.

```bash
npx mrm lint-staged
```

Пользователям **Windows** необходимо выполнить следующую команду. Она делает
тоже самое.

```bash
npx mrm@2 lint-staged
```

## 3 - Интерграция плагинов

Ссылки на документацию по интеграции плагинов в популярные редакторы.

- [Prettier editor integration](https://prettier.io/docs/en/editors.html)
- [ESLint editor integration](https://eslint.org/docs/user-guide/integrations)

## 4 - Настройки VSCode

Для комфортной работы, после установки плагинов, нужно добавить несколько
настроек редактора для автосохранения и форматирования файлов.

```json
{
  "files.autoSave": "onFocusChange",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
  ------------------------------------------------------------------------<br> 
  # Установить пакет prop-types в рпоект<br>
  https://www.npmjs.com/package/prop-types<br>
  npm i prop-types<br>
  ------------------------------------------------------------------------<br> 
