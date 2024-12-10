<?php

namespace App\Http\Controllers;

use App\Models\DiaryEntry;
use App\Http\Resources\DiaryEntryResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
 
class DiaryEntryController extends Controller
{
    public function index()
    {
        $userId = auth()->id(); // Koristimo ID ulogovanog korisnika
        $entries = DiaryEntry::where('user_id', $userId)->orderBy('date', 'desc')->get();
        return response()->json(DiaryEntryResource::collection($entries));
    }

    public function show($id)
    {
        $userId = auth()->id();
        $entry = DiaryEntry::where('id', $id)->where('user_id', $userId)->firstOrFail();
        return response()->json(new DiaryEntryResource($entry));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $diaryEntry = DiaryEntry::create([
            'user_id' => auth()->id(), // Postavljamo ID ulogovanog korisnika
            'date' => $request->date,
            'content' => $request->content,
        ]);

        return response()->json(new DiaryEntryResource($diaryEntry), 201);
    }

    public function update(Request $request, $id)
    {
        $userId = auth()->id();
        $entry = DiaryEntry::where('id', $id)->where('user_id', $userId)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $entry->update($validator->validated());
        return response()->json(new DiaryEntryResource($entry));
    }

    public function destroy($id)
    {
        $userId = auth()->id();
        $entry = DiaryEntry::where('id', $id)->where('user_id', $userId)->firstOrFail();
        $entry->delete();

        return response()->json(['message' => 'Diary entry deleted successfully.']);
    }
}
