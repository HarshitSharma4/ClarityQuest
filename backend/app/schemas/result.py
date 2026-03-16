from pydantic import BaseModel
from typing import List, Optional, Tuple

class PronunciationIssueSchema(BaseModel):
    word: str
    phoneme: str
    correctPhoneme: str
    tip: str
    score: int

class GrammarErrorSchema(BaseModel):
    original: str
    corrected: str
    explanation: str
    type: str

class ActionItemSchema(BaseModel):
    title: str
    description: str
    type: str
    duration: int

class FluencyMetricsSchema(BaseModel):
    wpm: int
    idealRange: List[int]
    fillerCount: int
    fillerExamples: List[str]
    smoothnessIndex: int

class ToneAnalysisSchema(BaseModel):
    monotoneIndex: int
    suggestions: List[str]

class SubscoresSchema(BaseModel):
    pronunciation: int
    clarity: int
    grammar: int
    vocabulary: int
    nonVerbal: Optional[int] = None

class AnalysisResultResponse(BaseModel):
    id: str
    jobId: str
    overallScore: int
    subscores: SubscoresSchema
    coachNote: str
    transcript: str
    correctedTranscript: str
    pronunciationIssues: List[PronunciationIssueSchema]
    fluencyMetrics: FluencyMetricsSchema
    grammarErrors: List[GrammarErrorSchema]
    toneAnalysis: ToneAnalysisSchema
    actionPlan: List[ActionItemSchema]
