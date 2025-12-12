<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('move_transport_requests', function (Blueprint $table) {
            $table->id();
            $table->string('rider_type');
            $table->string('passenger_name');
            $table->string('passenger_department');
            $table->string('passenger_email');
            $table->string('pickup_location');
            $table->string('dropoff_location');
            $table->string('pickup_date_time');
            $table->string('dropoff_date_time');
            $table->string('purpose');
            $table->string('status');
            $table->foreignId('move_driver_id')->constrained('users')->onDelete('cascade')->nullable();
            $table->foreignId('move_vehicle_id')->constrained('move_vehicles')->onDelete('cascade')->nullable();
            $table->boolean('external_service_flag');
            $table->string('external_service_provider')->nullable();
            $table->string('notes');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('move_transport_requests');
    }
};
