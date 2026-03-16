const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail || 'API request failed');
  }

  return res.json();
}

// Auth
export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ access_token: string; token_type: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signup: (name: string, email: string, password: string, role: string) =>
    request<{ access_token: string; token_type: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    }),

  getMe: () =>
    request<{
      id: string; name: string; email: string; role: string;
      goals: string[]; streak: number; joinedAt: string; accentPreference: string;
    }>('/auth/me'),

  // Lessons
  getLessons: () =>
    request<Array<{
      id: string; title: string; description: string; duration: number;
      difficulty: string; tags: string[]; thumbnail: string; watched: boolean;
      chapters: Array<{ title: string; timestamp: number }>;
    }>>('/lessons'),

  getLesson: (id: string) =>
    request<{
      id: string; title: string; description: string; duration: number;
      difficulty: string; tags: string[]; thumbnail: string; watched: boolean;
      chapters: Array<{ title: string; timestamp: number }>;
    }>(`/lessons/${id}`),

  // Jobs
  getJobs: () =>
    request<Array<{
      id: string; title: string; type: string; status: string;
      createdAt: string; completedAt?: string; estimatedTime?: number;
      queuePosition?: number; stages: Array<{ name: string; status: string; timestamp?: string }>;
      tags: string[];
    }>>('/jobs'),

  getJob: (id: string) =>
    request<{
      id: string; title: string; type: string; status: string;
      createdAt: string; stages: Array<{ name: string; status: string; timestamp?: string }>;
      tags: string[];
    }>(`/jobs/${id}`),

  createJob: (title: string, type: string, tags: string[]) =>
    request('/jobs', {
      method: 'POST',
      body: JSON.stringify({ title, type, tags }),
    }),

  // Results
  getResult: (jobId: string) => request(`/results/${jobId}`),

  // Vocabulary
  getVocabulary: () =>
    request<Array<{
      id: string; word: string; meaning: string; example: string;
      pronunciation: string; difficulty: string; mastered: boolean;
    }>>('/vocabulary'),

  toggleMastered: (wordId: string) =>
    request(`/vocabulary/${wordId}/master`, { method: 'PUT' }),

  // Notifications
  getNotifications: () =>
    request<Array<{
      id: string; title: string; body: string; type: string;
      read: boolean; createdAt: string;
    }>>('/notifications'),

  markRead: (id: string) =>
    request(`/notifications/${id}/read`, { method: 'PUT' }),

  // Progress
  getProgress: () =>
    request<{
      progress: Array<{ date: string; overall: number; pronunciation: number; grammar: number; fluency: number }>;
      badges: Array<{ id: string; title: string; icon: string; earned: boolean; date?: string }>;
    }>('/progress'),

  // Practice
  getPrompts: () => request<string[]>('/practice/prompts'),
  getDrills: () =>
    request<Array<{ target: string; focus: string; difficulty: string }>>('/practice/drills'),
  getScenarios: () =>
    request<Array<{
      id: string; title: string; category: string; description: string;
      questions: string[]; tips: string[];
    }>>('/practice/scenarios'),

  // Mentors
  getMentors: () =>
    request<Array<{
      id: string; name: string; role: string; description: string;
      avatar: string; personality: string; expertise: string[];
    }>>('/mentors'),

  getVoices: () =>
    request<Array<{ id: string; name: string; type: string }>>('/mentors/voices'),

  getTopics: () =>
    request<Array<{ id: string; name: string; description: string }>>('/mentors/topics'),

  // Chat (existing)
  sendMessage: (userId: string, message: string, conversationId: string) =>
    request('/chat/message', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, message, conversation_id: conversationId }),
    }),

  // Memory (existing)
  getMemories: (userId: string) => request(`/memory/${userId}`),
};
