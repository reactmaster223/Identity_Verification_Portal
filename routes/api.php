<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['prefix' => 'auth'], function () {
    Route::post('login','AuthController@authenticate');
    Route::post('register','AuthController@store');
    Route::get('setOffline/{id}', 'AuthController@setOffline');
    Route::get('logout','AuthController@logout');
    Route::get('checkOnlineUsers', 'AuthController@checkOnlineUsers');
    Route::get('check','AuthController@check');
    Route::group(['prefix' => 'new'], function () {
        Route::post('/register', [
            'as' => 'auth.new.register', 'uses' => 'AuthController@newMemberAdd'
        ]);
    });
    Route::group(['prefix' => 'update'], function () {
        Route::post('/verification', [
            'as' => 'auth.update.verification', 'uses' => 'AuthController@updateUserEmailVerification'
        ]);
    });
    Route::group(['prefix' => 'resend'], function () {
        Route::post('/verification', [
            'as' => 'auth.resend.verification', 'uses' => 'AuthController@resendEmailVerification'
        ]);
    });
    Route::group(['prefix' => 'password'], function () {
        Route::post('/reset', [
            'as' => 'auth.password.reset', 'uses' => 'AuthController@passwordReset'
        ]);
    });
    Route::group(['prefix' => 'user'], function () {
        Route::post('/updatePassword/{id}', [
            'as' => 'auth.user.updatePassword', 'uses' => 'AuthController@updateUserPasswordWithId'
        ]);
    });
});

// session route
Route::post('email-exist',[
    'as' => 'email-exist','uses' => 'Demo\PagesController@emailExist'
]);

Route::post('region-exist', [
    'as' => 'region-exist', 'uses' => 'Demo\PagesController@regionExist'
]);

Route::get('/get/allAdminUsers', [
    'as' => 'admin.users.all', 'uses' => 'Demo\PagesController@allAdminUsers' 
]);

Route::delete('/regions/{id}',[
    'as' => 'admin.regions.delete', 'uses' => 'Demo\PagesController@destroyRegion'
]);

Route::get('/region/companies/{id}', [
    'as' => 'admin.region.companies.get', 'uses' => 'Demo\PagesController@getRegionCompaniesWithId'
]);

Route::get('/regionIDWithName/{name}', [
    'as' => 'get.regionIDWithName', 'uses' => 'Demo\PagesController@getRegionIDWithName'
]);

// admin route
Route::group(['prefix' => 'admin', 'middleware' => 'api.auth'], function (){

    Route::resource('todos', 'Demo\TodosController');

    Route::post('todos/toggleTodo/{id}', [
        'as' => 'admin.todos.toggle', 'uses' => 'Demo\TodosController@toggleTodo'
    ]);

    Route::group(['prefix' => 'settings'], function () {

        Route::post('/social', [
            'as' => 'admin.settings.social', 'uses' => 'Demo\SettingsController@postSocial'
        ]);
    });

    Route::group(['prefix' => 'users'], function (){

        Route::get('/get',[
            'as' => 'admin.users', 'uses' => 'Demo\PagesController@allUsers'
        ]);

        Route::get('/get/{region_name}', [
            'as' => 'admin.users.onRegion', 'uses' => 'Demo\PagesController@usersOnRegion'
        ]);

        // New Here ...

        Route::get('/get/{region_name}/{company_name}', [
            'as' => 'admin.users.onRegion.onCompany', 'uses' => 'Demo\PagesController@usersOnRegionCompany'
        ]);

        Route::delete('/{id}',[
            'as' => 'admin.users.delete', 'uses' => 'Demo\PagesController@destroy'
        ]);

        Route::delete('/all', [
            'as' => 'admin.users.all.delete', 'uses' => 'Demo\PagesController@allDestroy'
        ]);

    });

    Route::group(['prefix' => 'user'], function (){

        Route::get('/get/{id}',[
            'as' => 'admin.user', 'uses' => 'Demo\PagesController@getUserWithId'
        ]);        

        Route::post('/edit/{id}', [
            'as' => 'admin.user.edit', 'uses' => 'Demo\PagesController@editUserWithId'
        ]);

        Route::post('/changeUserAvatar', [
            'as' => 'admin.user.change.avatar', 'uses' => 'AvatarsController@changeUserAvatar'
        ]);

        Route::post('/setUserRemarkInfo', [
            'as' => 'admin.user.setUserRemarkInfo', 'uses' => 'Demo\PagesController@setUserRemarkInfo'
        ]);

        Route::post('/updatePassword/{id}', [
            'as' => 'admin.user.updatePassword', 'uses' => 'Demo\PagesController@updateUserPasswordWithId'
        ]);

        Route::post('/delete/remarkInfo/{id}', [
            'as' => 'admin.user.delete.remarkInfo', 'uses' => 'Demo\PagesController@deleteRemarkInfo'
        ]);

        Route::group(['prefix' => 'avatar'], function (){
            Route::get('/get/{id}', [
                'as' => 'admin.user.avatar', 'uses' => 'AvatarsController@getUserAvatarWithId'
            ]);
            Route::get('/getAll', [
                'as' => 'admin.user.avatar.getall', 'uses' => 'AvatarsController@getAllAvatars'
            ]);
        });        

        Route::post('/keep/{id}', [
            'as' => 'admin.user.keep', 'uses' => 'Demo\PagesController@keepUserInfo'
        ]);

        // New Added

        Route::get('/get/keepInfo/{id}', [
            'as' => 'admin.user.get.keepInfo', 'uses' => 'Demo\PagesController@getKeepUserInfo'
        ]);

        // Set Screen Age
        Route::post("/setScreenAge", [
            'as' => 'admin.user.setScreenAge', 'uses' => 'Demo\PagesController@setScreenAge'
        ]);

    });

    // New Added 
    Route::group(['prefix' => 'region'], function () {
        Route::post('/add/new', [
            'as' => 'admin.region.add.new', 'uses' => 'Demo\PagesController@addNewRegion'
        ]);
        Route::get('/get/all', [
            'as' => 'admin.region.get.all', 'uses' => 'Demo\PagesController@getAllRegions'
        ]);

        Route::post('/company/add/new', [
            'as' => 'admin.region.company.add.new', 'uses' => 'Demo\PagesController@addNewRegionCompany'
        ]);

        Route::post('/company/update', [
            'as' => 'admin.region.company.update', 'uses' => 'Demo\PagesController@updateRegionCompany'
        ]);
        Route::post('/companieswithname', [
            'as' => 'admin.region.companieswithname', 'uses' => 'Demo\PagesController@getRegionCompaniesWithName'
        ]);
    });

    // New Here Add ...

    Route::group(['prefix' => 'verification'], function () {
        Route::get('/authenicate', [
            'as' => 'admin.verification.verify', 'uses' => 'Demo\PagesController@runPythonScript'
        ]);
        Route::get('/getJSONFromExcel', [
            'as' => 'admin.verification.getJSONFromExcel', 'uses' => 'Demo\PagesController@getJSONFromExcel'
        ]);
        Route::post("/updateVerificationStatus", [
            'as' => 'admin.verification.updateVerificationStatus', 'uses' => 'Demo\PagesController@updateVerificationStatus'
        ]);
        Route::post("/updateHealthStatus", [
            'as' => 'admin.verification.updateHealthStatus', 'uses' => 'Demo\PagesController@updateHealthStatus'
        ]);
    });

    // Added Here ...

    Route::group(['prefix' => 'practitioners'], function () {
        Route::get('/unverified', [
            'as' => 'admin.practitioners.unverified', 'uses' => 'Demo\PagesController@getUnverifiedPractitioners'
        ]);
        Route::get('/region/unverified/{region}', [
            'as' => 'admin.practitioners.unverified.region', 'uses' => 'Demo\PagesController@getUnverifiedPractitionersInRegion'
        ]);
        Route::get('/company/unverified/{company}', [
            'as' => 'admin.practitioners.unverified.company', 'uses' => 'Demo\PagesController@getUnverifiedPractitionersInCompany'
        ]);
        Route::post("/provideBatchFile", [
            'as' => 'admin.practitioners.provideBatchFile', 'uses' => 'Demo\PagesController@keepBatchFile'
        ]);
    });

});

