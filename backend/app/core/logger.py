import logging
import sys
from typing import Any

# ANSI escape codes for colors
class LogColors:
    RESET = "\033[0m"
    BOLD = "\033[1m"
    RED = "\033[31m"
    GREEN = "\033[32m"
    YELLOW = "\033[33m"
    BLUE = "\033[34m"
    MAGENTA = "\033[35m"
    CYAN = "\033[36m"
    WHITE = "\033[37m"

class ModernFormatter(logging.Formatter):
    """
    Custom formatter to provide beautiful, colorized logs.
    """
    
    LEVEL_COLORS = {
        logging.DEBUG: LogColors.CYAN,
        logging.INFO: LogColors.GREEN,
        logging.WARNING: LogColors.YELLOW,
        logging.ERROR: LogColors.RED,
        logging.CRITICAL: LogColors.RED + LogColors.BOLD,
    }

    def format(self, record: logging.LogRecord) -> str:
        level_color = self.LEVEL_COLORS.get(record.levelno, LogColors.WHITE)
        
        # Determine the tag based on the logger name or extra field
        tag = getattr(record, "tag", record.name.upper())
        if "." in tag:
            tag = tag.split(".")[-1].upper()
            
        # Format the message like [TAG] Message
        message = super().format(record)
        formatted_msg = f"{level_color}[{tag}]{LogColors.RESET} {message}"
        
        return formatted_msg

def setup_logger(name: str = "app") -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        formatter = ModernFormatter("%(message)s")
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        
    return logger

# Global logger instance
logger = setup_logger()

# Helper function for pretty logs with tags
def log_with_tag(level: int, tag: str, message: str, *args: Any, **kwargs: Any):
    logger.log(level, message, *args, extra={"tag": tag}, **kwargs)

# Convenience wrappers
def api_log(message: str): log_with_tag(logging.INFO, "API", message)
def queue_log(message: str): log_with_tag(logging.INFO, "QUEUE", message)
def worker_log(message: str): log_with_tag(logging.INFO, "WORKER", message)
def llm_log(message: str): log_with_tag(logging.INFO, "LLM", message)
def memory_log(message: str): log_with_tag(logging.INFO, "MEMORY", message)
def db_log(message: str): log_with_tag(logging.INFO, "DB", message)
