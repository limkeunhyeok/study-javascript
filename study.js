var LoginController = {
    errors = [],
    getUser: function() {
        return document.getElementById("login_username").value;
    },
    getPassword: function() {
        return document.getElementById("login_password").value;
    },
    validateEntry: function(user, pw) {
        user = user || this.getUser();
        pw = pw || this.getPassword();
    
        if (!(user && pw)) {
            return this.failure("ID와 비밀번호를 입력하여 주십시오!");
        } else if (user.length < 5) {
            return this.failure("비밀번호는 5자 이상이어야 합니다.!");
        }
    
        return true;
    },
    showDialog: function(title, msg) {
        // 사용자에게 다이얼로그 창으로 타이틀과 메시지를 표시한다
    },
    failure: function(err) {
        this.errors.push(err);
        this.showDialog("에러", "로그인 실패: " + err);
    }
};

// AuthController가 LoginController에 위임하도록 연결한다
var AuthController = Object.create(LoginController);
    
AuthController.errors = [];
AuthController.checkAuth = function() {
    var user = this.login.getUser();
    var pw = this.login.getPassword();

    if (this.login.validateEntry(user, pw)) {
        this.server("/check-auth", {
            user: user,
            pw:pw
        })
        .then(this.success.bind(this))
        .fail(this.failure.bind(this));
    }
};
AuthController.server = function(url, data) {
    return $.ajax({
        url: url,
        data: data
    });
};
AuthController.accepted = function() {
    this.showDialog("성공", "인증 성공!");
};
AuthController.rejected = function(err) {
    this.failure("인증 실패: " + err);
};