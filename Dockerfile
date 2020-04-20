FROM openjdk:8-jre-slim
WORKDIR /home/apps/
COPY ./*.jar app.jar
RUN sh -c 'touch app.jar'
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
ENTRYPOINT [ "sh", "-c", "java -Duser.timezone=GMT+08 -Djava.security.egd=file:/dev/./urandom -jar -Xms128m -Xmx128m app.jar" ]