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

Clone the repository and run <code>npm install</code> and <code>npm run dev</code> to start the development server.

### Download third-party UI assets

Third-party assets such as images, fonts, and icons are stored in a S3 bucket. Guide to download assets is available in the infrastructure repository.

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

This project manages translations using JSON files and an Excel-based workflow.  
The Excel files are generated from existing JSON translation files, sent for translation, and then imported back to update the source files.  
This process keeps all texts synchronized, tracks changes efficiently, and simplifies communication with translation services.

---

### File Structure

Each language has **two translation files**:

- **`translations.json`** - Contains approved translations provided by the translation service.
- **`draft.translations.json`** – Contains new or modified texts that have not yet been professionally translated.

All new or updated texts must be translated directly into the `draft.translations.json` files (manually or with AI assistance).  
No changes should ever be made directly to `translations.json`.

---

### Process

#### 1. During Development

- Add all new and modified texts to `draft.translations.json`.
- Always provide translations for the new or changed texts.
- Do not edit `translations.json` manually.

#### 2. When Requesting Translations (Export to Excel)

- Generate Excel files for translators using:

  ```bash
  npm run translations:export
  ```

- The script merges `translations.json` and `draft.translations.json`, ensuring all Finnish texts are included and modified texts override existing ones.

- The generated Excel file appears in:

```
translation-export/
```

- Send the Excel file(s) to the translation.

#### 3. When Receiving Translated Excel Files (Import Back)

- Place the returned Excel file(s) into:

```
translations-import/
```

- Import the translations with:

```bash
npm run translations:import
```

- The script updates all `translations.json` files based on the Excel content.

- It then removes only the imported translation keys from `draft.translations.json`, leaving other draft entries intact.
  This prevents the loss of new or modified texts that were added while the Excel file was being processed by the translation service.

---

### Summary

| Step           | Action                                                   | Command                       | Result                                                                                |
| -------------- | -------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| 1. Development | Add and translate new texts in `draft.translations.json` | –                             | Drafts updated                                                                        |
| 2. Export      | Generate Excel for translation                           | `npm run translations:export` | Excel in `translation-export/`                                                        |
| 3. Import      | Import completed translations                            | `npm run translations:import` | Updates translations.json and removes only imported keys from draft.translations.json |
