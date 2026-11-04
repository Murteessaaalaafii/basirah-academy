package academy.basirah.app.data.local;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;
import java.util.List;
import academy.basirah.app.data.model.OfflineProgressEntity;

@Dao
public interface ProgressDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertProgress(OfflineProgressEntity progress);

    @Query("SELECT * FROM offline_progress WHERE isSyncedWithServer = 0")
    List<OfflineProgressEntity> getUnsyncedProgress();

    @Query("SELECT * FROM offline_progress WHERE courseSlug = :courseSlug")
    List<OfflineProgressEntity> getCourseProgress(String courseSlug);

    @Update
    void updateProgress(OfflineProgressEntity progress);

    @Query("DELETE FROM offline_progress WHERE courseSlug = :courseSlug AND lessonId = :lessonId")
    void deleteProgress(String courseSlug, String lessonId);
}

