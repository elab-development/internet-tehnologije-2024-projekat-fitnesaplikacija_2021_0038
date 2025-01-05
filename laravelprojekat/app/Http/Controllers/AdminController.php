<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\Training;

class AdminController extends Controller
{
    public function userGoalsStatistics()
    {
        $goals = Profile::select('goal')
            ->groupBy('goal')
            ->selectRaw('goal, COUNT(*) as count')
            ->get();

        return response()->json($goals, 200);
    }

    public function trainingDurationStatistics()
    {
        $trainings = Training::selectRaw('DATE_FORMAT(date, "%Y-%m") as month, SUM(duration) as total_duration')
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        return response()->json($trainings, 200);
    }
}
