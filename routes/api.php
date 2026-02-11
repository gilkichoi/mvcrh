<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HospitalApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // Public Data
    Route::get('/departments', [HospitalApiController::class, 'getDepartments']);
    Route::get('/services', [HospitalApiController::class, 'getServices']);
    Route::get('/resources', [HospitalApiController::class, 'getResources']);
    
    // Submissions
    Route::post('/appointments', [HospitalApiController::class, 'bookAppointment']);
    Route::post('/feedback', [HospitalApiController::class, 'submitFeedback']);
    
    // Auth Protected (Admin)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/admin/stats', [HospitalApiController::class, 'getStats']);
        Route::patch('/departments/{id}', [HospitalApiController::class, 'updateDepartment']);
    });
});
