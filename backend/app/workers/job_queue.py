import redis
from rq import Queue
from app.core.config import settings
from app.core.logger import queue_log

redis_conn = redis.from_url(settings.REDIS_URL)
ai_queue = Queue("ai_jobs", connection=redis_conn)

def enqueue_job(func, *args, **kwargs):
    queue_log(f"Enqueuing job {func.__name__}")
    job = ai_queue.enqueue(func, *args, **kwargs)
    return job.id
