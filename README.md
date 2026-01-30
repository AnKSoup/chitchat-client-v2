# chitchat-client

This project is the client for the chitchat-backend.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Setting up the project :

```sh
npm install
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Setting up docker :
Make your .env file following the .env-example template

Building the image :
```sh
  docker build -t chitchat-frontend .
```

Running the container : 
```sh
  docker run --name chitchat-frontend --env-file .env -p "(your APP_PORT)":"(your APP_PORT)" chitchat-frontend
```

# ARCHITECTURE :

- **assets**: Contains various assets.
  - **fonts**: Contains the fonts.
  - **images**: Contains images (icons and background)
  - **objects**: Serves as a base to generate objects (only icons so far, => todo : put ctors there too)
  - **styles**: SCSS files.

- **components**: Contains the components of the project.

- **router**: Contains the router scripts.

- **routes**: Contains the main routes for the router.

- **scripts**: Contains the scripts.
  - api-calls.ts : handles calling the api and retrieving the response as JSON.
  - blog.ts : Script for getting/sending/formatting blogs.
  - comment.ts : Script for getting/sending/formatting comments.
  - conversation.ts : Script for getting/sending/formatting conversations.
  - encryption.ts : Handles the encryption/decryption of keys and messages.
  - gradients.ts : Generates and holds default gradients.
  - local-storage.ts : Handles local-storage operations.
  - messages.ts : Script for getting/sending/formatting messages.
  - text-operation.ts : Formatting of texts.
  - user.ts : Handles all user operations.

# TESTING :

```sh
npx cypress open
```

For now only a basic e2e interaction between two users is simulated. (Testing conversations, and blogs)

# TODO :

What is left to refactor, implement and change:

- Features to add :
  - 1.  USERS :
    - Deletable accounts.
    - Editable profile pictures
    - Editable user gradients

  - 2.  CONVERSATIONS :
    - Removable members by the owner
    - Editable gradients
    - Editable background

  - 3.  MESSAGES :
    - Editable messages
    - Removable messages
    - replying to messages

  - 4.  BLOGS :

  - 5.  COMMENTS :
    - Editable comments
    - Removable comments

  - 6.  UI :
    - Editable background

- Changes to implement :
  - Socket.IO for notifications and appending new messages.
  - Appending messages to conversation instead of reloading messages.
  - Pinia to store messages and conversations for the session.

  - Refactor architecture as follow :

```
- app : for main.ts, App.vue
  - router : for the router
  - routes : main routes

- assets : static assets
  - font
  - images
  - styles

- shared :
  - components : reusable components
  - utils : move text-operation/gradients/encryption/local-storage/api-call/json-utils there
  - models : for ctors and types

- services : one for each endpoints => stores the logic
  - users-service
  - conversations-service
  - group-member-service
  - messages-service
  - blogs-service
  - comments-service
```

- Adding additional testing

- Refactor scss files => too much duplicates :(
