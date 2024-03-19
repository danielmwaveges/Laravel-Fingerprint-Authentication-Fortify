
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSS only -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" >
    
<title>Sign in with Biometric</title>

<script src="https://cdn.jsdelivr.net/npm/@laragear/webpass@2/dist/webpass.js" defer></script>


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
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6">
            @csrf
            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div>
                    <input type="email" id="email" name="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-carmen-pink sm:text-sm sm:leading-6 @error('email') invalid: border-light-carmen-pink @enderror">
                </div>
            </div>

            <div>
                <button type="button" class="flex w-full justify-center rounded-md bg-carmen-pink px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-carmen-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmen-pink" onclick="assert()">
                    Sign in with Biometric Credential
                </button>
            </div>
        </form>

        <p class="mt-5 text-center text-sm text-gray-500">
            Or <a href="{{ route('login') }}" class="font-semibold leading-6 text-carmen-pink hover:text-light-carmen-pink">Sign in with email and password</a>
        </p>
        <p class="mt-5 text-center text-sm text-gray-500">
            Don't have an account? <a href="{{ url('/register') }}" class="font-semibold leading-6 text-carmen-pink hover:text-light-carmen-pink">Register here</a>
        </p>
     
    </div>

</div>

<script>
    const assert = async () => {
        if (Webpass.isUnsupported()) {
            alert("Your browser doesn't support WebAuthn.")
        }

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

        if (success) {
            window.location.replace("/")
        }
    }

</script>
</body>
</html>