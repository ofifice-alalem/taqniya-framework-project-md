# Laravel Feature Routes: [FEATURE_NAME]

# 1. Route Definitions (`routes/web.php` or `routes/api.php`)

```php
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/[RESOURCES]', [[ENTITY]Controller::class, 'index'])->name('[RESOURCES].index');
    Route::post('/[RESOURCES]', [[ENTITY]Controller::class, 'store'])->name('[RESOURCES].store');
    Route::get('/[RESOURCES]/{[RESOURCE]}', [[ENTITY]Controller::class, 'show'])->name('[RESOURCES].show');
    Route::put('/[RESOURCES]/{[RESOURCE]}', [[ENTITY]Controller::class, 'update'])->name('[RESOURCES].update');
    Route::delete('/[RESOURCES]/{[RESOURCE]}', [[ENTITY]Controller::class, 'destroy'])->name('[RESOURCES].destroy');
});
```
