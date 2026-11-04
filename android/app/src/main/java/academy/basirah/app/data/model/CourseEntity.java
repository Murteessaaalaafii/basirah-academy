package academy.basirah.app.data.model;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "courses")
public class CourseEntity {
    @PrimaryKey
    @NonNull
    private String id;
    private String slug;
    private String level;
    private String title;
    private String tagline;
    private String overview;
    private int estimatedHours;
    private int modulesCount;
    private int lessonsCount;
    private boolean isDownloaded;

    public CourseEntity(@NonNull String id, String slug, String level, String title, 
                        String tagline, String overview, int estimatedHours, 
                        int modulesCount, int lessonsCount, boolean isDownloaded) {
        this.id = id;
        this.slug = slug;
        this.level = level;
        this.title = title;
        this.tagline = tagline;
        this.overview = overview;
        this.estimatedHours = estimatedHours;
        this.modulesCount = modulesCount;
        this.lessonsCount = lessonsCount;
        this.isDownloaded = isDownloaded;
    }

    @NonNull
    public String getId() { return id; }
    public String getSlug() { return slug; }
    public String getLevel() { return level; }
    public String getTitle() { return title; }
    public String getTagline() { return tagline; }
    public String getOverview() { return overview; }
    public int getEstimatedHours() { return estimatedHours; }
    public int getModulesCount() { return modulesCount; }
    public int getLessonsCount() { return lessonsCount; }
    public boolean isDownloaded() { return isDownloaded; }

    public void setDownloaded(boolean downloaded) { isDownloaded = downloaded; }
}

