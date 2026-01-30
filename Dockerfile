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

# Builds the app
RUN npm run build

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