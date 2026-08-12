# Next.js TypeScript CLI checker POC

Run Next.js TypeScript language service plugin diagnostics in the terminal. As of August 2026, [the TypeScript team has rejected the feature request for `tsc` to execute language service plugins](https://github.com/microsoft/TypeScript/issues/16607), so `scripts/next-tsc.ts` creates a TypeScript project service and reads the plugin diagnostics for `app/layout.tsx`.

This proof of concept responds to [the missing Next.js CLI type check reported in `vercel/next.js#97229`](https://github.com/vercel/next.js/issues/97229).

This follows the direct language service approach in [`effect-language-service diagnostics`](https://github.com/Effect-TS/language-service/blob/5e4d380b6fcd20f048dd8d41515bcd9ea47ffda4/packages/language-service/src/cli/diagnostics.ts#L341-L465) and these Next.js tests:

- [`createPluginLanguageService()` test harness setup](https://github.com/vercel/next.js/blob/cb36e1d5946eb3bf6473b535e9537a54f257ba27/test/development/typescript-plugin/test-utils.ts#L34-L100)
- [`metadata` without a type TS71008 test](https://github.com/vercel/next.js/blob/cb36e1d5946eb3bf6473b535e9537a54f257ba27/test/development/typescript-plugin/metadata/warn-no-type.test.ts#L131-L183)

[`app/layout.tsx`](https://github.com/karlhorky/poc-next-js-type-checker-cli/blob/main/app/layout.tsx) deliberately exports `metadata` without the `Metadata` type from `next`.

```bash
$ pnpm next-tsc
$ node scripts/next-tsc.ts

app/layout.tsx(1,14): warning TS71008: The Next.js "metadata" export should be type of "Metadata" from "next".

[ELIFECYCLE] Command failed with exit code 1.
```

<img width="2874" height="1804" alt="VS Code showing the Next.js metadata TS71008 warning and next-tsc exit code 1" src="https://github.com/user-attachments/assets/c8c80486-4955-44e2-a0a3-a13a82ba0f8c" />

The nonzero exit code also fails the GitHub Actions CI workflow.

<img width="2876" height="1790" alt="GitHub Actions failing on the Next.js metadata TS71008 warning from next-tsc" src="https://github.com/user-attachments/assets/ec9d6e12-0d87-4829-88b4-84a5b5b07053" />
