
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSS only -->
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" >
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

<title>Login with Biometric</title>

<script src="{{ asset('js/webpass.js') }}" defer></script>


</head>

<body>
@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<div class="container py-5">
    <div class="w-50 center border rounded px-3 py-3 mx-auto">
    <h1>Login</h1>
    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" name="email" class="form-control">
    </div>

    <div class="mb-3 d-grid">
        <button type="button" class="btn btn-primary" onclick="assert()">
            Login with Biometric
        </button>
    </div>
    
    <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Or <a href="{{ route('login_biometric') }}">Log in with email and password</a>
    </p>
    <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
        Don't have an account? <a href="{{ url('/register') }}">Register here</a>
    </p>

</div>

<script>
    const assert = async () => {
        const { success, data, error } = await Webpass.assert({
            path: "webauthn/login/options",
            body: {
                //The email allows the server to show the registered key the
                //authenticator should use to complete the ceremony
                email: document.getElementById('email').value,
            }
        }, "webauthn/login/")

        if (error) {
            alert("An error has occured while processing your log in request. Please ensure the email address you have entered is valid and was previously registered with a biometric credential.")
        }
    }

</script>
</body>
</html>