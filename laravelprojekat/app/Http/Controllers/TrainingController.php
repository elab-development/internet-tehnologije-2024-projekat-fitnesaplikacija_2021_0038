<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\TrainingResource;

class TrainingController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10); // Broj elemenata po stranici (default 10)
    
        $trainings = Training::where('user_id', Auth::id())
            ->paginate($perPage);
    
        return response()->json([
            'data' => TrainingResource::collection($trainings->items()),
            'meta' => [
                'current_page' => $trainings->currentPage(),
                'per_page' => $trainings->perPage(),
                'total' => $trainings->total(),
                'last_page' => $trainings->lastPage(),
            ]
        ], 200);
    }
    

    public function show($id)
    {
        $training = Training::where('user_id', Auth::id())->findOrFail($id);
        return response()->json(new TrainingResource($training), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'duration' => 'required|integer|min:1',
            'calories_burned' => 'required|integer|min:0',
            'difficulty' => 'required|string|in:easy,medium,hard',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $training = Training::create(array_merge($request->all(), [
            'user_id' => Auth::id(),
        ]));

        return response()->json(new TrainingResource($training), 201);
    }

    public function update(Request $request, $id)
    {
        $training = Training::where('user_id', Auth::id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'duration' => 'required|integer|min:1',
            'calories_burned' => 'required|integer|min:0',
            'difficulty' => 'required|string|in:easy,medium,hard',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $training->update($request->all());

        return response()->json(new TrainingResource($training), 200);
    }

    public function destroy($id)
    {
        $training = Training::where('user_id', Auth::id())->findOrFail($id);
        $training->delete();

        return response()->json(['message' => 'Training deleted successfully'], 200);
    }
}
