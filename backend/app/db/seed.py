"""
Seed script to populate MongoDB with initial data for ClarityQuest.
This mirrors the frontend's mock-data.ts so the API returns real data.
"""
from app.core.logger import api_log


LESSONS = [
    {
        "id": "l1",
        "title": "Mastering \"Tell Me About Yourself\"",
        "description": "Structure a compelling self-introduction for interviews. Learn the Present-Past-Future formula.",
        "duration": 240,
        "difficulty": "beginner",
        "tags": ["interview", "introduction", "fluency"],
        "thumbnail": "/lessons/intro.jpg",
        "watched": True,
        "chapters": [
            {"title": "Why this question matters", "timestamp": 0},
            {"title": "The structure formula", "timestamp": 45},
            {"title": "Common mistakes", "timestamp": 120},
            {"title": "Practice template", "timestamp": 180},
        ],
    },
    {
        "id": "l2",
        "title": "Pronunciation: /v/ vs /w/ sounds",
        "description": "One of the most common pronunciation challenges for Indian English speakers. Master the distinction.",
        "duration": 180,
        "difficulty": "intermediate",
        "tags": ["pronunciation", "phonetics", "drill"],
        "thumbnail": "/lessons/phonetics.jpg",
        "watched": False,
        "chapters": [
            {"title": "Understanding the sounds", "timestamp": 0},
            {"title": "Mouth position", "timestamp": 40},
            {"title": "Practice words", "timestamp": 90},
            {"title": "In sentences", "timestamp": 140},
        ],
    },
    {
        "id": "l3",
        "title": "Reducing Filler Words",
        "description": "Learn techniques to replace \"um\", \"uh\", \"basically\" with confident pauses.",
        "duration": 300,
        "difficulty": "intermediate",
        "tags": ["fluency", "confidence", "filler-words"],
        "thumbnail": "/lessons/fillers.jpg",
        "watched": False,
        "chapters": [
            {"title": "What are filler words?", "timestamp": 0},
            {"title": "Why we use them", "timestamp": 60},
            {"title": "The power of pausing", "timestamp": 150},
            {"title": "Daily exercise", "timestamp": 230},
        ],
    },
    {
        "id": "l4",
        "title": "Powerful Presentation Openings",
        "description": "Hook your audience in the first 30 seconds with storytelling and rhetorical questions.",
        "duration": 360,
        "difficulty": "advanced",
        "tags": ["presentation", "storytelling", "hooks"],
        "thumbnail": "/lessons/presentation.jpg",
        "watched": False,
        "chapters": [
            {"title": "Why openings matter", "timestamp": 0},
            {"title": "5 opening techniques", "timestamp": 60},
            {"title": "Examples from TED Talks", "timestamp": 200},
            {"title": "Build your own", "timestamp": 300},
        ],
    },
    {
        "id": "l5",
        "title": "Grammar: Present Perfect vs Simple Past",
        "description": "Master this tricky distinction in professional communication with clear rules and examples.",
        "duration": 210,
        "difficulty": "beginner",
        "tags": ["grammar", "tense", "professional"],
        "thumbnail": "/lessons/grammar.jpg",
        "watched": True,
        "chapters": [
            {"title": "The difference explained", "timestamp": 0},
            {"title": "Common errors", "timestamp": 50},
            {"title": "Practice sentences", "timestamp": 120},
            {"title": "Quiz", "timestamp": 175},
        ],
    },
    {
        "id": "l6",
        "title": "Body Language for Video Calls",
        "description": "Optimize your non-verbal communication for remote interviews and meetings.",
        "duration": 270,
        "difficulty": "intermediate",
        "tags": ["non-verbal", "video-call", "body-language"],
        "thumbnail": "/lessons/bodylang.jpg",
        "watched": False,
        "chapters": [
            {"title": "Camera framing", "timestamp": 0},
            {"title": "Eye contact tricks", "timestamp": 60},
            {"title": "Hand gestures", "timestamp": 140},
            {"title": "Posture tips", "timestamp": 210},
        ],
    },
]

JOBS = [
    {
        "id": "j1",
        "title": "Interview intro practice",
        "type": "recording",
        "status": "done",
        "createdAt": "2026-03-07T10:30:00",
        "completedAt": "2026-03-07T10:35:00",
        "tags": ["interview", "intro"],
        "stages": [
            {"name": "Uploaded", "status": "success", "timestamp": "2026-03-07T10:30:00"},
            {"name": "Transcribing", "status": "success", "timestamp": "2026-03-07T10:31:00"},
            {"name": "Alignment", "status": "success", "timestamp": "2026-03-07T10:32:30"},
            {"name": "Scoring", "status": "success", "timestamp": "2026-03-07T10:34:00"},
            {"name": "Report ready", "status": "success", "timestamp": "2026-03-07T10:35:00"},
        ],
    },
    {
        "id": "j2",
        "title": "Presentation opening",
        "type": "recording",
        "status": "processing",
        "createdAt": "2026-03-07T14:00:00",
        "estimatedTime": 5,
        "tags": ["presentation"],
        "stages": [
            {"name": "Uploaded", "status": "success", "timestamp": "2026-03-07T14:00:00"},
            {"name": "Transcribing", "status": "success", "timestamp": "2026-03-07T14:01:00"},
            {"name": "Alignment", "status": "running"},
            {"name": "Scoring", "status": "pending"},
            {"name": "Report ready", "status": "pending"},
        ],
    },
    {
        "id": "j3",
        "title": "Pronunciation drill — /v/ sounds",
        "type": "exercise",
        "status": "queued",
        "createdAt": "2026-03-07T15:30:00",
        "estimatedTime": 8,
        "queuePosition": 3,
        "tags": ["pronunciation", "drill"],
        "stages": [
            {"name": "Uploaded", "status": "success", "timestamp": "2026-03-07T15:30:00"},
            {"name": "Transcribing", "status": "pending"},
            {"name": "Alignment", "status": "pending"},
            {"name": "Scoring", "status": "pending"},
            {"name": "Report ready", "status": "pending"},
        ],
    },
]

RESULT = {
    "id": "r1",
    "jobId": "j1",
    "overallScore": 72,
    "subscores": {"pronunciation": 68, "clarity": 75, "grammar": 78, "vocabulary": 70},
    "coachNote": "Good effort! Focus on distinguishing /v/ and /w/ sounds and reducing filler words. Your sentence structure is improving.",
    "transcript": "Hello, my name is Harshit and I am a software developer with five years of experience. I have worked on various projects including web applications and mobile apps. Um, I am currently looking for a new opportunity where I can, basically, grow my skills and contribute to a, you know, innovative team.",
    "correctedTranscript": "Hello, my name is Harshit, and I am a software developer with five years of experience. I have worked on various projects, including web applications and mobile apps. I am currently looking for a new opportunity where I can grow my skills and contribute to an innovative team.",
    "pronunciationIssues": [
        {"word": "various", "phoneme": "/w/", "correctPhoneme": "/v/", "tip": "Try touching your upper teeth with your lower lip to produce the /v/ sound.", "score": 45},
        {"word": "developer", "phoneme": "/w/", "correctPhoneme": "/v/", "tip": "The \"v\" in developer needs lip-teeth contact. Practice: \"ve-ve-ve-developer\".", "score": 52},
        {"word": "innovative", "phoneme": "/w/", "correctPhoneme": "/v/", "tip": "Start with the /v/ sound slowly. Exaggerate the lip-teeth contact at first.", "score": 40},
    ],
    "fluencyMetrics": {"wpm": 142, "idealRange": [130, 160], "fillerCount": 3, "fillerExamples": ["\"um\" at 0:28", "\"basically\" at 0:35", "\"you know\" at 0:42"], "smoothnessIndex": 65},
    "grammarErrors": [
        {"original": "I am currently looking for a new opportunity where I can, basically, grow", "corrected": "I am currently seeking a new opportunity to grow", "explanation": "Remove filler words for cleaner phrasing. \"Seeking\" is more professional than \"looking for\".", "type": "style"},
        {"original": "contribute to a, you know, innovative team", "corrected": "contribute to an innovative team", "explanation": "Use \"an\" before vowel sounds. Remove the filler \"you know\".", "type": "article"},
    ],
    "toneAnalysis": {"monotoneIndex": 42, "suggestions": ["Vary your pitch when emphasizing key achievements.", "Pause briefly before important points for emphasis.", "Try raising your tone slightly at the end of enthusiasm phrases."]},
    "actionPlan": [
        {"title": "Daily /v/ sound practice", "description": "Repeat 10 words starting with \"v\" — focus on lip-teeth contact.", "type": "daily", "duration": 5},
        {"title": "Filler word elimination drill", "description": "Record a 1-minute talk and count filler words. Target: 0 fillers.", "type": "drill", "duration": 10},
        {"title": "Watch: Reducing Filler Words", "description": "Learn proven techniques to replace fillers with confident pauses.", "type": "lesson", "duration": 5},
    ],
}

VOCABULARY = [
    {"id": "v1", "word": "Spearheaded", "meaning": "Led or initiated an effort or activity", "example": "I spearheaded the migration to a micro-services architecture.", "pronunciation": "/ˈspɪrˌhɛdɪd/", "difficulty": "medium", "mastered": False},
    {"id": "v2", "word": "Leverage", "meaning": "Use something to maximum advantage", "example": "We can leverage our existing infrastructure for this.", "pronunciation": "/ˈlɛvərɪdʒ/", "difficulty": "easy", "mastered": True},
    {"id": "v3", "word": "Iterate", "meaning": "Perform or repeat a process", "example": "We iterate on the design based on user feedback.", "pronunciation": "/ˈɪtəˌreɪt/", "difficulty": "easy", "mastered": True},
    {"id": "v4", "word": "Scalable", "meaning": "Able to be changed in size or scale", "example": "The solution must be scalable to handle 10x traffic.", "pronunciation": "/ˈskeɪləbəl/", "difficulty": "easy", "mastered": False},
    {"id": "v5", "word": "Stakeholder", "meaning": "Person with interest in a project", "example": "I presented the findings to key stakeholders.", "pronunciation": "/ˈsteɪkˌhoʊldər/", "difficulty": "medium", "mastered": False},
    {"id": "v6", "word": "Orchestrate", "meaning": "Arrange or coordinate elements together", "example": "I orchestrated the deployment pipeline across three teams.", "pronunciation": "/ˈɔːrkɪstreɪt/", "difficulty": "hard", "mastered": False},
    {"id": "v7", "word": "Paradigm", "meaning": "A typical example or model", "example": "This represents a paradigm shift in how we approach testing.", "pronunciation": "/ˈpærəˌdaɪm/", "difficulty": "hard", "mastered": False},
    {"id": "v8", "word": "Synergy", "meaning": "Combined effect greater than sum of parts", "example": "The synergy between design and engineering drove innovation.", "pronunciation": "/ˈsɪnərdʒi/", "difficulty": "medium", "mastered": False},
]

NOTIFICATIONS = [
    {"id": "n1", "title": "Analysis Complete", "body": "Your recording \"Interview intro practice\" has been analyzed. Score: 72/100.", "type": "result", "read": False, "createdAt": "2026-03-07T10:35:00"},
    {"id": "n2", "title": "Daily Practice Reminder", "body": "You haven't practiced today. A quick 2-minute recording keeps your streak alive!", "type": "reminder", "read": False, "createdAt": "2026-03-07T09:00:00"},
    {"id": "n3", "title": "🎉 Streak Achievement!", "body": "Congratulations! You've maintained a 7-day practice streak. Keep going!", "type": "achievement", "read": True, "createdAt": "2026-03-06T08:00:00"},
    {"id": "n4", "title": "Pronunciation Tip", "body": "Try the \"mirror technique\" — watch your mouth while practicing /v/ sounds.", "type": "tip", "read": True, "createdAt": "2026-03-05T16:00:00"},
    {"id": "n5", "title": "Analysis Complete", "body": "Your recording \"Grammar practice\" has been analyzed. Score: 85/100.", "type": "result", "read": True, "createdAt": "2026-03-04T12:00:00"},
    {"id": "n6", "title": "New Lesson Available", "body": "\"Powerful Presentation Openings\" is now available. Perfect for your presentation goal!", "type": "tip", "read": True, "createdAt": "2026-03-03T10:00:00"},
]

PROGRESS = [
    {"date": "2026-02-01", "overall": 45, "pronunciation": 40, "grammar": 50, "fluency": 42},
    {"date": "2026-02-08", "overall": 48, "pronunciation": 43, "grammar": 52, "fluency": 46},
    {"date": "2026-02-15", "overall": 52, "pronunciation": 47, "grammar": 55, "fluency": 50},
    {"date": "2026-02-22", "overall": 58, "pronunciation": 53, "grammar": 60, "fluency": 55},
    {"date": "2026-03-01", "overall": 65, "pronunciation": 60, "grammar": 68, "fluency": 62},
    {"date": "2026-03-07", "overall": 72, "pronunciation": 68, "grammar": 78, "fluency": 70},
]

BADGES = [
    {"id": "b1", "title": "First Recording", "icon": "🎙️", "earned": True, "date": "2025-12-05"},
    {"id": "b2", "title": "7-Day Streak", "icon": "🔥", "earned": True, "date": "2026-03-06"},
    {"id": "b3", "title": "Pronunciation +10%", "icon": "📈", "earned": True, "date": "2026-02-28"},
    {"id": "b4", "title": "Grammar Master", "icon": "📝", "earned": False},
    {"id": "b5", "title": "30-Day Streak", "icon": "⭐", "earned": False},
    {"id": "b6", "title": "Perfect Score", "icon": "💎", "earned": False},
]

MENTORS = [
    {"id": "m1", "name": "Sarah", "role": "Senior HR Manager", "description": "Expert in behavioral interviews and interpersonal dynamics.", "avatar": "/mentors/sarah.jpg", "personality": "Professional, empathetic, and detail-oriented.", "expertise": ["HR Interviews", "Soft Skills", "Conflict Resolution"]},
    {"id": "m2", "name": "David", "role": "Tech Lead at Google", "description": "Specializes in technical architecture and engineering leadership.", "avatar": "/mentors/david.jpg", "personality": "Logical, direct, and growth-oriented.", "expertise": ["Technical Design", "System Design", "Code Reviews"]},
    {"id": "m3", "name": "Aisha", "role": "Executive Coach", "description": "Helps leaders build presence and strategic communication.", "avatar": "/mentors/aisha.jpg", "personality": "Inspirational, calm, and visionary.", "expertise": ["Public Speaking", "Executive Presence", "Negotiation"]},
]

VOICES = [
    {"id": "v1", "name": "Natural", "type": "Neutral"},
    {"id": "v2", "name": "Cheerful", "type": "Energetic"},
    {"id": "v3", "name": "Calm", "type": "Steady"},
    {"id": "v4", "name": "Authoritative", "type": "Formal"},
]

TOPICS = [
    {"id": "t1", "name": "Mock Interview", "description": "Practice for a specific job role."},
    {"id": "t2", "name": "Salary Negotiation", "description": "Master the art of asking for what you worth."},
    {"id": "t3", "name": "Project Pitch", "description": "Pitch your ideas to stakeholders effectively."},
    {"id": "t4", "name": "Difficult Conversation", "description": "Navigate tough talks with colleagues."},
]

SCENARIOS = [
    {"id": "s1", "title": "Tell Me About Yourself", "category": "HR", "description": "Practice the most common interview opener.", "questions": ["Tell me about yourself.", "Walk me through your resume.", "What brings you here today?"], "tips": ["Keep it under 90 seconds.", "Start with your current role, then key past experience, then future goals."]},
    {"id": "s2", "title": "System Design Discussion", "category": "Technical", "description": "Practice explaining a system design with clear structure.", "questions": ["Design a URL shortener system.", "How would you design a ride-sharing app?"], "tips": ["Start with clarifying requirements.", "Use specific numbers for scale estimates."]},
    {"id": "s3", "title": "Conflict Resolution", "category": "Managerial", "description": "Practice describing how you handle team conflicts.", "questions": ["Tell me about a time you disagreed with a colleague.", "How do you handle conflicts in the team?"], "tips": ["Use the STAR method.", "Focus on the resolution and what you learned."]},
]

DRILLS = [
    {"target": "Very valuable advice for everyone.", "focus": "/v/", "difficulty": "medium"},
    {"target": "I have worked on various projects.", "focus": "/v/ vs /w/", "difficulty": "hard"},
    {"target": "The weather was wonderful yesterday.", "focus": "/w/", "difficulty": "easy"},
    {"target": "We should invest in innovative solutions.", "focus": "/v/", "difficulty": "hard"},
    {"target": "Every volunteer contributed valuable time.", "focus": "/v/", "difficulty": "medium"},
]

PROMPTS = [
    "Describe yourself in 60 seconds.",
    "Explain a project you are proud of.",
    "What are your strengths and how do they help your team?",
    "Describe a challenge you overcame at work.",
    "Walk me through a typical day at your current job.",
]


async def seed_database(db):
    """Seed collections if they are empty."""
    collections = {
        "lessons": LESSONS,
        "jobs": JOBS,
        "results": [RESULT],
        "vocabulary": VOCABULARY,
        "notifications": NOTIFICATIONS,
        "progress": PROGRESS,
        "badges": BADGES,
        "mentors": MENTORS,
        "voices": VOICES,
        "topics": TOPICS,
        "scenarios": SCENARIOS,
        "drills": DRILLS,
    }

    for name, data in collections.items():
        count = await db[name].count_documents({})
        if count == 0:
            await db[name].insert_many(data)
            api_log(f"Seeded {len(data)} documents into '{name}'")
        else:
            api_log(f"Collection '{name}' already has {count} documents, skipping seed")

    # Seed prompts as a config document
    prompts_count = await db.practice_config.count_documents({"type": "prompts"})
    if prompts_count == 0:
        await db.practice_config.insert_one({"type": "prompts", "items": PROMPTS})
        api_log(f"Seeded {len(PROMPTS)} practice prompts")
