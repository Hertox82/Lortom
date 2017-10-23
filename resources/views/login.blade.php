<html>
<head>
    <title>Backend-Login</title>
</head>
<body>
<style>
    .container {margin-left:auto; margin-right:auto; padding: 0px 15px; width:100%; max-width: 1140px;}
    .content-wrapper { width:100%; position: absolute; top:300px;}
    .row {display: flex; flex-wrap: wrap; margin-right: -15px; margin-left: -15px;}
    .col-12 { flex: 0 0 100%; max-width: 100%; position:relative; width: 100%; min-height: 1px; padding-right:15px; padding-left: 15px;}
    .form-title { padding: 20px;  color: orange;}
    .form-body {padding: 20px; min-height: 200px;}
    form { position: absolute; top:50%; left:24%; width:50%; border: 1px solid orange}
    form h1 {text-align: center;}
    input {  width:100%; height: 30px; margin-top: 15px; margin-bottom: 15px; height: 42px;}
    input::placeholder{ text-transform: uppercase;}
    button { position: absolute; bottom:23px; right: 42%; background-color: orange; text-transform: uppercase; color:white; border:1px transparent; padding: 10px 30px}
    .error {color:red; font-size:12px;}
</style>
<div class="login">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="content-wrapper">
                    <form action="{{route('loginPost')}}" method="POST">
                        <div class="form-title">
                            <h1>Login Form</h1>
                        </div>
                        <div class="form-body">
                            {{ csrf_field() }}
                            <input type= "text" name="username" placeholder="username" required>
                            <input type= "password" name="password" placeholder="password" required>
                            @if($errors->any())
                                <p class="error">{{$errors->first()}}</p>
                            @endif
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>