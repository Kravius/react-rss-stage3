# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

1. Project Setup
   - Initialize the project using [Vite](https://vitejs.dev/guide/) with the [_react-ts_ template](https://vite.new/react-ts).
     **Install Vite:**
     ```
          npm create vite@latest
          name project  write just "."
          after Ignore files and continue
     ```
     Then run this:
     ```
     npm install
     npm run dev
     ```
2. Code Quality Tools

   1. **ESLint**

      - Set up ESLint:
        ```
        npm i eslint --save-dev
        ```
      - Set up [eslint-plugin-react-compiler](https://www.npmjs.com/package/eslint-plugin-react-compiler):

        ```
        npm install eslint-plugin-react-compiler --save-dev
        ```

      - Change eslintrc.cjs:
        ```
         module.exports = {
        root: true,
        env: { browser: true, es2020: true },
        extends: [
          'eslint:recommended',
          'plugin:@typescript-eslint/recommended',
          'plugin:react-hooks/recommended',
        ],
        ignorePatterns: ['dist', '.eslintrc.cjs'],
        parser: '@typescript-eslint/parser',
        plugins: ["react-compiler", "@typescript-eslint"],
        rules: {
         "@typescript-eslint/no-explicit-any": "error",
         "react-compiler/react-compiler": "error",
        },
        }
        ```

      ```

      ```

   2. **Prettier** - now just install all prettier dependencies:

   ```
      npm install --save-dev --save-exact prettier
      npm i -D eslint-config-prettier eslint-plugin-prettier
      node --eval "fs.writeFileSync('.prettierrc','{}\n')"
      Затем создайте файл .prettierignore, чтобы Prettier CLI и редакторы знали, какие файлы не форматировать. Вот пример:
      Ignore artifacts:
      build
      coverage
   ```

```- Create .prettierrc.cjs file in root directory:

```

          module.exports = {
           trailingComma: "es5",
           tabWidth: 2,
           semi: true,
           singleQuote: true,
           };

````

3.  **Husky**

    - Add Husky and configure it to run linting on pre-commit:
      ```
     npm install --save-dev husky lint-staged
     npx husky init
     node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"

     Добавьте следующее в свой package.json:
{
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
}

4.  package.json commands
    -Add the lint-staged script command in package.json file in the root layer.
    ```"lint-staged": {
        "*.{js,jsx,ts,tsx}": [
        "eslint --quiet --fix",
       "prettier --write --ignore-unknown"
        ],
        "*.{json,html}": [
       "prettier --write --ignore-unknown"
       ]
       },
    ```
    - Add the following npm scripts:
      "format:fix": "prettier --write ./src".

My **_package.json_**:

````

{
"name": "task1",
"private": true,
"version": "0.0.0",
"type": "module",
"scripts": {
"dev": "vite",
"build": "tsc -b && vite build",
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
"preview": "vite preview",
"prepare": "husky",
"format:fix": "prettier --write ./src"
},
"lint-staged": {
"_.{js,jsx,ts,tsx}": [
"eslint --quiet --fix",
"prettier --write --ignore-unknown"
],
"_.{json,html}": [
"prettier --write --ignore-unknown"
]
},
"dependencies": {
"react": "^18.3.1",
"react-dom": "^18.3.1"
},
"devDependencies": {
"@types/react": "^18.3.3",
"@types/react-dom": "^18.3.0",
"@typescript-eslint/eslint-plugin": "^7.13.1",
"@typescript-eslint/parser": "^7.13.1",
"@vitejs/plugin-react": "^4.3.1",
"eslint": "^8.57.0",
"eslint-config-prettier": "^9.1.0",
"eslint-plugin-prettier": "^5.1.3",
"eslint-plugin-react-compiler": "^0.0.0-experimental-0998c1e-20240625",
"eslint-plugin-react-hooks": "^4.6.2",
"eslint-plugin-react-refresh": "^0.4.7",
"husky": "^9.0.11",
"lint-staged": "^15.2.7",
"prettier": "^3.3.2",
"typescript": "^5.2.2",
"vite": "^5.3.1"
}
}

```

```
