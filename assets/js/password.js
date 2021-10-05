function check(){
    var password1 = document.getElementById('#password').value;
    var password2 = document.getElementById('#password_confirm').value;
    try {
        if (password1 === password2) throw ("Matched");
        if (password2 !== password1) throw ("Doesn't match");
    }
    catch(err) {
        console.log("Error:" + error);
    }
}