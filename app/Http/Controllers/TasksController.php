<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use App\Models\User;

class TasksController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard');
    }

    public function getTasks()
    {
        try {
            $task_collection = auth()->user()->tasks()->get();
            return response()->json($task_collection, 200);
        } catch (\Throwable $th) {
            return response('Server error', 503);
        }
    }

    public function create(Request $request)
    {
        $data = $request->json()->all();
        $method = $data['method'];

        if (!isset($method) || $method == '') {
            return response('Method required', 400);
        }

        if ($method == 'create') {
            // Validation
            $description = $data['description'];

            if (!isset($description) || $description == '') {
                return response('Description required', 400);
            }

            $task = new Task();
            $task->description = $description;
            $task->user_id = auth()->user()->id;
            $task->completed = false;
            $task->save();
            return response()->json($task, 200);
        }

        return response('Unknown method', 400);
    }

    public function update(Request $request, Task $task)
    {
        $data = $request->json()->all();
        $method = $data['method'];

        if (!isset($method) || $method == '') {
            return response('Method required', 400);
        }

        if ($method == 'delete') {
            $task->delete();
            return response('OK', 200);
        } elseif ($method == 'update') {
            $description = $data['description'];
            $completed = $data['completed'];

            if (!isset($description) || $description == '') {
                return response('Description required', 400);
            }
            if (!isset($completed)) {
                return response('Completed required', 400);
            }

            $task->description = $description;
            $task->completed = $completed;
            $task->save();
            return response('OK', 200);
        }

        return response('Unknown Method', 400);
    }
}
