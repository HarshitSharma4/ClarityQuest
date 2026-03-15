import os
import uuid
from typing import Optional
from app.core.logger import api_log

class AudioUtils:
    @staticmethod
    def save_temp_audio(content: bytes, extension: str = "wav") -> str:
        temp_dir = "/tmp/clarity_quest_audio"
        os.makedirs(temp_dir, exist_ok=True)
        file_path = os.path.join(temp_dir, f"{uuid.uuid4()}.{extension}")
        with open(file_path, "wb") as f:
            f.write(content)
        api_log(f"Saved temporary audio to {file_path}")
        return file_path

    @staticmethod
    def cleanup_temp_audio(file_path: str):
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                api_log(f"Cleaned up temporary audio {file_path}")
        except Exception as e:
            api_log(f"Failed to cleanup audio {file_path}: {e}")

audio_utils = AudioUtils()
