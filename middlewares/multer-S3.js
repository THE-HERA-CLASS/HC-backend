const aws = require('aws-sdk');
const { request } = require('http');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const path = require('path');
require('dotenv').config(); // 환경변수 사용

// S3클래스를 이용해서 S3 서비스에 대한 새로운 인스턴스 생성
const s3 = new aws.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// 허용할 파일 확장자
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

const upload_image = multer({
  storage: multerS3({
    s3: s3, // s3객체 S3와 상호작용한다
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE, // 업로드되는 파일의 MIME type을 자동으로 설정
    // MIME type은 파일 확장자(.html, .jpge)와 비슷한 역할을 한다 운영체제에게 파일의 유형을 알려주는 역할
    // 서버가 브라우저에게 html파일을 보낸다 하면 그 파일은 MIME type은 "text/html"을 응답 헤더에 포함되어 전송된다/
    // 브라우저는 이 MIME type을 보고 파일을 어떻게 처리할지 결정한다.
    // 웹 전송에서 MIME type이 중요한 역할이고, 이를 통해 브라우저는 콘텐츠를 올바르게 해석하고 표시할 수 있다.

    // S3에 저장될 때 사용할 파일명을 설정
    key: (req, file, callback) => {
      const today = new Date(); // 현재시간 정보를 파일명에 포함
      const currentYear = today.getFullYear(); // 연도
      const currentMonth = today.getMonth() + 1; // 월 추가 (월을 0~11의 값을 가진다 따라서 +1를 해야지 우리가 아는 월수로 나온다)
      const currentDate = today.getDate(); // 일자
      const currentHour = today.getHours(); // 시
      const currentMinute = today.getMinutes(); // 분
      const currentSecond = today.getSeconds(); // 초
      // 앞에서 추출한 연도, 월, 일, 시, 분, 초를 문자열 형식으로 합친다 -> 파일명에 날짜와 시간 정보를 추가하는데 사용
      const date = `${currentYear}-${currentMonth}-${currentDate}-${currentHour}-${currentMinute}-${currentSecond}`;

      // 램던 숫자를 저장한다 -> 각파일이 고유한 파일명을 가질수 있게
      let randomNumber = ''; // 빈배열로 초기화
      // for문으로 0~9까지 랜덤 숫자를 생성하고 그걸로 문자열로 반환하여 randomNumber변수에 추가한다
      for (let i = 0; i < 4; i++) {
        randomNumber += String(Math.floor(Math.random() * 10));
      }
      // from 데이터로 받은파일의 확장자를 추출한다
      // Node.js의 내장 모듈인 path의 extname 메서드를 사용하여 업로드된 파일(file)의 원래 이름에서 확장자를 추출. 그리고 toLowerCase 메서드를 사용하여 모든 대문자를 소문자로 변환시킨다
      const extension = path.extname(file.originalname).toLowerCase();

      // 허용한 확장자인지 검증
      // 추출한 확장자가 미리 정해둔 확장자[".png", ".jpg", ".jpeg", ".bmp", ".gif"]에 없으면 error 반환
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error('확장자 에러')); //412
      }
      // 파일이 업로드된 시간(date), 랜덤한 네 자리 숫자(randomNumber)를 결함하려 고유한이름을 가진 파일의 url를 생성
      // 이 URL은 Amazon CloudFront 서비스의 URL 형식에 기반한다,
      // 이 서비스는 사용자가 AWS 리소스(예: S3 버킷에 저장된 이미지)에 빠르게 액세스할 수 있도록 돕는다.
      const img_url = `https://theheraclass.s3.ap-northeast-2.amazonaws.com/img/${date}_${randomNumber}${extension}`;

      // 생성된 img_url을 req.img_url에 배열 형태로 담음
      // req에 img_url 프로퍼티가 없으면 img_url을 빈배열로 설정
      if (!req.img_url) {
        req.img_url = [];
      }
      // img_url 값을 req.img_url 배열에 추가(push)
      req.img_url.push(img_url);
      // 파일 업로드가 성공적으로 완료되었음을 나타내는 콜백 함수를 호출한다. 첫 번째 인수는 오류 객체이다. 여기서는 오류가 없으므로 null을 전달한다. 두 번째 인수는 업로드된 파일의 경로이다
      // `img/${date}_${randomNumber}` :  업로드된 파일의 S3 내 경로를 나타낸다
      callback(null, `img/${date}_${randomNumber}${extension}`);
    },
    // AWS S3에서 액세스 제어 목록 (ACL)을 설정 이 경우 "public-read"는 파일이 공개적으로 읽을 수 있음을 의미 즉, 인터넷 상의 모든 사람이 해당 파일을 읽을 수 있다.
    acl: 'public-read',
  }),
  // 업로드 가능한 파일의 최대 크기를 제한한다 여기서 25MB로 설정, 이 한도를 초과하면 업로드를 거부
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});
module.exports = upload_image;
