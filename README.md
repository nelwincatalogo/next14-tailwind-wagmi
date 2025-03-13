# Next14-Tailwind-Wagmi Starter Template

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
</p>

<p align="center">
  <img src="https://miro.medium.com/max/1200/1*Y6mWTVoATSq7NGBN49HX9w.jpeg" alt="twin, next, styled-components" width="500">
</p>

## Setup Instruction

1. Install dependencies

```bash
yarn
```

2. Make sure to update the env files

```bash
# 0 = development
# 1 = production
NEXT_PUBLIC_ENV = 0
# WalletConnect 2.0 requires a projectId which you can create quickly and easily for free over at [WalletConnect Cloud](https://cloud.reown.com/sign-in).
NEXT_PUBLIC_REOWN_PROJECT_ID =
NEXT_PUBLIC_RECAPTCHA_SITE_KEY =
```

3. Run the development server

```bash
yarn dev
```

## Table of Contents

- [Getting Started](#getting-started)
- [Summary](#summary)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Run the following command to bootstrap your next-app using this template:

```bash
yarn create next-app [project-name] -e https://github.com/nelwincatalogo/next14-tailwind
```

OR

```bash
npx create-next-app [project-name] -e https://github.com/nelwincatalogo/next14-tailwind
```

## Summary

- [Next.js](https://nextjs.org)
- [TailwindCSS](https://tailwindcss.com/)
- [Absolute Import](https://nextjs.org/docs/advanced-features/module-path-aliases)
- [Shadcn Sonner](https://ui.shadcn.com/docs/components/sonner)
- [React Icons](https://react-icons.github.io/react-icons/search)
- [hookstate](https://hookstate.js.org/) (state management)
- [Metadata for SEO](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- Linting
  - prettier
  - eslint-config-prettier
  - eslint-plugin-prettier
  - eslint-plugin-tailwindcss
- Lint on pre-commit
  - Husky
- Default Font [Geist, Poppins, Inter]
- TypeScript Support
- [React Scan](https://react-scan.com) - Live Code Scanning
- [React Query](https://tanstack.com/query/latest/docs/framework/react/installation) - Data fetching and caching

## Contributing

If you would like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
