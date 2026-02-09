# JOD Urasuunnittelu UI

The contents of this repository have been copied from the [jod-urasuunnittelu-ui](https://github.com/Opetushallitus/jod-urasuunnittelu-ui) repository. The original repository is private and this repository is public. All new changes will be made to this repository.

## Overview

The digital self-assessment tool for career planning skills (Urasuunnittelutaitojen digitaalinen itsearviointityölalu) is an online service that allows individuals to evaluate their level of career planning skills in relation to the skill areas (taitoalue) defined in the national career planning skills framework (kansallinen urasuunnittelutaitojen viitekehys). Based on this skill level, users are provided with appropriate additional exercises within the service.

This is a browser-based service that can be used on mobile phones, computers, or tablets. The service will be publicly accessible so that anyone can use it without mandatory registration or the creation of a user account.

The goal of the service is to help individuals understand their career planning skills and to inspire and assist them in developing these skills. In practice, the service presents users with questions based on the national career planning skills framework and, based on their answers, provides additional tasks and links to materials and tasks available elsewhere on the web. The service also provides feedback on the relative skill levels across different areas of career planning skills.

The service will include functionality that allows users to save either a completed or partially completed questionnaire and return to view or modify their responses later. Saving or returning to the questionnaire will be implemented in a simple manner, such as via a link provided to the user.

Saving only stores the information about the skill level the user has selected in each area, or their text answers for PDF generation.

## Technical overview

The project is constructed based on [jod-yksilo-ui](https://github.com/Opetushallitus/jod-yksilo-ui) repository created by Gofore under the EUPL 1.2 license. The development practices used there are closely followed to account for future move of Urasuunnittelu under JOD. This will be done either as a released React component or by moving code into their repository. The move will be made in summer 2025.

### Getting up and running

Clone the repository and run <code>npm install</code> and <code>npm exec allow-scripts run</code> and <code>npm run dev</code> to start the development server.

### Download third-party UI assets

Third-party assets such as images, fonts, and icons are stored in a S3 bucket. Guide to download assets is available in the infrastructure repository.

## Updating JOD Design System

To update the JOD Design System to the latest version:

1. Check the latest release in the [JOD Design System GitHub repository](https://github.com/Opetushallitus/jod-design-system/releases)
2. Update the `@jod/design-system` dependency URL in `package.json` to point to the latest release `.tgz` file
3. Run `npm install` to install the updated version

### Technologies

- [React](https://react.dev/), [Vite](https://vitejs.dev/) and [Typescript](https://www.typescriptlang.org/) are used to build the UI
- [React-i18next](https://react.i18next.com/) is used for translations
- [TailwindCSS](https://tailwindcss.com/) is used for styling
- [HeadlessUI](https://headlessui.com/) is used for accessible headless UI components
- [Vitest](https://vitest.dev/) and [Playwright](https://playwright.dev/) are used to test the application

### Folder structure

<pre>
├── e2e                      # playwright test specs
├── public
├── src
│   ├── assets
│   │   └── fonts            # fonts used in the app, loaded in index.css
│   ├── components           # common UI components
│   ├── features             # feature based folder structure for components/hooks/etc that are not common
│   │   └── career-planning  # (example) folder that contains all career-planning specific files
│   │       ├── components   # (example) components only for career-planning
│   │       ├── hooks        # (example) hooks only for career-planning
│   │       └── lib          # (example) data and constant handling files for career-planning
│   ├── hooks                # custom hooks
│   ├── i18n                 # translation files split into language folders
│   ├── icons                # svg icons exported in index file, uses vite-plugin-svgr
│   ├── lib                  # files handling data or contants
│   ├── routes               # folders for page components
│   └── stores               # Zustand stores for state management

</pre>

### Routing

The routing is based on [React Router](https://reactrouter.com/) and [React Router Dom](https://reactrouter.com/docs/en/v6/api/).

All <code>/:lng/career-planning/\*_/_</code> routes are created dynamically from content in <code>src/lib/content.tsx</code>.

### Content and content version

A CMS would have been the perfect way to handle content for this site. However, due to the fact no backend is used, content is stored in a CMS-in-JS solution in [content.tsx](src/lib/content.tsx). This content file is typed in [content-types.ts](src/lib/content-types.ts). More reasoning for having this in JS includes the low need of changes and the need to restore application state when a user returns to the site from a link created with a previous version.

Content is a versioned array of content objects. Currently there is only version 1, but due to the requirement to be able to add new content in the future, multiple versions are planned, and taken care of when content (more precisely, skill areas list) is used with the [useSkillAreas](src/hooks/useSkillAreas.ts). Language changes are also handled inside the hook.

### Session storage

One requirement for keeping user data available for PDF generation was to keep state between page views, but not store the users' answers so that they can be accessed by anybody else when using for example a public computer. The solution was to use Zustand's persist to persist store states to session storage. Session storage was chosen over local storage to clear data when leaving the page.

A known limitation to this is that the user can not use the site on multiple tabs or browser windows. The need to be careful about users' answers being accessible by others overrides this limitation.

### Notable dependencies

#### Zustand

The project uses [Zustand](https://github.com/pmndrs/zustand) for state management, instead of Redux Toolkit used in jod-yksilo-ui. This decision was made because the project's developers were more familiar with Zustand.

Session storage is heavily utilized with Zustand to keep state between page views just enough that PDF documents can be created and links to incomplete questionnaires or career plan can be saved.

#### React-PDF

The project uses [react-pdf](https://react-pdf.org/) to generate PDF documents. PDF documents are in their own folder at <code>src/features/pdf/</code>. The documents are generated on the browser and there are two use cases:

1. PDF documents that are downloaded to user's device instantly
   - For example, Exercise documents that are saved from a modal opened by marking the exercise as done.
2. PDF documents that are opened in a new tab, where users can view them and optionally save them
   - For example, Results document that can be opened from Career planning Summary page.

## Translation Management

### Overview

This project uses [Tolgee](https://tolgee.io) for translation management. Translation keys are stored in JSON files and automatically synchronized with the Tolgee platform via GitHub Actions. Tolgee provides a web interface for managing translations, collaborating with translators, and tracking translation status.

---

### File Structure

Translation files are organized by namespace and language:

```
src/i18n/
  urataidot/          # Default namespace for JOD Urataidot page specific translations
    fi.json
    en.json
    sv.json
  common/           # Shared translations across JOD projects
    fi.json
    en.json
    sv.json
```

- **`urataidot`** - Contains JOD Urataidot page specific translations (default namespace)
- **`common`** - Contains shared translations used across multiple JOD projects. Reference these in code with `common:` prefix (e.g., `t('common:myKey')`)

---

### Developer Workflow

#### 1. Before Starting Work on a New Feature

Fetch the latest translations from Tolgee CDN to ensure you have up-to-date translations:

```bash
npm run translations:fetch
```

**Always run this when developing features that involve translation changes.**

#### 2. During Development

- Add translation keys to your code using i18next hooks (e.g., `useTranslation()`)
- Add the Finnish source text and all translations (fi, en, sv) to the appropriate JSON file in `src/i18n/`
- Use AI assistance or other tools to help with translations
- For `common` namespace keys, reference them in code with `common:` prefix: `t('common:myKey')`
- Run `npm run translations:check` to verify that all keys are properly defined

**Important:** Never delete translation keys from JSON files manually. Deprecated keys are automatically managed by GitHub Actions.

#### 3. After Merging to Main

GitHub Actions automatically handles:

1. **Push translations to Tolgee** - New translation keys are uploaded to Tolgee platform. Existing keys are not modified or deleted.
2. **Tag management** - The `manage-tags` script runs automatically:
   - Unused keys are marked as deprecated in Tolgee
   - JIRA ticket tags are automatically added (if ticket ID can be parsed from branch or commit) to track when changes reach production
   - Keys can be safely removed from Tolgee once verified in production

**Note:** Updates to existing translations and key deletions must be done directly in the Tolgee platform.

### Available Commands

| Command                      | Purpose                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `npm run translations:check` | Analyze translation keys and detect missing or unused keys                       |
| `npm run translations:fetch` | Download latest translations from Tolgee CDN (run before feature work)           |
| `npm run translations:push`  | Manually upload new keys to Tolgee (requires TOLGEE_API_KEY, GitHub Actions)     |
| `npm run translations:tag`   | Manually tag translation keys by usage (requires TOLGEE_API_KEY, GitHub Actions) |

---

### Configuration

Tolgee configuration is stored in [.tolgeerc.json](.tolgeerc.json). This file defines:

- Project ID and credentials
- Namespaces and languages
- File paths and patterns
- Push/pull settings
