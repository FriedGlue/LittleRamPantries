
## Project Structure

- `src`: The source directory containing all the code for the project.

  - `App.css`: The main CSS file for the application.
  - `App.tsx`: The main TypeScript file that bootstraps the application.
  - `index.css`: Global CSS file.
  - `main.tsx`: The entry point for the application.
  - `vite-env.d.ts`: Type definitions for Vite.
  - `.env.local`: Local environment variables.
  - `.env.production`: Production environment variables.
  - `.eslintrc.cjs`: ESLint configuration.
  - `.gitignore`: Specifies intentionally untracked files to ignore.
  - `index.html`: The HTML file that hosts the React application.
  - `package-lock.json`: Automatically generated file for any operations where npm modifies either the node_modules tree or `package.json`.
  - `package.json`: Lists the packages that your project depends on and provides information about the project.
  - `README.md`: (This file) includes information about the project and how to set it up.

  - `hooks`: Custom React hooks.
    - `useFetchData.tsx`: A hook for fetching data.

  - `types`: Type definitions for TypeScript.
    - `PantryJson.tsx`: Type definitions related to the 'Pantry' feature.

  - `assets`: Contains static files like images.
    - `ram-pantry.png`: An image file used in the project.

  - `components`: React components used throughout the application.
    - `Dashboard`: A component for the dashboard.
      - `Dashboard.tsx`: The TypeScript file defining the Dashboard component.
      - `Dashboard.css`: The CSS file for styling the Dashboard component.

    - `DashboardItem`: A component for items within the Dashboard.
      - `DashboardItem.tsx`: TypeScript file for the DashboardItem component.
      - `DashboardItem.css`: CSS styles for the DashboardItem component.

    - `Footer`: The footer component of the application.
      - `Footer.tsx`: TypeScript file for the Footer component.
      - `Footer.css`: CSS file for the Footer component.

    - `Hero`: A hero banner component.
      - `Hero.tsx`: TypeScript file for the Hero component.
      - `Hero.css`: CSS file for the Hero component.

    - `Navbar`: Navigation bar component.
      - `Navbar.tsx`: TypeScript file for the Navbar component.
      - `Navbar.css`: CSS file for the Navbar component.
