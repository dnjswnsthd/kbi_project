# FROM
# base image 지정
# VOLUME
# 호스트의 directory를 docker 컨테니너에 연결
# 데이터, 소스코드, 외부 설정 파일 등을 docker image에 commit 하지 않고
# docker container에서 사용 가능 하도록 한다
# 주로 log 수집이나 data 저장에 쓰인다
# ADD
# 파일과 디렉토리를 호스트에서 docker image로 copy
# 만일 ADD 할려고 하는 디렉토리가 image에 존재하지 않으면 docker가 자동 생성
# 빌드 directory 외부의 파일은 ADD 불가
# ADD 할려고 하는 파일이나 디렉토리와 같은 이름의 파일이나 디렉토리가
# 벌써 image 상에 존재 한다면 덮어 씌우지 않는다
# ENV
# Environment variable을 지정할 때 사용
# intruction로 지정한 환경변수는 $variable_name이나 ${variable_name}으로 사용가능
# docker image를 실행 시킬 때 -e 옵션을 사용해서 ovverride 가능
# ENTRYPOINT
# Docker image가 실행될 때 실행되어야할 기본 command를 지정
# overrride 불가
FROM openjdk:11 as build
VOLUME /tmp
ADD ./build/libs/project_backend-0.0.1-SNAPSHOP.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["java", "-jar", "/app.ja"]