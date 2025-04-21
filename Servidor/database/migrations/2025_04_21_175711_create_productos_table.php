<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('descripcion');
            $table->decimal('precio', 10, 2);
            $table->integer('stock');
            $table->foreignId('categoria_id')->constrained()->onDelete('cascade');
            $table->string('marca');
            $table->string('modelo');
            $table->string('sku')->unique();
            $table->decimal('descuento', 10, 2)->nullable();
            $table->integer('fps')->nullable();
            $table->string('calibre', 50)->nullable();
            $table->integer('capacidad_cargador')->nullable();
            $table->float('peso')->nullable();
            $table->json('imagenes')->nullable();
            $table->string('video_demo')->nullable();
            $table->string('tiempo_envio')->nullable();
            $table->boolean('estado_activo')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
