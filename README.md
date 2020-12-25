# DC Cleaner

light DC Cleaner using Node.js  
Node.js 기반 초경량 DC 클리너입니다.

# Requirement

[Node.js](https://nodejs.org/ko/download/)

운영체제 맞게 Node.js 및 npm을 설치합니다.

# Install

## Clone project  

프로젝트를 클론합니다.

```bash
$ git clone https://github.com/Einere/DC_Cleaner.git
```

## Install package

의존성 패키지를 설치합니다. 

```bash
$ npm install
```

## Make configuration

```javascript
// ./config.js
const config = {
  id: 'your_id',
  pw: 'your_password',
  interval: 500,
  category: 'posting',
};

module.exports = user;
```

| filed    	| value type 	| require 	| description            	|
|----------	|------------	|---------	|------------------------	|
| id       	| string     	| yes     	| your DC id             	|
| pw       	| string     	| yes     	| your DC password       	|
| interval 	| number     	| no      	| delete interval        	|
| category 	| string     	| no      	| "posting" or "comment" 	|



# Run

```bash
npm run start
```

# Error handling

## DC prevent deleting by capcha

만약 로봇이 아닌가요? 때문에 삭제가 안된다면, 크롬 창을 끄고 10분 정도 뒤에 다시 실행헤주세요.

## Chrome driver version error

`./package.json`

```json

{
  "dependencies": {
    "chromedriver": "^87.0.0",   
  }
}
```

update `chromedriver` version value that using chrome's version.  
현재 사용중인 크롬 버전과 동일하게 수정해주세요.
