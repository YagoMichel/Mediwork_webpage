FROM amazoncorretto:17-alpine
ARG JAR_FILE=target/medikwork-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_mediwork.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app_mediwork.jar"]