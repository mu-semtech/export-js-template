FROM semtech/mu-javascript-template:1.0.0

MAINTAINER Erika Pauwels <erika.pauwels@gmail.com>

ONBUILD COPY export.js /config/export.js
