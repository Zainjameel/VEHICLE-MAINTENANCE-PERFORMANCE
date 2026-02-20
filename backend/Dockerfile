FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -DskipTests clean package

FROM eclipse-temurin:21-jre
WORKDIR /app
# Copy ONLY the real boot jar, not the .original
COPY --from=build /app/target/*.jar /app/
RUN ls -la /app && \
    rm -f /app/*.original || true
# Pick the jar that is NOT .original
ENTRYPOINT ["sh","-c","java -jar $(ls /app/*.jar | grep -v original | head -n 1)"]