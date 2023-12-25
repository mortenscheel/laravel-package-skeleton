<?php

namespace Scheel\PackagePascal;

use Illuminate\Support\ServiceProvider;

class PackagePascalServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/:package_slug.php', ':package_slug');
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // $this->loadTranslationsFrom(__DIR__.'/../resources/lang', ':package_slug');
        // $this->loadViewsFrom(__DIR__.'/../resources/views', ':package_slug');
        // $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        // $this->loadRoutesFrom(__DIR__.'/routes.php');

        if ($this->app->runningInConsole()) {
            // Publishing the configuration file.
            $this->publishes([
                __DIR__.'/../config/:package_slug.php' => config_path(':package_slug.php'),
            ], ':package_slug.config');

            // Publishing the views.
            //$this->publishes([
            //    __DIR__.'/../resources/views' => base_path('resources/views/vendor/mortenscheel'),
            //], ':package_slug.views');

            // Publishing assets.
            //$this->publishes([
            //    __DIR__.'/../resources/assets' => public_path('vendor/mortenscheel'),
            //], ':package_slug.assets');

            // Publishing the translation files.
            //$this->publishes([
            //    __DIR__.'/../resources/lang' => resource_path('lang/vendor/mortenscheel'),
            //], ':package_slug.lang');

            // Registering package commands.
            // $this->commands([]);
        }
    }

    /**
     * Determine if the provider is deferred.
     *
     * @return bool
     */
    public function isDeferred()
    {
        return false;
    }

    /**
     * Get the services provided by the provider.
     *
     * This method is only really useful when the `isDeferred()` method above
     * returns `true`
     *
     * @return array
     */
    public function provides()
    {
        return [
            PackagePascal::class,
        ];
    }
}
