# Dockerfile for Java Bank Application
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy source code
COPY Accounts/Accounts/src ./src

# Compile Java sources
RUN mkdir -p bin \
    && javac -d bin src/*.java

# Set the main class
ENV MAIN_CLASS=Main

# Run the application
CMD ["sh", "-c", "java -cp bin $MAIN_CLASS"]
