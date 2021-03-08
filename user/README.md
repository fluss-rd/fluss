# Fluss user

It's the web app for the final users of Fluss platform.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

To install the dependencies for the project, run the following command:

```bash
npm install
```

### Execute the project

To execute the project, execute the following command:

```bash
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

## Use CSS and SASS in the project

In the project, you can add styles via CSS or SASS modules. CSS/SASS modules are the way to create styles (id or classes) that only exists on the component you use and don't take effect in sub-components.

Follow this tutorial of how to create a SASS module and use it in a component (replace `.css` by `.scss` if what you want is to create a CSS module):

1. Create a SASS/ module inside `src/styles/pages/my-page/`. Example:

    `src/styles/pages/my-page/my.scss`
    ```scss
    text {
      color: red;
    }
    ```

2. Import the styles into your component just like any TS file. Example:

    `src/pages/my-page.tsx`
    ```tsx
    import styles from "./my-page.module.scss";

    export default function MyPage() {
      return <span style={styles.text}>Page</span>
    }
    ```

3. Now, add type definitions to enable TS auto-completion features to your SASS/CSS modules. You can do it manually or using one of the following commands:

    - For SASS modules

        ```bash
        npm run sass-types
        ```

        or

        ```bash
        npm run sass-types:watch
        ```


    - For CSS modules

        ```bash
        npm run css-types
        ```

        or

        ```bash
        npm run css-types:watch
        ```