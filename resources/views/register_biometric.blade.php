
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSS only -->
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" >
    <title>Register Biometric</title>

    <script src="{{ asset('js/webpass.js') }}" defer></script>

<script>
    const attest = async () => {
        const { success, data, error } = await Webpass.attest("webauthn/register/options", "webauthn/register/")
        
        if (error) {
            alert(error.message)
        }
    }
    const assert = async () => await Webpass.assert("webauthn/login/options", "webauthn/login/")
</script>
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
    <h1>Register</h1>
    <div class="mb-3">
        <label for="email" class="form-label">Welcome {{ Auth::user()->name }}! Complete your registration by adding a biometric credential.</label>
    </div>

    <div class="mb-3 d-grid">
        <button type="button" class="btn btn-primary" onclick="attest()">
            Register Biometric Credential
        </button>
    </div>
</div>
</body>
</html>