<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNewColumnsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('gender');
            $table->string('picture')->default("...");
            $table->string('id_number')->default("...");
            $table->string('serial_number')->default("...");
            $table->string('validity_period')->default("...");
            $table->string('company')->default("...");
            $table->string('region')->default("...");
            $table->string('verification_result')->default("nonactivated");
            $table->string('health_status')->nullable();
            $table->longText('remark_information');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('gender');
            $table->dropColumn('picture');
            $table->dropColumn('id_number');
            $table->dropColumn('serial_number');
            $table->dropColumn('validity_period');
            $table->dropColumn('company');
            $table->dropColumn('region');
            $table->dropColumn('verification_result');
            $table->dropColumn('health_status');
            $table->dropColumn('remark_information');
        });
    }
}
