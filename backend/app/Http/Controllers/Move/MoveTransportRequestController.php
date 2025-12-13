<?php

namespace App\Http\Controllers\Move;

use Illuminate\Http\Request;
use App\Helpers\DynamicLogger;
use App\Helpers\QueryHelper;
use App\Http\Controllers\Controller;
use App\Models\Move\MoveTransportRequest;
use App\Models\Mail\MailLog;
use App\Models\Mail\MailTemplate;

class MoveTransportRequestController extends Controller {
    private $logger;

    public function __construct() {
        $this->logger = DynamicLogger::create('laravel.log', 'local');
    }

    /**
     * Display a paginated list of records with optional filtering and search.
     */
    public function index(Request $request) {
        $queryParams = $request->all();

        try {
            $query = MoveTransportRequest::with(['move_driver', 'move_vehicle']);
            $type = 'paginate';
            QueryHelper::apply($query, $queryParams, $type);

            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($query) use ($search) {
                    $query->where('id', 'LIKE', '%'.$search.'%');
                });
            }

            $totalRecords = $query->count();
            $limit = $request->input('limit', 10);
            $page = $request->input('page', 1);
            QueryHelper::applyLimitAndOffset($query, $limit, $page);

            $records = $query->get();

            return response()->json([
                'records' => $records,
                'meta' => [
                    'total_records' => $totalRecords,
                    'total_pages' => ceil($totalRecords / $limit),
                ],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display the specified record.
     */
    public function show($id) {
        $record = MoveTransportRequest::where('id', $id)->first();

        if (!$record) {
            return response()->json([
                'message' => 'Record not found.',
            ], 404);
        }

        return response()->json($record, 200);
    }

    /**
     * Store a newly created record in storage.
     */
    public function store(Request $request) {
        try {
            $record = MoveTransportRequest::create($request->all());

            $mailTemplateId = MailTemplate::where('label', 'Default Template')->first()->id;

            $mailLog = [
                'mail_template_id' => $mailTemplateId,
                'user_id' => 1,
                'subject' => 'Move Transport Request',
                'recipient_email' => 'jimweldizon.dev@gmail.com',
                'content_data' => json_encode([
                    'greeting' => 'Hello, Jimwel Dizon',
                    'message' => 'You have received a move transport request.',
                ]),
            ];

            MailLog::create(array_filter($mailLog, function ($value) {
                return $value !== null && $value !== '';
            }));

            return response()->json($record, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Update the specified record in storage.
     */
    public function update(Request $request, $id) {
        try {
            $record = MoveTransportRequest::find($id);

            if (!$record) {
                return response()->json([
                    'message' => 'Record not found.',
                ], 404);
            }

            $record->update($request->all());

            return response()->json($record, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Remove the specified record from storage.
     */
    public function destroy($id) {
        try {
            $record = MoveTransportRequest::find($id);

            if (!$record) {
                return response()->json([
                    'message' => 'Record not found.',
                ], 404);
            }

            // Delete the record
            $record->delete();

            return response()->json($record, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
