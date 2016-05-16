<?php
 
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'A1s2d3f4!');
define('DB_DATABASE', 'users');
$con = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);


if(isset($_POST['login']))
{
  $user = mysqli_real_escape_string($con,$_POST['username']);
  $pass = mysqli_real_escape_string($con,$_POST['password']);
 
  $sel_user = "SELECT * FROM user WHERE username='$user' AND password='$pass'";
  $run_user = mysqli_query($con, $sel_user);

  $check_user = mysqli_num_rows($run_user);

  if($check_user > 0)
  {
    $cookie_name = 'username';
    $cookie_value = $_POST['username'];
    setcookie($cookie_name, $cookie_value);
    echo "<script>window.open('index.html','_self')</script>";
  }
  else 
  {
    echo "<script>alert('Username or password is not correct, please try again!')</script>";
  }
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Rate My Courses is the best college courses reviews and ratings source based on student feedback. Over 1.4 million courses &amp; 15 million reviews.">
        <title>Sign in - Rate My Courses - Review Courses, Courses Ranklists</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        <link href="/navbar-fixed-top.css" rel="stylesheet">
    </head>
    <body>
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/">Rate My Courses</a>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/courses.html">Courses</a></li>
                        <!--<li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Ranklists<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="/ranklists/high.html">Highest Rate</a></li>
                                <li><a href="/ranklists/low.html">Lowest Rate</a></li>
                                <li><a href="/ranklists/popular.html">Most Popular</a></li>
                            </ul>
                        </li>-->
                        <li><a href="/about.html">About</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right" id="sign-stuff"></ul>
                </div>
            </div>
        </nav>
        
        
    <div class="container">    
<h1>Sign in</h1>
    <hr>
<form role="form" name="registration" method="post" action="signin.php">
<div class="form-horizontal" role="form">
<div class="form-group">
        <label class="col-sm-2 control-label" for="UserName">Username</label>
        <div class="col-sm-10">
            <table><tr width="200"><th>
                <input class="form-control" type="text" name="username" required="required" placeholder="Username">
            </th></tr></table>
        </div>
    </div>
    <div class="form-group">
        <label class="col-md-2 control-label" for="Password">Password</label>
        <div class="col-md-10">
            <table><tr width="200"><th>
                <input class="form-control" type="password" name = "password" required="required" placeholder="Password">
            </th></tr></table>
        </div>
    </div>
    <div class="form-group">
        <div class="col-md-offset-2 col-md-10">
            <input type="submit" class="btn btn-default" value="Sign in" name="login">
        </div>
    </div>
    </div> 
</form>
       
       
</div> 

    
        <div class="container">

<hr>
        <footer>
            <p>&copy; 2016 - Rate My Courses</p>
        </footer>
        </div>
        

    </body>

    <script src="http://code.jquery.com/jquery-2.2.2.min.js" integrity="sha256-36cp2Co+/62rEAAYHLmRCPIych47CvdM+uTBJwSzWjI=" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    
    <script src="/user-cookie.js"></script>

</html>










