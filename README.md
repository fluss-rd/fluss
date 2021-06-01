# Fluss

A web platform to download data, see interactive reports, and more about the tracked data of the rivers and other watersheds of the Dominican Republic (aka República Dominicana).

## Folder structure

The `packages` directory contains the related web projects of the fluss sytem. The projects inside are:

- `users/`: It's the web app for the final users.
- `admin/`: Web app for administrators of Fluss platform.
- `shared/`: Contains the shared components and code between the two apps.

## Prerequisites

You need to have installed these programs on your computer:

- [NodeJS (v14.16.0)](https://nodejs.org/en/download/).
- [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

## Installation

Run the following command inthe root directory of the repository:

```
yarn install
```

## Execute the installed projects

To run the user project run:

```
yarn dev:user
```

To run the admin project run:

```
yarn dev:admin
```

Open [http://localhost:3001](http://localhost:3001) or [http://localhost:3002](http://localhost:3002) with your browser to see the result.

## Usage

For more information about the projects, see the specific README files for each one.

## Commands

The complete list of custom yarn commands in the package are:

|Command|Description|
|-|-|
|`yarn install`|Install the dependencies of all the projects|
|`yarn dev:admin`|Run the admin project in dev mode|
|`yarn dev:user`|Run the user project in dev mode|
|`yarn tsm:admin`|Generate .d.ts files for SASS modules in the admin project|
|`yarn tsm:user`|Generate .d.ts files for SASS modules in the user project|
|`yarn tsm:shared`|Generate .d.ts files for SASS modules in the shared project|
|`yarn tcm:admin`|Generate .d.ts files for CSS modules in the admin project|
|`yarn tcm:user`|Generate .d.ts files for CSS modules in the user project|
|`yarn tcm:shared`|Generate .d.ts files for CSS modules in the shared project|
|`yarn lint:admin`|Shows lintin rules warnings and errors in the admin project|
|`tsm-watch:admin`|Generate .d.ts files for SASS modules in the admin project and keep watch for new changes|
|`tsm-watch:user`|Generate .d.ts files for SASS modules in the user project and keep watch for new changes|
|`tsm-watch:shared`|Generate .d.ts files for SASS modules in the shared project and keep watch for new changes|
|`tcm-watch:admin`|Generate .d.ts files for CSS modules in the admin project and keep watch for new changes|
|`tcm-watch:user`|Generate .d.ts files for CSS modules in the user project and keep watch for new changes|
|`tcm-watch:shared`|Generate .d.ts files for CSS modules in the shared project and keep watch for new changes|
|`yarn lint:user`|Shows lintin rules warnings and errors in the user project|
|`yarn lint:shared`|Shows lintin rules warnings and errors in shared project|
|`yarn lint:all`|Shows lintin rules warnings and errors in all the projects|
|`yarn lint-fix:admin`|Fix linting warning and erorrs in the admin project|
|`yarn lint-fix:user`|Fix linting warning and erorrs in the user project|
|`yarn lint-fix:shared`|Fix linting warning and erorrs in the shared project|
|`yarn lint-fix:all`|Fix linting warning and erorrs in all the projects|