<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Http\Resources\ExerciseResource;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ExerciseController extends Controller
{
    public function index()
    {
        $exercises = Exercise::all();
        return response()->json(ExerciseResource::collection($exercises));
    }

    public function show($id)
    {
        $exercise = Exercise::findOrFail($id);
        return response()->json(new ExerciseResource($exercise));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'training_id' => 'required|integer|exists:trainings,id',
            'name' => 'required|string|max:255',
            'repetitions' => 'nullable|integer|min:1',
            'sets' => 'nullable|integer|min:1',
            'duration' => 'nullable|integer|min:1',
            'equipment_needed' => 'nullable|string|max:255',
            'muscle_group' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $exercise = Exercise::create($validator->validated());
        return response()->json(new ExerciseResource($exercise), 201);
    }

    public function update(Request $request, $id)
    {
        $exercise = Exercise::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'training_id' => 'required|integer|exists:trainings,id',
            'name' => 'required|string|max:255',
            'repetitions' => 'nullable|integer|min:1',
            'sets' => 'nullable|integer|min:1',
            'duration' => 'nullable|integer|min:1',
            'equipment_needed' => 'nullable|string|max:255',
            'muscle_group' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $exercise->update($validator->validated());
        return response()->json(new ExerciseResource($exercise));
    }

    public function destroy($id)
    {
        $exercise = Exercise::findOrFail($id);
        $exercise->delete();

        return response()->json(['message' => 'Exercise deleted successfully.']);
    }


   

}
