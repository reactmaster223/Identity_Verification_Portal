<DOCTYPE html>
   <html lang="en-US">
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <h2>
                Hi {{$data['first_name']}} {{$data['last_name']}}, we're glad you're here! Following are your account details: <br>
            </h2>
            <h3>Email: </h3><p>{{$data['email']}}</p>
            <h3>First Name: </h3><p>{{$data['first_name']}}</p>
            <h3>Last Name: </h3><p>{{$data['last_name']}}</p>
        </body>
    </html>