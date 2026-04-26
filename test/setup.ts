/* =========================================================
   Test setup — runs once before any test file (per bunfig.toml
   `[test].preload`). Three responsibilities:

   1. Register happy-dom as the global DOM environment so React
      Testing Library can render components into a virtual DOM.
   2. Wire @testing-library/jest-dom matchers (toBeInTheDocument,
      toHaveAttribute, etc.) into Bun's expect.
   3. Stub the `server-only` marker package so we can import
      modules that flag themselves as RSC-only (peptide-motif.tsx,
      content.ts) from unit tests. The marker exists purely to
      raise at bundler time; in our Node test runtime the default
      export throws, so we replace it with a no-op.
   ========================================================= */

import { GlobalRegistrator } from "@happy-dom/global-registrator";
GlobalRegistrator.register();

import { expect, mock } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";

mock.module("server-only", () => ({}));

// jest-dom matchers were typed for Jest. Bun's expect.extend accepts
// the same object shape at runtime, but TypeScript can't reconcile the
// two MatcherResult declarations. Cast through `unknown` is the
// pragmatic compromise — runtime works, ergonomics + types via
// test/jest-dom.d.ts.
expect.extend(
  matchers as unknown as Parameters<typeof expect.extend>[0],
);
