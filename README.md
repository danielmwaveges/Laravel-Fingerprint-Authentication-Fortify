# Laravel Fingerprint Authentication
Laravel Fingerprint Authentication is a simple web application project intended to implement user authentication functionalities using the classic email/password combination and biometric data authentication.

###Stack
The project has been developed using PHP and Laravel web framework. Classic email/password registration and login features have been implemented using [Laravel Fortify](), a frontend agnostic authentication backend implementation for Laravel.
Biometric authentication is implemented using the WebAuthn web authentication specification that enables integration of strong authentication into web applications using security keys or built in platform authenticators such as  biometric readers. [Laragear/WebAuthn]() and [Laragear/Webpass]() packages have been leveraged to implement this specification.
PostgreSQL database is used to persist users' information and web authentication credential details.

###Dependencies
Ensure you have installed the following dependencies:
-PHP 8+
-Laravel 10+
-Composer 2.7.1
-PostgreSQL 11+
-Laravel Fortify
-Laragear/WebAuthn
-Laragear/Webpass

###Build and run instructions
Set up a new postgreSQL database and change the necessary configuration options in .env configuration file.
Run ```composer update ``` command to install dependencies.
Run ```php artisan migrate ``` to migrate your database.
Run ```php artisan serve``` to start the web server.
Navigate to localhost:8000 in your browser to access the application.
*Note: WebAuthn only works in localhost or a https secure domain. Set up your domain identifier in WebAuthnID environment variable in the .env file*.

###Issues
An issue with the Laragear WebPass package has been discovered whereby the credential returned by an authenticator is incorrectly evaluated as empty thereby failing the attestation and assertion ceremonies. This issue is being raised to the authors of the package while a work around solution is developed.





