import type { Page } from '@playwright/test';

/**
 * Makes the browser report that WebGL is unavailable, as on old devices or
 * locked-down corporate browsers.
 *
 * Why: CI machines render WebGL on the CPU, and the site runs three animated
 * scenes. That slows every test and causes timeouts when browsers run in
 * parallel. With WebGL off, the site skips the 3D scenes (CanvasErrorBoundary)
 * and keeps all content. So these tests are faster and also prove that this
 * fallback works. The real 3D scene is still covered by the smoke and
 * resilience tests, which opt back in with `test.use({ webgl: true })`.
 */
export async function disableWebGL(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    // @ts-expect-error -- getContext has one overload per context type
    HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) {
      if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') return null;
      return getContext.call(this, type, ...args);
    };
  });
}
