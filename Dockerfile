#########################################
### Stage 1: Builds the app with node ###
#########################################

# Gets the base image :
FROM node:latest AS stage-1-build-app

# Goes to the root app folder
WORKDIR /app

# Copies everything
COPY . . 

# Installs dependencies
RUN npm install

# Builds the app with secret server adress
RUN --mount=type=secret,id=env \
    sh -c "export VITE_SERVER_ADDRESS=$(grep '^VITE_SERVER_ADDRESS=' /run/secrets/env | sed -E 's/^VITE_SERVER_ADDRESS=(.*)$/\1/') &&\
    npm run build"

###################################
### Stage 2: Runtime with nginx ###
#################################### 
FROM nginx:latest AS stage-2-runtime

# Goes to the root app folder
WORKDIR /app

# Copies the app build
COPY --from=stage-1-build-app /app/dist ./dist

# Copies the nginx conf template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Serves with nginx make sure to give --env-file
CMD ["nginx", "-g", "daemon off;"]