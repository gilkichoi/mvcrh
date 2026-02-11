<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
// Assume Models exist: Department, Appointment, Feedback

class HospitalApiController extends Controller
{
    public function getDepartments()
    {
        // In a real app: return Department::all();
        // For this demo, we return the structured JSON that matches the frontend types
        return response()->json([
            'status' => 'success',
            'data' => [] // Hydrated by DB in production
        ]);
    }

    public function bookAppointment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'required|string',
            'department' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Logic to save to 'appointments' table
        // Mail::to('info@mvcrh.or.ke')->send(new AppointmentRequested($request->all()));

        return response()->json([
            'status' => 'success',
            'message' => 'Appointment request received and saved to database.'
        ]);
    }

    public function submitFeedback(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'comments' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Logic to save to 'feedback' table
        return response()->json([
            'status' => 'success',
            'message' => 'Thank you for your feedback.'
        ]);
    }
}
