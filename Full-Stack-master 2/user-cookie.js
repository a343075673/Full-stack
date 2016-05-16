(function() {

    $(document).ready(function() {
        updateSignStuff();
        
        $("#signout-button").click(function() {
            setUserCookieExpire("username", getUserCookie("username"));
            location.reload();
        });

        function getUserCookie(c_name) {
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    var c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) c_end = document.cookie.length;
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return "";
        }

        function setUserCookie(c_name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "": ";expires=" + exdate.toGMTString()) + ";path=/";
        }

        function setUserCookieExpire(c_name, value) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() - 365);
            document.cookie = c_name + "=" + escape(value) + ";expires=" + exdate.toGMTString() + ";path=/";
        }

        function checkUserCookie() {
            var username = getUserCookie("username");
            if (username != null && username != "") {
                return true;
            } else {
                return false;
            }
        }

        function updateSignStuff() {
            if (checkUserCookie()) {
                $("#sign-stuff").html("<li><a>Welcome, " + getUserCookie("username") + "!</a></li><li><a id='signout-button'>Sign out</a></li>");
            } else {
                if (window.location.pathname.indexOf("signup") != -1) {
                    $("#sign-stuff").html("<li class='active'><a href='/signup.php'>Sign up</a></li><li><a href='/signin.php'>Sign in</a></li>");
                } else if (window.location.pathname.indexOf("signin") != -1) {
                    $("#sign-stuff").html("<li><a href='/signup.php'>Sign up</a></li><li class='active'><a href='/signin.php'>Sign in</a></li>");
                } else {
                    $("#sign-stuff").html("<li><a href='/signup.php'>Sign up</a></li><li><a href='/signin.php'>Sign in</a></li>");
                }
            }
        }
    });
} ());