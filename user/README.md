# Fluss user

It's the web app for the final users of Fluss platform.

## Gettings Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

To install the dependencies for the project, run the following command:

```
npm install
```

### Execute the project

To execute the project, execute the following command:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

To add a new page in the project create a new component inside `src/pages/`. For example:

`src/pages/new-page.tsx`:
```tsx
export default function NewPage() {
  return <h1>This is my new page</h1>
}
```

Then, run the project and go to [http://localhost:3000/new-page](http://localhost:3000/new-page) to see the results.


## Running tests

To run the project tests, execute the following command:

```
npm run test
```

## Code linting

The project has linting rules for writing code. To verify you have no broken any rule execute this command:

```
npm run lint
```

The command will show you the broken rules in the case of a file with bad code.

To fix the rules problems you can do it manually or by executing this command:

```
npm run lint:fix
```

## Use SASS modules for styling

The project has installed SASS and you can use it to style your componentes. Now, if you want to use SASS modules you need to provide types definitions for each one of them. Follow this tutorial to know how to add them automatically:

1. Create a SASS module inside `src/pages/component/`. Example:

    `src/pages/my-page/my-page.module.scss`
    ```scss
    text {
      color: red;
    }
    ```

1. Generate the types definition for the file:

    ```
    npm run sass-types
    ```

    This will generate a file called `my-page.module.scss.d.ts` which holds the types definition for each selector in your SASS code.

    Optionally you can run the following command to generate subsecuent types definitions for SASS modules automatically:

    ```
    npm run sass-types:watch
    ```

    This one watch for files that get added or are changed and generate the corresponding type definitions.

1. Import the styles in your component like any TS file. Example:

    `src/pages/my-page/index.tsx`
    ```tsx
    import styles from "./my-page.module.scss";

    export default function MyPage() {
      return <span style={styles.text}>Page</span>
    }
    ```

