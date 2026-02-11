<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('departments', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('slug')->unique();
            $blueprint->string('name');
            $blueprint->string('icon');
            $blueprint->text('description');
            $blueprint->text('long_description');
            $blueprint->string('image_url');
            $blueprint->string('head_of_department')->nullable();
            $blueprint->json('sub_services');
            $blueprint->json('faqs')->nullable();
            $blueprint->json('gallery_images')->nullable();
            $blueprint->timestamps();
        });

        Schema::create('appointments', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('patient_name');
            $blueprint->string('phone');
            $blueprint->string('email')->nullable();
            $blueprint->string('department_name');
            $blueprint->date('appointment_date');
            $blueprint->string('appointment_time');
            $blueprint->text('message')->nullable();
            $blueprint->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $blueprint->timestamps();
        });

        Schema::create('feedback', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('name');
            $blueprint->string('category');
            $blueprint->integer('rating');
            $blueprint->text('comments');
            $blueprint->enum('status', ['new', 'read', 'resolved'])->default('new');
            $blueprint->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('feedback');
        Schema::dropIfExists('appointments');
        Schema::dropIfExists('departments');
    }
};
