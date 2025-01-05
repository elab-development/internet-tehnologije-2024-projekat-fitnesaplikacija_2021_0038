<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ProfileResource;
use Illuminate\Support\Facades\Storage;

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
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();
        $data['user_id'] = Auth::id();

        if ($request->hasFile('profile_picture')) {
            $data['profile_picture'] = $request->file('profile_picture')->store('profiles', 'public');
        }

        $profile = Profile::create($data);

        return response()->json(new ProfileResource($profile), 201);
    }

    public function update(Request $request, $id)
    {
        $profile = Profile::where('user_id', Auth::id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'age' => 'sometimes|integer|min:18|max:70',
            'weight' => 'sometimes|integer|min:30|max:300',
            'height' => 'sometimes|integer|min:100|max:250',
            'goal' => 'sometimes|string|in:lose weight,maintain weight,gain weight',
            'calories_per_day' => 'sometimes|integer|min:1000|max:4000',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        if ($request->hasFile('profile_picture')) {
            // Brisanje stare slike ako postoji
            if ($profile->profile_picture) {
                Storage::disk('public')->delete($profile->profile_picture);
            }

            $data['profile_picture'] = $request->file('profile_picture')->store('profiles', 'public');
        }

        $profile->update($data);

        return response()->json(new ProfileResource($profile), 200);
    }

    public function destroy($id)
    {
        $profile = Profile::where('user_id', Auth::id())->findOrFail($id);

        if ($profile->profile_picture) {
            Storage::disk('public')->delete($profile->profile_picture);
        }

        $profile->delete();

        return response()->json(['message' => 'Profile deleted successfully'], 200);
    }
}
