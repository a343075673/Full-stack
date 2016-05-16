(function() {

    //VIEW
    var UIService = (function() {

        var applyTemplate = function(template, data) {
            return template
                .replace(/\${Username}/g, data.username)
                .replace(/\${Score}/g, data.grade)
                .replace(/\${Comment}/g, data.comment);
        };
        var renderTopTenResult = function(results) {
            return results.map(function(data) {
                return applyTemplate(resultTemplate, data);
            }).join("");
        };

        var resultTemplate = $("#list-template").html();

        return {
            displayTopTenProfiles: function(results) {
                var rendering = renderTopTenResult(results.arrayName);
                $("#comment-list").html(rendering);
            },
            displayInfo: function(results) {
                $("#ID").html(results.CourseId);
                $("#Name").html(results.CourseName);
                $("#Instructor").html(results.Professor);
                $("#Description").html(results.Description);
            }
        }
    } ());

    //MODEL
    var DataService = (function() {

        return {
            getRanklistsData: function(currentUser) {
                return $.ajax({
                    type: "GET",
                    url: BASE_API_URL + "course/" + CourseID.getCourseIDFromFileName() + "/gradecomment",
                    dataType: "json",
                    contentType: "application/json"
                });
            },
            getInfoData: function(currentUser) {
                return $.ajax({
                    type: "GET",
                    url: BASE_API_URL + "course/" + CourseID.getCourseIDFromFileName() + "/info",
                    dataType: "json",
                    contentType: "application/json"
                });
            }
        };
    } ());

    //CONTROLLER
    var App = (function() {
        return {
            loadAndDisplayRanklists: function() {
                var promise1 = DataService.getInfoData();
                promise1.done(function(results) {
                    UIService.displayInfo(results);
                });
                var promise2 = DataService.getRanklistsData();
                promise2.done(function(results) {
                    UIService.displayTopTenProfiles(results);
                });

            }
        };
    } ());

    var CourseID = (function() {
        return {
            setCourseIDInHtml: function() {
                var courseIDFromUrl = CourseID.getCourseIDFromFileName();
                $("#page-title").html(courseIDFromUrl + " - Rate My Courses - Review Courses, Courses Ranklists");
                $("#page-h1-title").html(courseIDFromUrl);
            },
            getCourseIDFromFileName: function() {
                var urlSlashSplit = window.location.pathname.split("/");
                var urlSlashCount = urlSlashSplit.length;
                return urlSlashSplit[urlSlashCount - 1].split(".")[0].toUpperCase();
            }
        };
    } ());

    $(document).ready(function() {
        CourseID.setCourseIDInHtml();
        App.loadAndDisplayRanklists();

        $("#submit-button").click(function() {

            //setCookie("username", "hiro333");
            if (!checkCookie()) return;
            //alert("after");
            if (getComment() == "" || getComment() == null) {
                alert("Please input comment.");
                return;
            }
            var data = {};
            data["Username"] = getCookie("username");
            data["Courseid"] = CourseID.getCourseIDFromFileName();
            data["Grade"] = getRate();
            data["Comment"] = getComment();
            var jsonString = JSON.stringify(data);
            var promise3 = postJSON(jsonString);
            promise3.done(function(results) {
                if (results.result == "SUCCESS!") {
                    alert("Success!");
                    location.reload();
                } else {
                    alert(results.result);
                }
            });
        });

        function postJSON(jsonString) {
            return $.ajax({
                type: "POST",
                url: BASE_API_URL + "rateandcomment",
                crossDomain: true,
                data: jsonString,
                dataType: "json",
                contentType: "application/json"
            });
        }

        function getRate() {
            return $("#rate-select").get(0).selectedIndex;
        }

        function getComment() {
            return $("#comment-textarea").val();
        }

        function getCookie(c_name) {
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

        function setCookie(c_name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "": ";expires=" + exdate.toGMTString()) + ";path=/";
        }

        function checkCookie() {
            var username = getCookie("username");
            if (username != null && username != "") {
                return true;
            } else {
                alert("Please sign in first.");
            }
        }
    });

} ());