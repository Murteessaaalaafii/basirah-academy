package academy.basirah.app.data.model;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "offline_progress")
public class OfflineProgressEntity {
    @PrimaryKey(autoGenerate = true)
    private int id;
    
    @NonNull
    private String courseSlug;
    @NonNull
    private String lessonId;
    private boolean isCompleted;
    private int quizScore;
    private long timestamp;
    private boolean isSyncedWithServer;

    public OfflineProgressEntity(@NonNull String courseSlug, @NonNull String lessonId, 
                                 boolean isCompleted, int quizScore, 
                                 long timestamp, boolean isSyncedWithServer) {
        this.courseSlug = courseSlug;
        this.lessonId = lessonId;
        this.isCompleted = isCompleted;
        this.quizScore = quizScore;
        this.timestamp = timestamp;
        this.isSyncedWithServer = isSyncedWithServer;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    @NonNull
    public String getCourseSlug() { return courseSlug; }
    @NonNull
    public String getLessonId() { return lessonId; }
    public boolean isCompleted() { return isCompleted; }
    public int getQuizScore() { return quizScore; }
    public long getTimestamp() { return timestamp; }
    public boolean isSyncedWithServer() { return isSyncedWithServer; }

    public void setSyncedWithServer(boolean synced) { this.isSyncedWithServer = synced; }
}

