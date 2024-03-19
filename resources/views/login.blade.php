<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSS only -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" >
    
    
    <title>Login</title>
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
            <form class="space-y-6" action="" method="POST">
                @csrf
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div>
                        <input type="email" value="{{old('name')}}" name="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-carmen-pink sm:text-sm sm:leading-6 @error('email') invalid: border-light-carmen-pink @enderror">
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-carmen-pink hover:text-light-carmen-pink">Forgot password?</a>
                        </div>
                    </div>

                    <div class="mt-2">
                        <input type="password" name="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-carmen-pink sm:text-sm sm:leading-6 @error('password') invalid:border-light-carmen-pink @enderror">
                    </div>
                </div>
                
                <div>
                    <button name="submit" type="submit" class="flex w-full justify-center rounded-md bg-carmen-pink px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-carmen-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmen-pink">Sign in</button>
                </div>
            </form>

            <p class="mt-5 text-center text-sm text-gray-500">
                Or <a href="{{ route('login_biometric') }}" class="font-semibold leading-6 text-carmen-pink hover:text-light-carmen-pink">Sign in with biometrics</a>
            </p>
            <p class="mt-5 text-center text-sm text-gray-500">
                Don't have an account? <a href="{{ url('/register') }}" class="font-semibold leading-6 text-carmen-pink hover:text-light-carmen-pink">Register here</a>
            </p>
            
        </div>
    </div> 
</body>
</html>