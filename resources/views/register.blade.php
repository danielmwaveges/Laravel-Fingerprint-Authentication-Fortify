<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSS only -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" >
    <title>Register</title>
</head>
<body class="h-full">
    
    @if ($errors->any())
        <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <ul class="mt-1.5 list-disc list-inside">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="/register" method="POST">
                @csrf
                <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div>
                        <input type="text" value="{{old('name')}}" name="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-carmen-pink sm:text-sm sm:leading-6 @error('email') invalid: border-red-500 @enderror">
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div>
                        <input type="email" value="{{old('name')}}" name="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-carmen-pink sm:text-sm sm:leading-6 @error('email') invalid: border-red-500 @enderror">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <input type="password"  name="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-carmen-pink sm:text-sm sm:leading-6 @error('email') invalid: border-red-500 @enderror">
                </div>
                <div class="mb-3">
                    <label for="password-confirmation" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                    <input type="password" name="password_confirmation" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-carmen-pink sm:text-sm sm:leading-6 @error('email') invalid: border-red-500 @enderror">
                </div>

                <div>
                    <button name="submit" type="submit" class="flex w-full justify-center rounded-md bg-carmen-pink px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-carmen-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmen-pink">Register</button>
                </div>
            </form>
            <p class="mt-5 text-center text-sm text-gray-500">
                Already have an account? <a href="{{ url('/login') }}" class="font-semibold leading-6 text-carmen-pink hover:text-light-carmen-pink">Sign in here</a>
            </p>
        </div>
    </div>
</body>
</html>