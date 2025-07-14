# base image
#FROM adoptopenjdk:17-alpine
FROM openjdk:17-alpine

# Author
MAINTAINER "Clayton.Wang lovejunlic@gmail.com"

# add a volume
VOLUME /tmp

# eport 8080
EXPOSE 8080

# if use 'dockerfile-maven-plugin', it will auto replace the value
ARG JAR_FILE=target/clayton-spring-demo.jar

# add .jar package to container
ADD ${JAR_FILE} app.jar

# auto start
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/urandom","-jar","/app.jar"]