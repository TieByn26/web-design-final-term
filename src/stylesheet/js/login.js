const validAccounts = {
  "admin": "admin123"
};

//ham dang nhap
function handleLogin() {
  const emailOrUsername = document.querySelector('#login-form input[type="text"]').value;
  const password = document.querySelector('#login-form input[type="password"]').value;

  if (validAccounts[emailOrUsername] && validAccounts[emailOrUsername] === password) {
    //neu true qua movie
    window.location.href = "page/movie.html";
  } else {
    alert("Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.");
  }
}

// them su kien cho nut login
document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.querySelector('#login-form .btn.login');
  loginButton.addEventListener('click', handleLogin);
});

function toggleSignup() {
  document.getElementById("login-toggle").style.backgroundColor = "#fff";
  document.getElementById("login-toggle").style.color = "#222";
  document.getElementById("signup-toggle").style.backgroundColor = "#E83131";
  document.getElementById("signup-toggle").style.color = "#fff";
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function toggleLogin() {
  document.getElementById("login-toggle").style.backgroundColor = "#E83131";
  document.getElementById("login-toggle").style.color = "#fff";
  document.getElementById("signup-toggle").style.backgroundColor = "#fff";
  document.getElementById("signup-toggle").style.color = "#222";
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}
