<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'avatar' => 'nullable|string|max:255',
            'level' => 'nullable|integer|min:0',
            'points' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar' => $request->avatar ?? null,
            'level' => $request->level ?? 0,
            'points' => $request->points ?? 0,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    //dodato za seminarski
    public function changeUserRole(Request $request, $id)
    {
        // Validacija ulaznih podataka
        $validator = Validator::make($request->all(), [
            'role' => 'required|string|in:admin,korisnik',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Pronađi korisnika prema ID-u
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Korisnik nije pronađen.'], 404);
        }

        // Promeni ulogu korisniku
        $user->uloga = $request->role;
        $user->save();

        return response()->json([
            'message' => 'Uloga korisnika je uspešno promenjena.',
            'user' => new UserResource($user),
        ], 200);
    }
    public function getAllUsers()
    {
        $users = User::all();

        return response()->json([
            'message' => 'Lista svih korisnika.',
            'users' => UserResource::collection($users),
        ], 200);
    }

}
