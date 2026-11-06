# Academic Seminar Slides & Presentations Directory

Drop your presentation slides (`.pptx`, `.ppt`, `.pdf`, `.odp`) in this folder.

### How to make your slides appear on the website:
1. Copy your slide file into this folder (e.g., `slides/my_seminar.pptx`).
2. Open `slides-data.js` in the root folder.
3. Add a new item to `academicResources`:
```javascript
{
  id: "my-seminar-topic",
  title: "My Seminar Presentation Title",
  category: "Computer Science", // or "Electronics & IoT", "Seminars & Emerging Tech", "Mathematics & Science", "Study Notes"
  type: "PPTX",
  slidesCount: "25 Slides",
  academicLevel: "Undergraduate / College",
  author: "Your Name",
  date: "2026",
  featured: true,
  summary: "A brief 1-2 sentence overview of what your presentation covers.",
  topicsCovered: [
    "Topic point 1",
    "Topic point 2",
    "Topic point 3"
  ],
  fileUrl: "slides/my_seminar.pptx",
  previewUrl: "https://docs.google.com/viewer?embedded=true&url=https://dhyankrishna24.github.io/esp32site/slides/my_seminar.pptx",
  tags: ["seminar", "presentation", "topic"]
}
```
4. Save and refresh your page!
