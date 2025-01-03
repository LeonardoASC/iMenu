<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('charges', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('value', 10, 2)->nullable();
            $table->text('description')->nullable();
            $table->string('type'); //Service Charge, Cover Charge, Gratuity, Corkage Fee, Reservation Fee, Cancellation Fee
            $table->boolean('is_optional')->default(false);
            $table->string('status')->default('Enable');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charges');
    }
};
