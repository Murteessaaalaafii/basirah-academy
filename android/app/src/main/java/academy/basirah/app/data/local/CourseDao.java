package academy.basirah.app.data.local;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;
import java.util.List;
import academy.basirah.app.data.model.CourseEntity;

@Dao
public interface CourseDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertCourses(List<CourseEntity> courses);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertCourse(CourseEntity course);

    @Query("SELECT * FROM courses")
    LiveData<List<CourseEntity>> getAllCourses();

    @Query("SELECT * FROM courses WHERE level = :level")
    LiveData<List<CourseEntity>> getCoursesByLevel(String level);

    @Query("SELECT * FROM courses WHERE slug = :slug LIMIT 1")
    CourseEntity getCourseBySlug(String slug);

    @Query("SELECT * FROM courses WHERE isDownloaded = 1")
    LiveData<List<CourseEntity>> getDownloadedCourses();

    @Update
    void updateCourse(CourseEntity course);
}

