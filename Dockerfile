# 가져올 베이스 이미지를 선택
# node:[16.17.0,16-alpine] 등으로 원하는 이미지를 선택할 수 있다.
FROM node:16.17.0

#root 작업 디렉토리 설정 이후 ./에 대한 위치가 된다.
WORKDIR /app

#Dockerfile 이 존재 하는 디렉토리 -> Docker workdir 디렉토리에 복사한다.
COPY package*.json ./

# 기존 node_modules를 삭제하고 깨끗한 상태에서 의존성을 설치합니다.
RUN rm -rf node_modules && npm install

# 소스 코드를 컨테이너로 복사합니다.
COPY . .

# 포트를 맵핑한다.
EXPOSE 3005

# pm2를 사용하여 server.js를 실행한다.
CMD ["node", "server.js"]