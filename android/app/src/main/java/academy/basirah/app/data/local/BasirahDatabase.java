package academy.basirah.app.data.local;

import android.content.Context;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import academy.basirah.app.data.model.CourseEntity;
import academy.basirah.app.data.model.OfflineProgressEntity;

@Database(entities = {CourseEntity.class, OfflineProgressEntity.class}, version = 1, exportSchema = false)
public abstract class BasirahDatabase extends RoomDatabase {
    private static volatile BasirahDatabase instance;

    public abstract CourseDao courseDao();
    public abstract ProgressDao progressDao();

    public static synchronized BasirahDatabase getInstance(Context context) {
        if (instance == null) {
            instance = Room.databaseBuilder(
                    context.getApplicationContext(),
                    BasirahDatabase.class,
                    "basirah_academy_local.db"
            ).fallbackToDestructiveMigration().build();
        }
        return instance;
    }
}

