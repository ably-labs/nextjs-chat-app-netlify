# Building a Realtime Chat App with Next.js, Ably, and Netlify

Step by step guide at: <https://ably.com/blog/realtime-chat-app-nextjs-vercel>

Live demo here: 

This is a demo chat application with [Next.js](https://nextjs.org/) using [Ably](https://ably.com) as the messaging platform.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ably-labs/nextjs-chat-app-netlify)


## Description

It demonstrates the use of:

- Pub/sub messaging with Ably Chat
- Ably Chat's React Hooks
- Token authentication with Ably

## Tech stack

The project uses the following components:

- [Next.js](https://nextjs.org/) is a React framework used to build static web applications with server side rendering, serverless functions and seamless hosting. It's a framework that takes the React knowledge you already have, and puts some structure and conventions in place.

- [Ably](https://ably.com/) is realtime, pub/sub messaging platform with a suite of integrated services to deliver complete realtime functionality directly to end-users.

- [Netlify](https://netlify.com/) is a hosting platform that provides continuous deployment, serverless functions, and a global CDN for modern web projects.

- [React](https://reactjs.org/) is a JavaScript library for building user interfaces with encapsulated components that manage their own state.

- [TypeScript](https://www.typescriptlang.org/) is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## What are we going to build?

![The UI of the chat app we'll build. It is a window with speech bubbles for text.](https://cdn.glitch.com/0cb30add-c9ef-4c00-983c-e12deb0d4080%2Fchatapp.png?v=1612279601157)

*The UI of the app we'll build with this walkthrough*

We'll build a realtime chat app that runs in the browser. It will be built upon the Next.js [create-next-app](https://nextjs.org/docs/api-reference/create-next-app) template, it will contain a React component which will use Ably to send and receive messages. We'll also write a serverless function which will be used to authenticate the client with Ably.

## Building & running locally

### Prerequisites

In order to build and deploy this app, you will need:

- **An Ably account** for sending messages: [Create an account with Ably for free](https://ably.com/signup).
- **A Netlify Account** for hosting on production: [Create an account with Netlify for free](https://netlify.com/signup).
- **Node 20** or greater: [Install Node](https://nodejs.org/en/).

You'll also need an API key from Ably to authenticate with the Ably Service. To get an API key, once you have [created an Ably account](https://ably.com/signup):

1. Visit your [app dashboard](https://ably.com/accounts/any) and click on "Create new app".
2. Give the new app a name.
3. Copy the Private API key once the app has been created. Keep it safe, this is how you will authenticate with the Ably service.

### Building the project

1. To run this project locally, fork this repo and create a file called `.env` in the root of the project containing your Ably API key:

```sh
ABLY_API_KEY=your-ably-api-key:goes-here
```

2. Run `npm install`.
3. Run `npm run netlify:dev` to start the Netlify development server.

The Netlify development server will spin up and you'll see a demo chat application.

> Note: You can also use `npm run dev` to run just the Next.js development server without Netlify functions, but for the full experience with serverless functions, use `npm run netlify:dev`.

### TypeScript support

This project uses TypeScript for type safety. Here are some useful commands for TypeScript development:

- `npm run type-check`: Run TypeScript's type checker without emitting files
- `npm run dev`: The Next.js development server automatically type-checks your code as you develop

When creating new components or functions, use the `.tsx` extension for React components and `.ts` for plain TypeScript files. The project is configured with a `tsconfig.json` file that provides sensible defaults for Next.js TypeScript projects.

## Hosting on Netlify

We're using `Netlify` as our development server and build pipeline.

> Netlify is a powerful platform for building, deploying, and managing modern web projects. It provides continuous deployment, serverless functions, and a global CDN.
<cite>-- [The Netlify documentation](https://docs.netlify.com/)</cite>

In order to deploy your new chat app to Netlify you'll need to:

1. Create a [GitHub account](https://github.com/) (if you don't already have one)
2. [Push your app to a GitHub repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
3. [Create a Netlify account](https://netlify.com/signup)
4. Create a new Netlify site and import your app from your GitHub repository. (This will require you to authorize Netlify to use your GitHub account)
5. Add your `ABLY_API_KEY` as an environment variable in the Netlify site settings
6. Watch your app deploy
7. Visit the newly created URL in your browser!

## More info

- [Join our Discord server](https://discord.gg/q89gDHZcBK)
- [Follow us on Twitter](https://twitter.com/ablyrealtime)
- [Use our SDKs](https://github.com/ably/)
- [Visit our website](https://ably.com)

---
[![Ably logo](https://static.ably.dev/badge-black.svg?ably-next-vercel-news)](https://ably.com)
