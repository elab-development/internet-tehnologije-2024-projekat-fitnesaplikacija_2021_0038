<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ProfileResource;

class ProfileController extends Controller
{
    public function index()
    {
        $profiles = Profile::where('user_id', Auth::id())->get();
        return response()->json(ProfileResource::collection($profiles), 200);
    }

    public function show($id)
    {
        $profile = Profile::where('user_id', Auth::id())->findOrFail($id);
        return response()->json(new ProfileResource($profile), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'age' => 'required|integer|min:18|max:70',
            'weight' => 'required|integer|min:30|max:300',
            'height' => 'required|integer|min:100|max:250',
            'goal' => 'required|string|in:lose weight,maintain weight,gain weight',
            'calories_per_day' => 'required|integer|min:1000|max:4000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $profile = Profile::create(array_merge($request->all(), ['user_id' => Auth::id()]));

        return response()->json(new ProfileResource($profile), 201);
    }

    public function update(Request $request, $id)
    {
        $profile = Profile::where('user_id', Auth::id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'age' => 'required|integer|min:18|max:70',
            'weight' => 'required|integer|min:30|max:300',
            'height' => 'required|integer|min:100|max:250',
            'goal' => 'required|string|in:lose weight,maintain weight,gain weight',
            'calories_per_day' => 'required|integer|min:1000|max:4000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $profile->update($request->all());

        return response()->json(new ProfileResource($profile), 200);
    }

    public function destroy($id)
    {
        $profile = Profile::where('user_id', Auth::id())->findOrFail($id);
        $profile->delete();

        return response()->json(['message' => 'Profile deleted successfully'], 200);
    }
}
