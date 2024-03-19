
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSS only -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" >
    <title>Register Biometric</title>

    <script src="https://cdn.jsdelivr.net/npm/@laragear/webpass@2/dist/webpass.js" defer></script>

<script>
    const attest = async () => {
        if (Webpass.isUnsupported()) {
            alert("Your browser doesn't support WebAuthn.")
        }

        const { success, data, error } = await Webpass.attest("webauthn/register/options", "webauthn/register/")
        
        if (error) {
            alert(error.message)
        }
        
        if (success) {
            alert("Biometric registration successful")
            window.location.replace("/")
        }
    }
</script>
</head>

<body class="h-full">
@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Biometric Registration</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p class="mt-5 text-center text-xl text-gray-600">
            Welcome {{ Auth::user()->name }}! Complete your registration by adding a biometric credential.
        </p>

        <div>
            <button type="button" class="flex w-full justify-center rounded-md bg-carmen-pink px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-carmen-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmen-pink" onclick="attest()">
                Register Biometric Credential
            </button>
        </div>
    </div>
</div>


</body>
</html>