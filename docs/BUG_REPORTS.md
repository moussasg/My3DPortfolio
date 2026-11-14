# Bug Reports

Defects found by the automated test suite in this repository, and how each one was fixed.

**Workflow:** each bug was first captured by a test that checks the *correct*
behaviour, marked as an expected failure with `knownBug(...)` (Playwright
`test.fail()`), so the pipeline stayed green while the bug was open. After the
fix, the marker was removed and the test now runs as a **regression test**.
Each one is labelled `// Regression test for BUG-xx` in the code.

| ID | Title | Severity | Area | Status | Regression test |
|---|---|---|---|---|---|
| [BUG-01](#bug-01) | Hamburger menu is invisible on phones | High | Mobile / Navigation | ✅ Fixed | `e2e/mobile.spec.ts` |
| [BUG-02](#bug-02) | Whole site goes blank if a 3D model fails to load | High | Resilience | ✅ Fixed | `e2e/resilience.spec.ts` |
| [BUG-03](#bug-03) | Contact form sends the service ID as the template ID | High | Contact form | ✅ Fixed | `e2e/contact-form.spec.ts` |
| [BUG-04](#bug-04) | "Send" button says "sent successfully" before the message is sent | Medium | Contact form | ✅ Fixed | `e2e/contact-form.spec.ts` |
| [BUG-05](#bug-05) | Project preview icon opens the project in two tabs | Medium | Projects | ✅ Fixed | `e2e/links.spec.ts` |
| [BUG-06](#bug-06) | Stray `\` character on the QA Automation project card | Medium | Projects / UI | ✅ Fixed | `e2e/content.spec.ts` |
| [BUG-07](#bug-07) | Images without alt text and links without a name | Medium | Accessibility | ✅ Fixed | `a11y/accessibility.spec.ts` |
| [BUG-08](#bug-08) | "To Top" control cannot be used with the keyboard | Low | Accessibility | ✅ Fixed | `a11y/accessibility.spec.ts` |
| [BUG-09](#bug-09) | External links use `target="blank"` and no `rel="noopener"` | Low | Links / Security | ✅ Fixed | `e2e/links.spec.ts` |
| [BUG-10](#bug-10) | Page has three `<h1>` headings | Low | SEO | ✅ Fixed | `seo/seo.spec.ts` |
| [BUG-11](#bug-11) | `<title>` in index.html differs from the runtime title | Low | SEO | ✅ Fixed | `seo/seo.spec.ts` |
| [BUG-12](#bug-12) | Experience date written "Mars 2024" | Low | Content | ✅ Fixed | `e2e/content.spec.ts` |
| [BUG-13](#bug-13) | Projects section cannot be linked to | Low | Navigation | ✅ Fixed | `e2e/navigation.spec.ts` |

---

### BUG-01
**Hamburger menu is invisible on phones**

- **Severity:** High: visitors on phones had no navigation menu at all.
- **Environment:** Pixel 7 (412 px) and iPhone 14 (390 px) viewports, Chromium and WebKit.
- **Steps to reproduce:**
  1. Open the site on a phone, or in a desktop browser narrower than 640 px.
  2. Look for the menu icon at the top right.
- **Expected:** A hamburger icon is shown; tapping it opens the navigation menu.
- **Actual:** The icon is not shown. The navbar title ("Moussa | QA Automation Engineer – Playwright & TypeScript") takes the whole row, and the icon's container shrinks to **0 px** wide.
- **Root cause:** `Navbar.tsx`: the menu container was `flex-1` and could shrink to zero, while the title could not wrap or truncate.
- **Fix:** The menu container no longer shrinks, the title truncates if space runs out, and screens narrower than 1280 px show the short name "Moussa Souag". The icon is now a real `<button>` with `aria-label` and `aria-expanded`.

### BUG-02
**Whole site goes blank if a 3D model fails to load**

- **Severity:** High: one failed asset request took down the entire page.
- **Steps to reproduce:**
  1. Block `desktop_pc/scene.gltf` (DevTools → Network → Block request URL), or use a flaky connection.
  2. Reload the page.
- **Expected:** The 3D scene is missing, but the text, projects and contact form are still shown.
- **Actual:** The page is completely empty (`#root` has no children). Console: `Could not load ./desktop_pc/scene.gltf: Failed to fetch`.
- **Root cause:** `useGLTF` throws when loading fails, and there was no React error boundary around the `<Canvas>` components, so React unmounted the whole app.
- **Fix:** New `CanvasErrorBoundary` component wraps the computer, earth and stars scenes. A failed scene now renders nothing, and the rest of the page stays usable. This also covers browsers without WebGL.

### BUG-03
**Contact form sends the service ID as the template ID**

- **Severity:** High: messages from recruiters could fail to arrive.
- **Found by:** intercepting the EmailJS request with `page.route()` and checking its payload.
- **Expected:** `template_id` in the request equals the configured EmailJS template ID.
- **Actual:** `template_id` equals the **service** ID.
- **Root cause:** `Contact.tsx`: `templateId: import.meta.env.VITE_EMAILJS_SERVICE_ID`.
- **Fix:** Reads `VITE_EMAILJS_TEMPLATE_ID`. The three variables are documented in `.env.example` and typed in `vite-env.d.ts`.
- **⚠️ Deployment step:** add `VITE_EMAILJS_TEMPLATE_ID` in Vercel → Project Settings → Environment Variables, redeploy, then send a test message from the live site.

### BUG-04
**"Send" button says "sent successfully" before the message is sent**

- **Severity:** Medium: misleading feedback.
- **Steps to reproduce:** Fill in the contact form on a slow connection and click **Send**.
- **Expected:** While the request is in progress the button shows a neutral state.
- **Actual:** The button showed **"sent successfully"** while the request was still pending, and kept showing it if `emailjs.send` threw (for example, when a key is missing), because the loading state was never reset.
- **Fix:** The button shows "Sending..." and is disabled during the request, which also prevents double submissions. The request uses `try / catch / finally`, so the state is always reset and errors always show a message.

### BUG-05
**Project preview icon opens the project in two tabs**

- **Severity:** Medium
- **Steps to reproduce:** In **Projects**, click the small round icon at the top right of any project image.
- **Expected:** One new tab opens.
- **Actual:** Two tabs open.
- **Root cause:** `Works.tsx`: the icon called `window.open(url, "_blank")`, and the click also bubbled up to the surrounding `<a href={url}>`, which navigated too.
- **Fix:** Removed the `window.open` handler. The link now covers the picture and has an accessible name ("Visit the … website").

### BUG-06
**Stray `\` character on the QA Automation project card**

- **Severity:** Medium: a visible typo on the most important project card for a QA role.
- **Root cause:** `customizedlink.tsx`: `</div>\` (a leftover backslash after the closing tag).
- **Fix:** Removed the character. The QA cards were later rebuilt as one reusable component (`QAProjectCard.tsx`), and the test checks every QA card for stray characters.

### BUG-07
**Images without alt text and links without a name**

- **Severity:** Medium: WCAG 2.1 A violations (axe rules `image-alt` [critical] and `link-name` [serious]).
- **Affected elements:** GitHub and LinkedIn icons in the Contact section (so their links had no accessible name), and the rotation hint image in the hero.
- **Fix:** `alt="GitHub"` and `alt="LinkedIn"`; decorative images (rotation hint, service icons, project and scroll icons) use `alt=""`. The full-page axe scan now reports zero WCAG 2.1 AA violations.

### BUG-08
**"To Top" control cannot be used with the keyboard**

- **Severity:** Low
- **Actual:** It was a `<div onClick>`, so keyboard and screen-reader users could not use it.
- **Fix:** It is now a `<button>`. Its scroll listener is also removed on unmount, and it no longer logs the scroll position to the console on every scroll event.

### BUG-09
**External links use `target="blank"` and no `rel="noopener"`**

- **Severity:** Low
- **Actual:** `target="blank"` (no underscore) opens a window *named* "blank", so every link reused that same tab: opening a second project replaced the first one. The links also had no `rel="noopener"`.
- **Fix:** `target="_blank" rel="noopener noreferrer"` in `Experience.tsx`, `Works.tsx` and `Contact.tsx`. The test checks every external link on the page.

### BUG-10
**Page has three `<h1>` headings**

- **Severity:** Low (SEO)
- **Actual:** `<h1>` was used for "Hi, I'm", "Technical Skills" and "1 - Automated QA portfolio", and the main `<h1>` did not contain the name.
- **Fix:** A single `<h1>`, "Hi, I'm Moussa". "Technical Skills" is an `<h2>` like the other sections. The Projects sub-sections are `<h3>`: "1. QA Automation" and "2. Front-End Development".

### BUG-11
**`<title>` in index.html differs from the runtime title**

- **Severity:** Low (SEO / link previews)
- **Actual:** `index.html` contained `" Moussa Souag| QA Automation Engineer – Playwright & TypeScript"`, while `config.ts` changed it at runtime to `"Moussa | QA Automation Engineer – Playwright & TypeScript"`.
- **Fix:** Same title in both places. Open Graph tags and a 1200×630 preview image were also added, so links shared on LinkedIn show a proper preview card.

### BUG-12
**Experience date written "Mars 2024"**

- **Severity:** Low (content)
- **Fix:** "Mar 2024". The test checks that every date uses the `Mon YYYY - Mon YYYY` format.

### BUG-13
**Projects section cannot be linked to**

- **Severity:** Low
- **Actual:** The Projects section was created with `SectionWrapper(Works, "")`, so it had an empty `id` and no navbar entry, although it is one of the sections recruiters most want to reach.
- **Fix:** The section id is `projects` and the navbar has a **Projects** link. The Skills section also got an id (`skills`).
