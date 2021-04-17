# Fluss

A web platform to download data, see interactive reports, and more about the tracked data of the rivers and other watersheds of the Dominican Republic (aka República Dominicana).

## Folder structure

- `users/`: It's the web app for the final users.
- `admin/`: Web app for administrators of Fluss platform.
- `shared/`: Contains the shared components and code between the two apps.

## Prerequisites

You need to install these programs on your computer:

- [NodeJS (v14.16.0)](https://nodejs.org/en/download/).
- npm 7.x (7.10.0 — recommended).

    > To have the recommended version of npm, run:
    > ```bash
    > npm install -g npm@7.10.0
    > ```

## Installation

Choose a project (admin or user) and install it. Example:

```bash
npm run install:user
```

## Execute the installed project

```bash
npm run dev:user
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

## Usage

For more information about the projects, see the specific README files for each one.

## Commands

The complete list of npm commands in the package:

|Command|Description|
|-|-|
|`npm run install:user`|Install the dependencies for the `user` project|
|`npm run install:admin`|Install the dependencies for the `admin` project|
|`npm run dev:user`|Runs `user` project|
|`npm run dev:admin`|Runs `admin` project|
