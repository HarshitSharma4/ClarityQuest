import asyncio
from app.services.ai_service import ai_service
from app.services.voice_service import voice_service
from app.memory.mem0_manager import memory_manager
from app.core.logger import worker_log

def ai_response_task(user_id: str, message: str, conversation_id: str):
    worker_log(f"Starting AI task for user {user_id}")
    # In a real worker, we'd need to run this in an event loop
    loop = asyncio.get_event_loop()
    response = loop.run_until_complete(
        ai_service.process_message(user_id, message, conversation_id)
    )
    worker_log(f"AI task complete for user {user_id}")
    return response

def memory_update_task(user_id: str, text: str, metadata: dict = None):
    worker_log(f"Starting memory update task for user {user_id}")
    loop = asyncio.get_event_loop()
    loop.run_until_complete(
        memory_manager.add_memory(user_id, text, metadata)
    )
    worker_log(f"Memory update task complete for user {user_id}")

def voice_generation_task(text: str):
    worker_log("Starting voice generation task")
    loop = asyncio.get_event_loop()
    audio_path = loop.run_until_complete(
        voice_service.generate_speech(text)
    )
    worker_log(f"Voice generation task complete: {audio_path}")
    return audio_path

if __name__ == "__main__":
    from rq import Worker
    from app.workers.job_queue import redis_conn
    
    worker = Worker(["ai_jobs"], connection=redis_conn)
    worker.work()
