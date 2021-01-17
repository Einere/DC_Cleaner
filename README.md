# DC Cleaner

light DC Cleaner using Node.js.  
Node.js 기반 초경량 DC 클리너입니다.  
최대한 비개발자도 따라할 수 있게 작성했습니다만, 실제로 그럴지는 잘 모르겠네요.    

# Requirement

[Node.js](https://nodejs.org/ko/download/)

install Node.js and npm appropriately with your OS.  
운영체제 맞게 Node.js 및 npm을 설치합니다.  

# Install

### Clone project  

clone the project.  
프로젝트를 클론합니다.  

```bash
$ git clone https://github.com/Einere/DC_Cleaner.git
```

그리고 해당 폴더로 이동합니다.
```bash
$ cd DC_cleaner
```

### Install package

install dependency pakages.  
의존성 패키지를 설치합니다.  

```bash
$ npm install
```

### Make configuration

make `config.js` like below in current directory.  
`config.js` 파일을 현재 폴더 내에 다음과 같이 생성합니다.

```javascript
const config = {
  id: 'your_id',
  pw: 'your_password',
  interval: 500,
  category: 'posting',
};

module.exports = user;
```
see `config` object specification.  
`config` 객체의 필드 및 값은 다음 표를 참고해주세요.

| filed    	| value type 	| require 	| description            	|
|----------	|------------	|---------	|------------------------	|
| id       	| string     	| yes     	| your DC id             	|
| pw       	| string     	| yes     	| your DC password       	|
| interval 	| number     	| no      	| delete interval        	|
| category 	| string     	| no      	| "posting" or "comment" 	|



# Run

```bash
$ npm run start
```


# Error handling

### DC prevent deleting by capcha

만약 로봇이 아닌가요? 때문에 삭제가 안된다면, 크롬 창을 끄고 10분 정도 뒤에 다시 실행헤주세요.

### Chrome driver version error

`./package.json`

```json

{
  "dependencies": {
    "chromedriver": "^87.0.0"
  }
}
```

update `chromedriver` version value that using chrome's version.  
현재 사용중인 크롬 버전과 동일하게 수정해주세요.
