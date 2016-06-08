FROM semtech/mu-javascript-template:0.1.0

ONBUILD ADD package.json .babelrc /app/
ONBUILD RUN npm install
ONBUILD ADD src /app/src
