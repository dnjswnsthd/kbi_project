FROM adoptopenjdk/openjdk11:latest as builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew clean build

FROM adoptopenjdk/openjdk11:latest
VOLUME /tmp
COPY --from=builder build/libs/project_backend-0.0.1-SNAPSHOT.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["java", "-jar", "/app.jar"]