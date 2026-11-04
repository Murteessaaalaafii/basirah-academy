package academy.basirah.app;

import android.app.Application;
import academy.basirah.app.data.local.BasirahDatabase;

public class BasirahApplication extends Application {
    private static BasirahApplication instance;
    private BasirahDatabase database;

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        database = BasirahDatabase.getInstance(this);
    }

    public static BasirahApplication getInstance() {
        return instance;
    }

    public BasirahDatabase getDatabase() {
        return database;
    }
}

