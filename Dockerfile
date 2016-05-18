FROM semtech/mu-javascript-template:latest

ONBUILD ADD package.json .babelrc /app/
ONBUILD RUN npm install
ONBUILD ADD src /app/src
